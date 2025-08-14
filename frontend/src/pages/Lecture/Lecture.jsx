import React, { useEffect, useMemo, useState } from 'react';
import './lecture.css';
import { fetchLectures, createLecture, updateLecture, deleteLecture } from '../../services/lectureApi';
import { fetchLocations } from '../../services/locationApi';

export default function Lecture() {
  const [lectures, setLectures] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedLecture, setSelectedLecture] = useState(null);

  const [form, setForm] = useState({
    title: '',
    instructor: '', // user name
    location: '', // location id
    day: '',
    starttime: '', // HH:MM
    endtime: '', // HH:MM
  });

  const dayOptions = useMemo(
    () => [
      'السبت',
      'الأحد',
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
    ],
    []
  );

  useEffect(() => {
    loadLectures();
    loadLocations();
  }, []);

  const loadLectures = async () => {
    setLoading(true);
    try {
      const data = await fetchLectures();
      setLectures(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const loadLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(Array.isArray(data) ? data : []);
    } catch (err) {
      setLocations([]);
      // don't block page if halls API fails
    }
  };

  const resetForm = () => {
    setForm({ title: '', instructor: '', location: '', day: '', starttime: '', endtime: '' });
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedLecture(null);
    resetForm();
    setShowModal(true);
  };

  const handleUpdate = (lec) => {
    setModalType('update');
    setSelectedLecture(lec);
    setForm({
      title: lec.title || '',
      instructor: lec.instructor || '',
      location: lec.location || lec.location_id || '',
      day: lec.day || '',
      starttime: (lec.starttime || '').slice(0, 5),
      endtime: (lec.endtime || '').slice(0, 5),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف المحاضرة؟')) return;
    setLoading(true);
    try {
      await deleteLecture(id);
      await loadLectures();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validations
    if (!form.title?.trim()) {
      setError('عنوان المحاضرة مطلوب');
      return;
    }
    const instructorId = Number(form.instructor);
    if (!Number.isFinite(instructorId) || instructorId <= 0) {
      setError('رقم المٌحاضر (ID) مطلوب ويجب أن يكون رقمًا صحيحًا');
      return;
    }
    const locationId = Number(form.location);
    if (!Number.isFinite(locationId) || locationId <= 0) {
      setError('القاعه مطلوبة');
      return;
    }
    if (!form.day) {
      setError('اليوم مطلوب');
      return;
    }
    setLoading(true);
    try {
      // Client-side time validation: start must be before end
      const toMinutes = (t) => {
        if (!t || typeof t !== 'string') return NaN;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };
      const sMin = toMinutes(form.starttime);
      const eMin = toMinutes(form.endtime);
      if (!(sMin < eMin)) {
        setError('وقت البدء يجب أن يكون قبل وقت الانتهاء');
        setLoading(false);
        return;
      }

      const payload = {
        title: form.title.trim(),
        instructor: instructorId,
        location: locationId,
        day: form.day,
        starttime: form.starttime,
        endtime: form.endtime,
      };

      if (modalType === 'create') {
        await createLecture(payload);
      } else if (modalType === 'update' && selectedLecture) {
        await updateLecture(selectedLecture.id, payload);
      }
      setShowModal(false);
      resetForm();
      await loadLectures();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getLocationName = (lec) => {
    // If backend provides nested object
    if (lec.location && typeof lec.location === 'object') return lec.location.name || lec.location.title || lec.location.slug;
    // Try match by id
    const loc = locations.find((l) => l.id === lec.location || l.slug === lec.location);
    return loc ? loc.name : lec.location;
  };

  return (
    <div className="lecture-page">
      <h2 className="lecture-header">المحاضرات</h2>
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>
      )}

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
        <div
          className="add-lecture-btn"
          onClick={handleCreate}
          style={{ minWidth: '160px', minHeight: '80px', padding: '1rem 0.7rem', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', boxSizing: 'border-box', display: 'flex', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '1.5rem', marginBottom: 0, marginLeft: '0.5rem' }}>+</span>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>اضافة محاضرة</span>
        </div>
      </div>

      <div className="lecture-table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', color: '#646cff' }}>جاري التحميل...</div>
        ) : (
          <table className="lecture-table">
            <thead>
              <tr>
                <th>العنوان</th>
                <th>المحاضر (ID)</th>
                <th>القاعة</th>
                <th>اليوم</th>
                <th>الوقت</th>
                <th>تعديل</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lec) => (
                <tr key={lec.id} className="lecture-row">
                  <td>{lec.title}</td>
                  <td>{lec.instructor}</td>
                  <td>{getLocationName(lec)}</td>
                  <td>{lec.day}</td>
                  <td>
                    {(lec.starttime || '').slice(0, 5)} - {(lec.endtime || '').slice(0, 5)}
                  </td>
                  <td>
                    <button className="btn update" onClick={() => handleUpdate(lec)}>
                      تعديل
                    </button>
                  </td>
                  <td>
                    <button className="btn delete" onClick={() => handleDelete(lec.id)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="lecture-modal-bg">
          <form className="lecture-modal" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3>{modalType === 'create' ? 'اضافة محاضرة جديدة' : 'تعديل محاضرة'}</h3>

            <label>
              عنوان المحاضرة:
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>

            <label>
              رقم المٌحاضر (ID):
              <input
                type="number"
                min="1"
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                placeholder="مثال: 5"
                required
              />
            </label>

            <label>
              القاعة:
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              >
                <option value="">اختر القاعة</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              اليوم:
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                required
              >
                <option value="">اختر اليوم</option>
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <div className="time-row">
              <label>
                وقت البدء:
                <input
                  type="time"
                  value={form.starttime}
                  onChange={(e) => setForm({ ...form, starttime: e.target.value })}
                  required
                />
              </label>
              <label>
                وقت الانتهاء:
                <input
                  type="time"
                  value={form.endtime}
                  onChange={(e) => setForm({ ...form, endtime: e.target.value })}
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn update" disabled={loading}>
              {loading ? 'جارٍ الحفظ...' : (modalType === 'create' ? 'اضافة' : 'تحديث')}
            </button>
            <button type="button" className="btn cancel" onClick={() => setShowModal(false)} disabled={loading}>
              الغاء
            </button>
          </form>
        </div>
      )}
    </div>
  );
}