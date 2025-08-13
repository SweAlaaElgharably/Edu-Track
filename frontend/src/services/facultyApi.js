import api from './api';

export const fetchFaculties = async (universitySlug) => {
  const url = universitySlug ? `${api.baseURL}/faculty/?university__slug=${universitySlug}` : `${api.baseURL}/faculty/`;
  const res = await fetch(url, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب الكليات');
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const createFaculty = async (formData) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${api.baseURL}/faculty/create/`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    let msg = 'فشل في إنشاء الكلية';
    try {
      const err = await res.json();
      msg = err.detail || JSON.stringify(err) || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
};

export const updateFaculty = async ({ slug, formData }) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${api.baseURL}/faculty/${slug}/update/`, {
    method: 'PATCH',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    let msg = 'فشل في تحديث الكلية';
    try {
      const err = await res.json();
      msg = err.detail || JSON.stringify(err) || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
};

export const deleteFaculty = async (slug) => {
  const res = await fetch(`${api.baseURL}/faculty/${slug}/delete/`, {
    method: 'DELETE',
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في حذف الكلية');
  return true;
};
