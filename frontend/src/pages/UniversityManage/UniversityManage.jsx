import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUniversities, createUniversity, updateUniversity, deleteUniversity } from '../../services/universityApi';
import '../../styles/university-faculty-manage.css';

const initialForm = { name: '', slug: '', logo: null };

const UniversityManage = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [editSlug, setEditSlug] = useState(null);
  const [error, setError] = useState('');

  const { data: universities, isLoading, isError } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities
  });
  const createMutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['universities'] }); setForm(initialForm); setError(''); setFormOpen(false); },
    onError: () => setError('فشل في إنشاء الجامعة')
  });
  const updateMutation = useMutation({
    mutationFn: updateUniversity,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['universities'] }); setForm(initialForm); setEditSlug(null); setError(''); setFormOpen(false); },
    onError: () => setError('فشل في تحديث الجامعة')
  });
  const deleteMutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['universities'] }); setError(''); },
    onError: () => setError('فشل في حذف الجامعة')
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('slug', form.slug);
    if (form.logo) formData.append('logo', form.logo);
    if (editSlug) {
      updateMutation.mutate({ slug: editSlug, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = uni => {
    setForm({ name: uni.name, slug: uni.slug, logo: null });
    setEditSlug(uni.slug);
    setError('');
  };

  const handleDelete = slug => {
    if (window.confirm('هل أنت متأكد من حذف الجامعة؟')) {
      deleteMutation.mutate(slug);
    }
  };

  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  // Open form when editing
  React.useEffect(() => {
    if (editSlug) setFormOpen(true);
  }, [editSlug]);

  return (
    <div className="ufm-container">
      <div className="ufm-dashboard-box">
        <h1 className="ufm-main-title" >إدارة الجامعات</h1>
        <div className="ufm-dashboard-content">
          <div className={`ufm-dashboard-form-panel ufm-form-panel ${!formOpen ? 'closed' : ''}`}>
            <button
              className="ufm-form-back-btn"
              onClick={() => setFormOpen(false)}
            >
              رجوع
            </button>
            <form onSubmit={handleSubmit} className="uni-form">
              <h2 style={{color: "#fff", textAlign: "center"}}>{editSlug ? 'تعديل الجامعة' : 'إضافة جامعة'}</h2>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label">اسم الجامعة</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="form-control" />
              </div>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label">الاسم المختصر (slug)</label>
                <input type="text" name="slug" value={form.slug} onChange={handleChange} required className="form-control" disabled={!!editSlug} />
              </div>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label">شعار الجامعة</label>
                <input type="file" name="logo" accept="image/*" onChange={handleChange} className="form-control" />
              </div>
              {error && <div className="form-error">{error}</div>}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <button type="submit" className="ufm-btn" style={{ minWidth: 120 }}>
                  {editSlug ? 'تحديث' : 'إضافة'}
                </button>
                {editSlug && (
                  <button type="button" className="ufm-btn delete" onClick={() => { setForm(initialForm); setEditSlug(null); setError(''); }}>
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className={`ufm-dashboard-cards-panel ${formOpen ? 'closed' : ''}`}>
            <div className="ufm-cards-col">
              {isLoading ? <div style={{ color: '#fff', textAlign: 'center', gridColumn: '1/-1' }}>جاري التحميل...</div> : isError ? <div style={{ color: '#fff', textAlign: 'center', gridColumn: '1/-1' }}>فشل في تحميل الجامعات</div> : (
                universities?.length ? universities.map(uni => (
                  <div className="ufm-card" key={uni.slug}>
                    {uni.logo && (
                      <div className="ufm-card-logo">
                        <img src={uni.logo} alt="logo" />
                      </div>
                    )}
                    <div className="ufm-card-title">{uni.name}</div>
                    <div className="ufm-card-slug">{uni.slug}</div>
                    <div className="ufm-card-actions">
                      <button className="ufm-btn faculties" title="عرض الكليات" onClick={() => navigate(`/universities/${uni.slug}/faculties`)}>
                        الكليات
                      </button>
                      <button className="ufm-btn" title="تعديل" onClick={() => { handleEdit(uni); setFormOpen(true); }}>
                        تعديل
                      </button>
                      <button className="ufm-btn delete" title="حذف" onClick={() => handleDelete(uni.slug)}>
                        حذف
                      </button>
                    </div>
                  </div>
                )) : <div style={{ color: '#fff', textAlign: 'center', gridColumn: '1/-1' }}>لا توجد جامعات بعد</div>
              )}
            </div>
            <div className="ufm-dashboard-add-row">
              <button
                className="ufm-dashboard-add-btn"
                aria-label="إضافة جامعة"
                onClick={() => setFormOpen(true)}
              >
                <span>+</span> إضافة جامعة
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
   
  );
}

export default UniversityManage;
