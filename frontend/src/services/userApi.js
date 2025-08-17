import api from "./api";

// Base path: /auth/users/ (Djoser endpoints)
export const fetchUsers = async () => {
  const res = await fetch(`${api.baseURL}/auth/users/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب المستخدمين");
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const getUser = async (id) => {
  const res = await fetch(`${api.baseURL}/auth/users/${id}/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب بيانات المستخدم");
  return res.json();
};

export const createUser = async (payload) => {
  const res = await fetch(`${api.baseURL}/auth/users/`, {
    method: "POST",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
    throw new Error(err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || "فشل في إنشاء المستخدم");
  }
  return res.json();
};

export const updateUser = async (id, payload) => {
  const res = await fetch(`${api.baseURL}/auth/users/${id}/`, {
    method: "PUT",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
    throw new Error(err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || "فشل في تحديث المستخدم");
  }
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${api.baseURL}/auth/users/${id}/`, {
    method: "DELETE",
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في حذف المستخدم");
  return true;
};
