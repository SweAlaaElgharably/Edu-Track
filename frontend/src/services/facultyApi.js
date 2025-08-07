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
  // Don't set Content-Type header - let the browser set it with the correct boundary
  const headers = {
    ...api.getAuthHeaders(),
  };
  
  // Remove Content-Type header if it exists to let the browser set it with the correct boundary
  if (headers['Content-Type']) {
    delete headers['Content-Type'];
  }

  const res = await fetch(`${api.baseURL}/faculty/create/`, {
    method: 'POST',
    headers: headers,
    body: formData, // Send the original formData directly
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      console.error('Failed to parse error response:', errorText);
      throw new Error('فشل في إنشاء الكلية: استجابة غير صالحة من الخادم');
    }
    throw new Error(errorData.detail || 'فشل في إنشاء الكلية');
  }
  
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
