import api from './api';

export const fetchFaculties = async (universitySlug) => {
  const url = universitySlug ? `${api.baseURL}/faculty/?university__slug=${universitySlug}` : `${api.baseURL}/faculty/`;
  const res = await fetch(url, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب الكليات');
  return res.json();
};

export const createFaculty = async (formData) => {
  const res = await fetch(`${api.baseURL}/faculty/create/`, {
    method: 'POST',
    headers: {
      ...api.getAuthHeaders(),
    },
    body: formData,
  });
  if (!res.ok) throw new Error('فشل في إنشاء الكلية');
  return res.json();
};

export const updateFaculty = async ({ slug, formData }) => {
  const res = await fetch(`${api.baseURL}/faculty/${slug}/update/`, {
    method: 'PATCH',
    headers: {
      ...api.getAuthHeaders(),
    },
    body: formData,
  });
  if (!res.ok) throw new Error('فشل في تحديث الكلية');
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
