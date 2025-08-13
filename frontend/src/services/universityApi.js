import api from './api';

export const fetchUniversities = async () => {
  const res = await fetch(`${api.baseURL}/university/`, {
    headers: api.getAuthHeaders()
  });
  if (!res.ok) throw new Error('فشل في جلب الجامعات');
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const createUniversity = async (formData) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${api.baseURL}/university/create/`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error('فشل في إنشاء الجامعة');
  return res.json();
};

export const updateUniversity = async ({ slug, formData }) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${api.baseURL}/university/${slug}/update/`, {
    method: 'PATCH',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error('فشل في تحديث الجامعة');
  return res.json();
};

export const deleteUniversity = async (slug) => {
  const res = await fetch(`${api.baseURL}/university/${slug}/delete/`, {
    method: 'DELETE',
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في حذف الجامعة');
  return true;
};
