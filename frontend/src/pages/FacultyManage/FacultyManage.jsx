import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFaculties, createFaculty, updateFaculty, deleteFaculty } from '../../services/facultyApi';
import './FacultyManage.css';


const initialForm = { name: '', slug: '', logo: null };

// Form validation function
const validateForm = (form) => {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = 'اسم الكلية مطلوب';
  } else if (form.name.length > 30) {
    errors.name = 'اسم الكلية يجب أن لا يتجاوز 30 حرف';
  }

  if (!form.slug.trim()) {
    errors.slug = 'الرابط المختصر مطلوب';
  } else if (form.slug.length > 30) {
    errors.slug = 'الرابط المختصر يجب أن لا يتجاوز 30 حرف';
  }
  
  if (form.logo && form.logo.size > 5 * 1024 * 1024) { // 5MB limit
    errors.logo = 'حجم الصورة يجب أن لا يتجاوز 5 ميجابايت';
  }
  
  return errors;
};

// Memoized AddEditForm component
const AddEditForm = memo(({ 
  isClosing, 
  editSlug, 
  form, 
  error, 
  onClose, 
  onSubmit, 
  onChange 
}) => {
  
  
  return (
    <div className={`faculty-form-container ${isClosing ? 'fadeOut' : ''}`}>
      <div className="faculty-form-card content-card">
        <div className="form-header">
          <h2 className="form-title">{editSlug ? 'تعديل كلية' : 'إضافة كلية'}</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} dir="rtl" autoComplete="off">
          <div className="form-group">
            <label htmlFor="faculty-name" className="themed-label">اسم الكلية</label>
            <input
              id="faculty-name"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="مثال: كلية الهندسة"
              required
              maxLength={30}
              autoComplete="off"
            />
            <small className="input-helper">{form.name.length}/30</small>
          </div>
          <div className="form-group">
            <label htmlFor="faculty-slug" className="themed-label">الرابط المختصر</label>
            <input
              id="faculty-slug"
              type="text"
              name="slug"
              value={form.slug}
              onChange={onChange}
              placeholder="مثال: engineering-faculty"
              required
              maxLength={30}
              autoComplete="off"
              dir="ltr"
            />
            <small className="input-helper">{form.slug.length}/30 - سيتم استخدامه في الرابط</small>
          </div>
          <div className="form-group">
            <label htmlFor="faculty-logo" className="themed-label">شعار الكلية</label>
            <input
              id="faculty-logo"
              type="file"
              name="logo"
              onChange={onChange}
              accept="image/*"
              className="file-input"
              autoComplete="off"
            />
            <small className="input-helper">الحد الأقصى: 5 ميجابايت</small>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            {editSlug ? 'حفظ التغييرات' : 'إضافة الكلية'}
          </button>
        </form>
      </div>
    </div>
  );
});

// Memoized FacultyList component
const FacultyList = memo(({ 
  faculties, 
  isLoading, 
  isError, 
  onAdd, 
  onEdit, 
  onDelete 
}) => {
  
  
  return (
    <div className="faculty-list-container">
      <div className="header-actions">
        <h1>إدارة الكليات</h1>
        <button onClick={onAdd} className="add-button">
          إضافة كلية
        </button>
      </div>
      {isLoading ? (
        <div className="loading">جاري التحميل...</div>
      ) : isError ? (
        <div className="error">حدث خطأ في تحميل البيانات</div>
      ) : (
        <div className="faculty-grid">
          {faculties?.map((faculty) => (
            <div key={faculty.slug} className="faculty-card">
              {faculty.logo && (
                <div className="faculty-logo">
                  <img src={faculty.logo} alt={faculty.name} />
                </div>
              )}
              <div className="faculty-info">
                <h3>{faculty.name}</h3>
                <p>{faculty.slug}</p>
              </div>
              <div className="faculty-actions">
                <button onClick={() => onEdit(faculty)} className="edit-button">
                  تعديل
                </button>
                <button onClick={() => onDelete(faculty.slug)} className="delete-button">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const FacultyManage = () => {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    form: initialForm,
    editSlug: null,
    error: '',
    isOpen: false,
    isClosing: false
  });

  const handleCloseForm = useCallback(() => {
    setFormState(prev => ({ ...prev, isClosing: true }));
  }, []);

  useEffect(() => {
    let timer;
    if (formState.isClosing) {
      timer = setTimeout(() => {
        setFormState({
          form: initialForm,
          editSlug: null,
          error: '',
          isOpen: false,
          isClosing: false
        });
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formState.isClosing]);

  const { data: faculties, isLoading, isError } = useQuery({
    queryKey: ['faculties'],
    queryFn: fetchFaculties
  });

  const createMutation = useMutation({
    mutationFn: createFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      handleCloseForm();
    },
    onError: (error) => setFormState(prev => ({ ...prev, error: error?.message || 'فشل في إنشاء الكلية' })),
  });

  const updateMutation = useMutation({
    mutationFn: updateFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      handleCloseForm();
    },
    onError: (error) => setFormState(prev => ({ ...prev, error: error?.message || 'فشل في تحديث الكلية' })),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
    },
    onError: (error) => setFormState(prev => ({ ...prev, error: error?.message || 'فشل في حذف الكلية' })),
  });

  // Optimized handleChange with useCallback and proper dependencies
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    
    setFormState(prev => {
      const newForm = { ...prev.form };
      
      if (files) {
        newForm[name] = files[0];
      } else {
        newForm[name] = value;
      }
      
      return {
        ...prev,
        form: newForm
      };
    });
  }, []); // Empty dependencies since we're using functional updates

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm(formState.form);
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).join('\n');
      setFormState(prev => ({ ...prev, error: errorMessage }));
      return;
    }

    const formData = new FormData();
    formData.append('name', formState.form.name);
    formData.append('slug', formState.form.slug);
    if (formState.form.logo) formData.append('logo', formState.form.logo);
    
    try {
      if (formState.editSlug) {
        updateMutation.mutate({ slug: formState.editSlug, formData });
      } else {
        createMutation.mutate(formData);
      }
    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        error: error.response?.data?.message || 'حدث خطأ أثناء حفظ البيانات' 
      }));
    }
  }, [formState.form, formState.editSlug, updateMutation, createMutation]);

  const handleEdit = useCallback((fac) => {
    setFormState(prev => ({
      ...prev,
      form: { 
        name: fac.name,
        slug: fac.slug,
        logo: null
      },
      editSlug: fac.slug,
      isOpen: true,
      error: ''
    }));
  }, []);

  const handleAdd = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      form: initialForm,
      editSlug: null,
      isOpen: true,
      error: ''
    }));
  }, []);

  const handleDelete = useCallback((slug) => {
    if (window.confirm('هل أنت متأكد من حذف الكلية؟')) {
      deleteMutation.mutate(slug);
    }
  }, [deleteMutation]);

  // Memoize props to prevent unnecessary re-renders
  const formProps = useMemo(() => ({
    isClosing: formState.isClosing,
    editSlug: formState.editSlug,
    form: formState.form,
    error: formState.error,
    onClose: handleCloseForm,
    onSubmit: handleSubmit,
    onChange: handleChange
  }), [
    formState.isClosing,
    formState.editSlug,
    formState.form,
    formState.error,
    handleCloseForm,
    handleSubmit,
    handleChange
  ]);

  const listProps = useMemo(() => ({
    faculties,
    isLoading,
    isError,
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete
  }), [
    faculties,
    isLoading,
    isError,
    handleAdd,
    handleEdit,
    handleDelete
  ]);

  return (
    <div className="faculty-manage" dir="rtl">
      {formState.isOpen ? (
        <AddEditForm {...formProps} />
      ) : (
        <FacultyList {...listProps} />
      )}
    </div>
  );
};

export default FacultyManage;