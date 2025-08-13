import api from "./api";

// Ensure start time is before end time
function assertStartBeforeEnd(start, end) {
  const toMinutes = (t) => {
    if (!t || typeof t !== 'string') return NaN;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const s = toMinutes(start);
  const e = toMinutes(end);
  if (!(s < e)) {
    throw new Error('وقت البدء يجب أن يكون قبل وقت الانتهاء');
  }
}

// Base path: /lecture/
export const fetchLectures = async () => {
  const res = await fetch(`${api.baseURL}/lecture/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب المحاضرات");
  return res.json();
};

export const getLecture = async (id) => {
  const res = await fetch(`${api.baseURL}/lecture/${id}/`, {
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في جلب بيانات المحاضرة");
  return res.json();
};

export const createLecture = async (payload) => {
  // Client-side time validation
  assertStartBeforeEnd(payload.starttime, payload.endtime);
  const res = await fetch(`${api.baseURL}/lecture/create/`, {
    method: "POST",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || err?.non_field_errors?.[0] || err?.message || "فشل في إنشاء المحاضرة");
  }
  return res.json();
};

export const updateLecture = async (id, payload) => {
  // Client-side time validation
  assertStartBeforeEnd(payload.starttime, payload.endtime);
  const res = await fetch(`${api.baseURL}/lecture/${id}/update/`, {
    method: "PUT",
    headers: api.getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || err?.non_field_errors?.[0] || err?.message || "فشل في تحديث المحاضرة");
  }
  return res.json();
};

export const deleteLecture = async (id) => {
  const res = await fetch(`${api.baseURL}/lecture/${id}/delete/`, {
    method: "DELETE",
    headers: api.getAuthHeaders(),
  });
  if (!res.ok) throw new Error("فشل في حذف المحاضرة");
  return true;
};
