import api from './api';

export const fetchPrograms = async () => {
  const res = await fetch(`${api.baseURL}/program/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب الأقسام');
  return res.json();
};

export const createProgram = async (data) => {
  const res = await fetch(`${api.baseURL}/program/create/`, {
    method: 'POST',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('فشل في إنشاء القسم');
  return res.json();
};

export const updateProgram = async (slug, data) => {
  const res = await fetch(`${api.baseURL}/program/${slug}/update/`, {
    method: 'PATCH',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('فشل في تحديث القسم');
  return res.json();
};

export const deleteProgram = async (slug) => {
  const res = await fetch(`${api.baseURL}/program/${slug}/delete/`, {
    method: 'DELETE',
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في حذف القسم');
  return true;
};
