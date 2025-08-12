import api from "./api";

export const fetchLocations = async () => {
  const res = await fetch(`${api.baseURL}/location/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب القاعات");
  return res.json();
};

export const createLocation = async (formData) => {
  const res = await fetch(`${api.baseURL}/location/create/`, {
    method: "POST",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("فشل في إنشاء القاعة");
  return res.json();
};

export const updateLocation = async (slug, formData) => {
  const res = await fetch(`${api.baseURL}/location/${slug}/update/`, {
    method: "PUT",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("فشل في تحديث القاعة");
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
