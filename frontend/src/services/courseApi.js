import api from './api';

export const fetchCourses = async () => {
  const res = await fetch(`${api.baseURL}/course/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب المقررات');
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const createCourse = async (formData) => {
  if (!formData?.slug) throw new Error('المعرف (Slug) مطلوب');
  const res = await fetch(`${api.baseURL}/course/create/`, {
    method: 'POST',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    let msg = 'فشل في إنشاء المقرر';
    try {
      const err = await res.json();
      const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
      msg = err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
};

export const updateCourse = async (slug, formData) => {
  if (!formData?.slug) throw new Error('المعرف (Slug) مطلوب');
  const res = await fetch(`${api.baseURL}/course/${slug}/update/`, {
    method: 'PUT',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    let msg = 'فشل في تحديث المقرر';
    try {
      const err = await res.json();
      const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
      msg = err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
};

export const deleteCourse = async (slug) => {
  const res = await fetch(`${api.baseURL}/course/${slug}/delete/`, {
    method: 'DELETE',
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) {
    let msg = 'فشل في حذف المقرر';
    try {
      const err = await res.json();
      msg = err?.detail || JSON.stringify(err) || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return true;
};
