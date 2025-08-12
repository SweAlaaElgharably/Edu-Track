import api from './api';

export const fetchCourses = async () => {
  const res = await fetch(`${api.baseURL}/courses/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب المقررات');
  return res.json();
};

export const createCourse = async (formData) => {
  const res = await fetch(`${api.baseURL}/courses/create/`, {
    method: 'POST',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('فشل في إنشاء المقرر');
  return res.json();
};

export const updateCourse = async (slug, formData) => {
  const res = await fetch(`${api.baseURL}/courses/${slug}/update/`, {
    method: 'PUT',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('فشل في تحديث المقرر');
  return res.json();
};

export const deleteCourse = async (slug) => {
  const res = await fetch(`${api.baseURL}/courses/${slug}/delete/`, {
    method: 'DELETE',
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في حذف المقرر');
  return true;
};
