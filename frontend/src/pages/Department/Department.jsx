import React, { useEffect, useState } from 'react';
import '../Department/department.css'
import { fetchPrograms, createProgram, updateProgram, deleteProgram } from '../../services/programApi';
import { fetchFaculties } from '../../services/facultyApi';


export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For create/update modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'update'
  const [selectedDept, setSelectedDept] = useState(null);
  const [form, setForm] = useState({ name: '', faculty: '' });
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
    } catch (err) {
      setFaculties(mockFaculties);
      setError(err.message);
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
    setForm({ name: dept.name, faculty: dept.faculty.id });
    setShowModal(true);
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedDept(null);
    setForm({ name: '', faculty: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Client-side validation
    if (!form.name?.trim()) {
      setError('اسم القسم مطلوب');
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
        const payload = { ...form };
        // Backend requires slug
        payload.slug = slugify(form.name);
        payload.faculty = Number(form.faculty);
        await createProgram(payload);
      } else if (modalType === 'update' && selectedDept) {
        const payload = { name: form.name, faculty: Number(form.faculty) };
        // If you want to allow slug change, include: payload.slug = slugify(form.name)
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
                <button className="btn update" onClick={() => handleUpdate(dept)}>تعديل القسم</button>
                <button className="btn delete" onClick={() => handleDelete(dept.slug)}>حذف القسم</button>
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
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              الكلية:
              <select value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} required>
                <option value="">اختر الكلية</option>
                {faculties.map(fac => (
                  <option key={fac.id} value={fac.id}>{fac.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn update" disabled={submitting}>
              {submitting ? 'جارٍ الحفظ...' : (modalType === 'create' ? 'اضافة القسم' : 'تحديث القسم')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
