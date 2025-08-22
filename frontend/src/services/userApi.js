import api from './api';

export const fetchUsers = async () => {
  const res = await fetch(`${api.baseURL}/auth/users/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('فشل في جلب المستخدمين');
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};
