import api from "./api";
// Local helper to generate slug from Arabic/Latin names
const slugify = (str = "") =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "") // keep arabic letters
    .replace(/-+/g, "-");

export const fetchLocations = async () => {
  const res = await fetch(`${api.baseURL}/location/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب القاعات");
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
};

export const createLocation = async (formData) => {
  // Expecting formData = { name, capacity?, faculty }
  const payload = {
    name: formData.name,
    slug: formData.slug || slugify(formData.name),
    capacity: Number(formData.capacity ?? 1),
    faculty: Number(formData.faculty),
  };
  const res = await fetch(`${api.baseURL}/location/create/`, {
    method: "POST",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
    throw new Error(err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || "فشل في إنشاء القاعة");
  }
  return res.json();
};

export const updateLocation = async (slug, formData) => {
  const payload = {
    name: formData.name,
    // allow slug update if provided, else keep same
    ...(formData.slug ? { slug: formData.slug } : {}),
    capacity: formData.capacity != null ? Number(formData.capacity) : undefined,
    faculty: formData.faculty != null ? Number(formData.faculty) : undefined,
  };
  const res = await fetch(`${api.baseURL}/location/${slug}/update/`, {
    method: "PUT",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const firstFieldError = err && typeof err === 'object' ? Object.values(err)[0]?.[0] : null;
    throw new Error(err?.detail || err?.non_field_errors?.[0] || firstFieldError || err?.message || "فشل في تحديث القاعة");
  }
  return res.json();
};

export const deleteLocation = async (slug) => {
  const res = await fetch(`${api.baseURL}/location/${slug}/delete/`, {
    method: "DELETE",
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في حذف القاعة");
  return true;
};
