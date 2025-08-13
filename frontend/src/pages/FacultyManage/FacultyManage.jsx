import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFaculties, createFaculty, updateFaculty, deleteFaculty } from '../../services/facultyApi';
import './university-faculty-manage.css';

const initialForm = { name: '', slug: '', logo: null };

const FacultyManage = () => {
  const { slug: universitySlug } = useParams();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [editSlug, setEditSlug] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);

    const { data: faculties, isLoading, isError } = useQuery({
    queryKey: ['faculties', universitySlug ?? null],
    queryFn: () => fetchFaculties(universitySlug),
  });

    // University selection removed; backend no longer requires it

  const createMutation = useMutation({
    mutationFn: createFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'], exact: false });
      setForm(initialForm);
      setError('');
      setFormOpen(false);
    },
    onError: (e) => setError(e?.message || 'فشل في إنشاء الكلية'),
  });

  const updateMutation = useMutation({
    mutationFn: updateFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'], exact: false });
      setForm(initialForm);
      setEditSlug(null);
      setError('');
      setFormOpen(false);
    },
    onError: (e) => setError(e?.message || 'فشل في تحديث الكلية'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'], exact: false });
      setError('');
    },
    onError: () => setError('فشل في حذف الكلية'),
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Client-side required checks to avoid 400s
    if (!editSlug && !form.logo) {
      // logo is required by backend ImageField on create
      setError('شعار الكلية مطلوب');
      return;
    }
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

    const handleEdit = (fac) => {
    setForm({ 
      name: fac.name, 
      slug: fac.slug, 
      logo: null
    });
    setEditSlug(fac.slug);
    setError('');
    setFormOpen(true);
  };

  // Removed pre-filling university since field no longer exists

  const handleDelete = (slug) => {
    if (window.confirm('هل أنت متأكد من حذف الكلية؟')) {
      deleteMutation.mutate(slug);
    }
  };

  return (
    <div className="ufm-container">
      <div className="ufm-dashboard-box">
                <h1 className="ufm-main-title">
          إدارة الكليات 
        
        </h1>
        <div className="ufm-dashboard-add-row">
              <button className="ufm-dashboard-add-btn" aria-label="إضافة كلية" onClick={() => {
                setForm({ ...initialForm });
                setEditSlug(null);
                setError('');
                setFormOpen(true);
              }}>
                <span>+</span> إضافة كلية
              </button>
        <div className="ufm-dashboard-content">
            </div>
          <div className={`ufm-dashboard-form-panel ufm-form-panel ${!formOpen ? 'closed' : ''}`}>
            <button className="ufm-form-back-btn" onClick={() => setFormOpen(false)}>
              رجوع
            </button>
            <form onSubmit={handleSubmit} className="uni-form">
              <h2 className="form-title">{editSlug ? 'تعديل الكلية' : 'إضافة كلية'}</h2>
              <div className="form-group">
                <label className="form-label">اسم الكلية</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-label">الاسم المختصر (slug)</label>
                <input type="text" name="slug" value={form.slug} onChange={handleChange} required className="form-control" disabled={!!editSlug} />
              </div>
              <div className="form-group">
                <label className="form-label">شعار الكلية</label>
                <input type="file" name="logo" accept="image/*" onChange={handleChange} className="form-control" />
              </div>
              
              {error && <div className="form-error">{error}</div>}
              <div className="form-actions">
                <button type="submit" className="ufm-btn" disabled={createMutation.isLoading || updateMutation.isLoading}>
                  {editSlug ? 'تحديث' : 'إضافة'}
                </button>
                {editSlug && (
                  <button type="button" className="ufm-btn delete" onClick={() => { setForm(initialForm); setEditSlug(null); setError(''); setFormOpen(false); }}>
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className={`ufm-dashboard-cards-panel ${formOpen ? 'closed' : ''}`}>
            <div className="ufm-cards-col">
              {isLoading ? <div className="loading-state">جاري التحميل...</div> : isError ? <div className="error-state">فشل في تحميل الكليات</div> : (
                faculties?.length ? faculties.map(fac => (
                  <div className="ufm-card" key={fac.slug}>
                    {fac.logo && (
                      <div className="ufm-card-logo">
                        <img src={fac.logo} alt="logo" />
                      </div>
                    )}
                    <div className="ufm-card-title">{fac.name}</div>
                    <div className="ufm-card-slug">{fac.slug}</div>
                    <div className="ufm-card-actions">
                      <button className="ufm-btn" title="تعديل" onClick={() => handleEdit(fac)}>
                        تعديل
                      </button>
                      <button className="ufm-btn delete" title="حذف" onClick={() => handleDelete(fac.slug)}>
                        حذف
                      </button>
                    </div>
                  </div>
                )) : <div className="empty-state">لا توجد كليات بعد</div>
              )}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyManage;
