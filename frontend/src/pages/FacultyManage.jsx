import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFaculties, createFaculty, updateFaculty, deleteFaculty } from '../services/facultyApi';
import { fetchUniversities } from '../services/universityApi';
import '../styles/university-faculty-manage.css';

const initialForm = { name: '', logo: null, university: '' };

const FacultyManage = () => {
  const { slug: universitySlug } = useParams();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [editSlug, setEditSlug] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);

    const { data: faculties, isLoading, isError } = useQuery({
    queryKey: ['faculties', universitySlug],
    queryFn: () => fetchFaculties(universitySlug),
    enabled: !!universitySlug,
  });

    const { data: universities, isLoading: isUnivLoading, isError: isUnivError } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities
  });

  const createMutation = useMutation({
    mutationFn: createFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      setForm(initialForm);
      setError('');
      setFormOpen(false);
    },
    onError: () => setError('فشل في إنشاء الكلية'),
  });

  const updateMutation = useMutation({
    mutationFn: updateFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      setForm(initialForm);
      setEditSlug(null);
      setError('');
      setFormOpen(false);
    },
    onError: () => setError('فشل في تحديث الكلية'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
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
    const formData = new FormData();
    formData.append('name', form.name);
    
    formData.append('university', form.university);
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
      logo: null, 
      university: fac.university?.id || fac.university 
    });
    setEditSlug(fac.slug);
    setError('');
    setFormOpen(true);
  };

  useEffect(() => {
    if (universitySlug && universities) {
      const currentUniversity = universities.find(uni => uni.slug === universitySlug);
      if (currentUniversity) {
        setForm(f => ({ ...f, university: currentUniversity.id }));
      }
    }
  }, [universitySlug, universities]);

  const handleDelete = (slug) => {
    if (window.confirm('هل أنت متأكد من حذف الكلية؟')) {
      deleteMutation.mutate(slug);
    }
  };

  return (
    <div className="ufm-container">
      <div className="ufm-dashboard-box">
                <h1 className="ufm-main-title">
          إدارة الكليات {universities && `- ${universities.find(u => u.slug === universitySlug)?.name}`}
        </h1>
        <div className="ufm-dashboard-content">
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
                <label className="form-label">شعار الكلية</label>
                <input type="file" name="logo" accept="image/*" onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-label">الجامعة</label>
                <select name="university" value={form.university} onChange={handleChange} required className="form-control">
                  <option value="">اختر الجامعة</option>
                  {isUnivLoading ? <option disabled>جاري التحميل...</option> : universities?.map(uni => (
                    <option value={uni.id} key={uni.id}>{uni.name}</option>
                  ))}
                </select>
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
                    <div className="ufm-card-info">
                      <div className="ufm-card-title">{fac.name}</div>
                      <div className="ufm-card-detail-row">
                        <span className="ufm-card-slug">{fac.slug}</span>
                        <span className="ufm-card-university-name">{fac.university_name || 'N/A'}</span>
                      </div>
                    </div>
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
            <div className="ufm-dashboard-add-row">
              <button className="ufm-dashboard-add-btn" aria-label="إضافة كلية" onClick={() => {
                const currentUniversity = universities.find(uni => uni.slug === universitySlug);
                setForm({ ...initialForm, university: currentUniversity?.id || '' });
                setEditSlug(null);
                setError('');
                setFormOpen(true);
              }}>
                <span>+</span> إضافة كلية
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyManage;
