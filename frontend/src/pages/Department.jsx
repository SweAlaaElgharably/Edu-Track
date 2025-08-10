



import React, { useEffect, useState } from 'react';
import '../styles/department.css';
import { fetchPrograms, createProgram, updateProgram, deleteProgram } from '../services/programApi';
import { fetchFaculties } from '../services/facultyApi';


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

  useEffect(() => {
    loadDepartments();
    loadFaculties();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const data = await fetchPrograms();
      setDepartments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const loadFaculties = async () => {
    try {
      const data = await fetchFaculties();
      setFaculties(data);
    } catch (err) {
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
    setLoading(true);
    try {
      if (modalType === 'create') {
        await createProgram(form);
      } else if (modalType === 'update' && selectedDept) {
        await updateProgram(selectedDept.slug, form);
      }
      setShowModal(false);
      await loadDepartments();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="department-page">
      <h2 className="department-header">الأقسام</h2>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <div className="department-grid">
        {/* Add Department Card */}
        <div className="add-department-card" onClick={handleCreate}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>+</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>اضافه قسم</span>
        </div>

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
            <button type="submit" className="btn update">{modalType === 'create' ? 'اضافة القسم' : 'تحديث القسم'}</button>
          </form>
        </div>
      )}
    </div>
  );
}
