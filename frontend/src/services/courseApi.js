import api from "./api";

// Base path: /course/
export const fetchCourses = async () => {
  const res = await fetch(`${api.baseURL}/course/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب المقررات");
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const getCourse = async (slug) => {
  const res = await fetch(`${api.baseURL}/course/${slug}/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب بيانات المقرر");
  return res.json();
};

export const createCourse = async (payload) => {
  const res = await fetch(`${api.baseURL}/course/create/`, {
    method: "POST",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
    throw new Error(err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || "فشل في إنشاء المقرر");
  }
  return res.json();
};

export const updateCourse = async (slug, payload) => {
  const res = await fetch(`${api.baseURL}/course/${slug}/update/`, {
    method: "PUT",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
    throw new Error(err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || "فشل في تحديث المقرر");
  }
  return res.json();
};

export const deleteCourse = async (slug) => {
  const res = await fetch(`${api.baseURL}/course/${slug}/delete/`, {
    method: "DELETE",
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في حذف المقرر");
  return true;
};
