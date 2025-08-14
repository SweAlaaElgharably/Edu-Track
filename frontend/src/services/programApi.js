import api from './api';

export const fetchPrograms = async () => {
  const res = await fetch(`${api.baseURL}/program/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب الأقسام');
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const createProgram = async (data) => {
  const res = await fetch(`${api.baseURL}/program/create/`, {
    method: 'POST',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let msg = 'فشل في إنشاء القسم';
    try {
      const err = await res.json();
      msg = err.detail || JSON.stringify(err) || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
};

export const updateProgram = async (slug, data) => {
  const res = await fetch(`${api.baseURL}/program/${slug}/update/`, {
    method: 'PATCH',
    headers: api.getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let msg = 'فشل في تحديث القسم';
    try {
      const err = await res.json();
      msg = err.detail || JSON.stringify(err) || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
};

export const deleteProgram = async (slug) => {
  const res = await fetch(`${api.baseURL}/program/${slug}/delete/`, {
    method: 'DELETE',
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) {
    let msg = 'فشل في حذف القسم';
    try {
      const err = await res.json();
      msg = err.detail || JSON.stringify(err) || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return true;
};