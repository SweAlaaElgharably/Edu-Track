import React, { useEffect, useState } from 'react';
import './hall.css';
import { fetchLocations, createLocation, updateLocation, deleteLocation } from '../../services/locationApi';
import { fetchFaculties } from '../../services/facultyApi';

export default function Hall() {
  const [halls, setHalls] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedHall, setSelectedHall] = useState(null);
  const [form, setForm] = useState({ name: '', faculty: '', slug: '', capacity: '' });

  // MOCK DATA FOR DEMO/DEV - REMOVE THIS BLOCK FOR PRODUCTION
  // To show mock data, uncomment the following and comment out the useEffect below
  /*
  useEffect(() => {
    setHalls([
      { slug: 'hall-101', name: 'قاعة 101', faculty: { id: 1, name: 'كلية الهندسة' }, capacity: 120 },
      { slug: 'hall-202', name: 'قاعة 202', faculty: { id: 2, name: 'كلية العلوم' }, capacity: 80 },
      { slug: 'hall-303', name: 'قاعة 303', faculty: { id: 3, name: 'كلية التجارة' }, capacity: 60 },
    ]);
    setFaculties([
      { id: 1, name: 'كلية الهندسة' },
      { id: 2, name: 'كلية العلوم' },
      { id: 3, name: 'كلية التجارة' },
    ]);
  }, []);
  */
  // END MOCK DATA

  useEffect(() => {
    loadHalls();
    loadFaculties();
  }, []);

  const loadHalls = async () => {
    setLoading(true);
    try {
      const data = await fetchLocations();
      // If no real data, show mock data for demo
      setHalls(data.length ? data : [
        { slug: 'hall-101', name: 'قاعة 101', faculty: { id: 1, name: 'كلية الهندسة' }, capacity: 120 },
        { slug: 'hall-202', name: 'قاعة 202', faculty: { id: 2, name: 'كلية العلوم' }, capacity: 80 },
        { slug: 'hall-303', name: 'قاعة 303', faculty: { id: 3, name: 'كلية التجارة' }, capacity: 60 },
      ]);
      setError(null);
    } catch (err) {
      setHalls([
        { slug: 'hall-101', name: 'قاعة 101', faculty: { id: 1, name: 'كلية الهندسة' }, capacity: 120 },
        { slug: 'hall-202', name: 'قاعة 202', faculty: { id: 2, name: 'كلية العلوم' }, capacity: 80 },
        { slug: 'hall-303', name: 'قاعة 303', faculty: { id: 3, name: 'كلية التجارة' }, capacity: 60 },
      ]);
      setError(err.message);
    }
    setLoading(false);
  };

  const loadFaculties = async () => {
    try {
      const data = await fetchFaculties();
      setFaculties(data.length ? data : [
        { id: 1, name: 'كلية الهندسة' },
        { id: 2, name: 'كلية العلوم' },
        { id: 3, name: 'كلية التجارة' },
      ]);
    } catch (err) {
      setFaculties([
        { id: 1, name: 'كلية الهندسة' },
        { id: 2, name: 'كلية العلوم' },
        { id: 3, name: 'كلية التجارة' },
      ]);
      setError(err.message);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('هل أنت متأكد من حذف القاعة؟')) return;
    setLoading(true);
    try {
      await deleteLocation(slug);
      await loadHalls();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdate = (hall) => {
    setModalType('update');
    setSelectedHall(hall);
    setForm({ name: hall.name, faculty: hall.faculty.id, slug: hall.slug, capacity: hall.capacity });
    setShowModal(true);
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedHall(null);
    setForm({ name: '', faculty: '', slug: '', capacity: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalType === 'create') {
        await createLocation(form);
      } else if (modalType === 'update' && selectedHall) {
        await updateLocation(selectedHall.slug, form);
      }
      setShowModal(false);
      await loadHalls();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="hall-page">
      <h2 className="hall-header">القاعات</h2>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
        <div className="add-hall-btn" onClick={handleCreate} style={{
          minWidth: '140px', minHeight: '80px', padding: '1rem 0.7rem', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', boxSizing: 'border-box', display: 'flex', cursor: 'pointer',
        }}>
          <span style={{ fontSize: '1.5rem', marginBottom: 0, marginLeft: '0.5rem' }}>+</span>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>اضافه قاعة</span>
        </div>
      </div>
      <div className="hall-table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', color: '#646cff' }}>جاري التحميل...</div>
        ) : (
          <table className="hall-table">
            <thead>
              <tr>
                <th>اسم القاعة</th>
                <th>اسم الكلية</th>
                <th>slug</th>
                <th>مساحه القاعة</th>
                <th>تعديل القاعة</th>
                <th>مسح القاعة</th>
              </tr>
            </thead>
            <tbody>
              {halls.map(hall => (
                <tr key={hall.slug} className="hall-row">
                  <td>{hall.name}</td>
                  <td>{hall.faculty?.name}</td>
                  <td>{hall.slug}</td>
                  <td>{hall.capacity}</td>
                  <td>
                    <button className="btn update" onClick={() => handleUpdate(hall)}>تعديل القاعة</button>
                  </td>
                  <td>
                    <button className="btn delete" onClick={() => handleDelete(hall.slug)}>مسح القاعة</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal for Create/Update */}
      {showModal && (
        <div className="hall-modal-bg">
          <form className="hall-modal" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h3>{modalType === 'create' ? 'اضافة قاعة جديدة' : 'تعديل القاعة'}</h3>
            <label>
              اسم القاعة:
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              اسم الكلية:
              <select value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} required>
                <option value="">اختر الكلية</option>
                {faculties.map(fac => (
                  <option key={fac.id} value={fac.id}>{fac.name}</option>
                ))}
              </select>
            </label>
            <label>
              slug:
              <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
            </label>
            <label>
              مساحه القاعة:
              <input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} required />
            </label>
            <button type="submit" className="btn update">{modalType === 'create' ? 'اضافة القاعة' : 'تحديث القاعة'}</button>
            <button type="button" className="btn cancel" onClick={() => setShowModal(false)}>الغاء</button>
          </form>
        </div>
      )}
    </div>
  );
}
