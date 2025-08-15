import React, { useEffect, useState } from 'react';
import '../Department/department.css'
import { fetchPrograms, createProgram, updateProgram, deleteProgram } from '../../services/programApi';
import { fetchFaculties } from '../../services/facultyApi';


export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [facultiesLoaded, setFacultiesLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For create/update modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'update'
  const [selectedDept, setSelectedDept] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', faculty: '' });
  const [submitting, setSubmitting] = useState(false);

  const slugify = (text) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      // Replace spaces with -
      .replace(/\s+/g, '-')
      // Remove all non-word chars except - and _
      .replace(/[^a-z0-9-_]/g, '')
      // Replace multiple - with single -
      .replace(/-+/g, '-')
      // Trim - from start and end
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    loadDepartments();
    loadFaculties();
  }, []);


  // Mock data for style testing
  const mockFaculties = [
    { id: 1, name: 'كلية الهندسة' },
    { id: 2, name: 'كلية العلوم' },
    { id: 3, name: 'كلية التجارة' },
  ];
  const mockDepartments = [
    { slug: 'cs', name: 'قسم الحاسبات', faculty: mockFaculties[0] },
    { slug: 'physics', name: 'قسم الفيزياء', faculty: mockFaculties[1] },
    { slug: 'chemistry', name: 'قسم الكيمياء', faculty: mockFaculties[1] },
    { slug: 'business', name: 'قسم إدارة الأعمال', faculty: mockFaculties[2] },
  ];

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const data = await fetchPrograms();
      setDepartments(data.length ? data : mockDepartments);
      setError(null);
    } catch (err) {
      setDepartments(mockDepartments);
      setError(err.message);
    }
    setLoading(false);
  };


  const loadFaculties = async () => {
    try {
      const data = await fetchFaculties();
      setFaculties(data.length ? data : mockFaculties);
      setFacultiesLoaded(!!data.length);
    } catch (err) {
      setFaculties([]);
      setFacultiesLoaded(false);
      setError('تعذر تحميل قائمة الكليات. لا يمكن إضافة/تعديل قسم بدون الكليات.');
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('هل أنت متأكد من حذف القسم؟')) return;
    setLoading(true);
    try {
      await deleteProgram(slug);
      await loadDepartments();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdate = (dept) => {
    setModalType('update');
    setSelectedDept(dept);
    setForm({ name: dept.name, slug: dept.slug, faculty: dept.faculty.id });
    setShowModal(true);
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedDept(null);
    setForm({ name: '', slug: '', faculty: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!facultiesLoaded) {
      setError('تعذر تحميل الكليات. يرجى إعادة تحميل الصفحة أو التأكد من تشغيل السيرفر.');
      return;
    }
    // Client-side validation
    if (!form.name?.trim()) {
      setError('اسم القسم مطلوب');
      return;
    }
    if (!form.slug?.trim()) {
      setError('المعرف (Slug) مطلوب');
      return;
    }
    // Slug must be ASCII letters/numbers/-/_ to match Django SlugField default
    const slugPattern = /^[A-Za-z0-9_-]+$/;
    if (!slugPattern.test(form.slug)) {
      setError('المعرف (Slug) يجب أن يحتوي على أحرف إنجليزية أو أرقام أو - أو _ فقط');
      return;
    }
    if (!form.faculty) {
      setError('يجب اختيار الكلية');
      return;
    }
    setLoading(true);
    setSubmitting(true);
    try {
      if (modalType === 'create') {
        const payload = { name: form.name.trim(), slug: form.slug.trim(), faculty: Number(form.faculty) };
        await createProgram(payload);
      } else if (modalType === 'update' && selectedDept) {
        const payload = { name: form.name, slug: form.slug.trim(), faculty: Number(form.faculty) };
        await updateProgram(selectedDept.slug, payload);
      }
      setShowModal(false);
      await loadDepartments();
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء حفظ القسم');
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="department-page">
      <h2 className="department-header">الأقسام</h2>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
        <div className="add-department-card" onClick={handleCreate} style={{
          minWidth: '140px', minHeight: '80px', padding: '1rem 0.7rem', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', boxSizing: 'border-box'
        }}>
          <span style={{ fontSize: '1.5rem', marginBottom: 0, marginLeft: '0.5rem' }}>+</span>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>اضافه قسم</span>
        </div>
      </div>
      <div className="department-grid">
        {/* Department Cards */}
        {loading ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#646cff' }}>جاري التحميل...</div>
        ) : (
          departments.map((dept) => (
            <div key={dept.slug} className="department-card">
              <div className="department-info">
                <div className="department-name">
                  اسم القسم: <span>{dept.name}</span>
                </div>
                <div className="faculty-name">
                  اسم الكليه: <span>{dept.faculty?.name}</span>
                </div>
              </div>
              <div className="department-actions">
                <button className="btn update" onClick={() => handleUpdate(dept)}>تعديل </button>
                <button className="btn delete" onClick={() => handleDelete(dept.slug)}>حذف</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Create/Update */}
      {showModal && (
        <div className="department-modal-bg">
          <form className="department-modal" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h3>{modalType === 'create' ? 'اضافة قسم جديد' : 'تعديل القسم'}</h3>
            <label>
              اسم القسم:
              <input name="name" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              المعرف (Slug):
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                placeholder="مثال: computer-science"
                required
              />
            </label>
            <label>
              الكلية:
              <select name="faculty" value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} required disabled={!facultiesLoaded}>
                <option value="">اختر الكلية</option>
                {facultiesLoaded && faculties.map(fac => (
                  <option key={fac.id} value={fac.id}>{fac.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn update" disabled={submitting || !facultiesLoaded}>
              {submitting ? 'جارٍ الحفظ...' : (modalType === 'create' ? 'اضافة القسم' : 'تحديث القسم')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}