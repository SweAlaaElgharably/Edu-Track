import React, { useEffect, useState } from 'react';
import '../styles/coursesMange.css';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../services/courseApi';

export default function CoursesMange() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', credits: '' });

  // MOCK DATA FOR DEMO/DEV - REMOVE THIS BLOCK FOR PRODUCTION
  // To show mock data, uncomment the following and comment out the useEffect below
  /*
  useEffect(() => {
    setCourses([
      { slug: 'math-101', name: 'الرياضيات 101', code: 'MATH101', credits: 3 },
      { slug: 'phys-lab', name: 'معمل الفيزياء', code: 'PHYS201', credits: 2 },
      { slug: 'eng-lit', name: 'الأدب الإنجليزي', code: 'ENG301', credits: 2 },
    ]);
  }, []);
  */
  // END MOCK DATA

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await fetchCourses();
      // If no real data, show mock data for demo
      setCourses(data.length ? data : [
        { slug: 'math-101', name: 'الرياضيات 101', code: 'MATH101', credits: 3 },
        { slug: 'phys-lab', name: 'معمل الفيزياء', code: 'PHYS201', credits: 2 },
        { slug: 'eng-lit', name: 'الأدب الإنجليزي', code: 'ENG301', credits: 2 },
      ]);
      setError(null);
    } catch (err) {
      setCourses([
        { slug: 'math-101', name: 'الرياضيات 101', code: 'MATH101', credits: 3 },
        { slug: 'phys-lab', name: 'معمل الفيزياء', code: 'PHYS201', credits: 2 },
        { slug: 'eng-lit', name: 'الأدب الإنجليزي', code: 'ENG301', credits: 2 },
      ]);
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('هل أنت متأكد من حذف المقرر؟')) return;
    setLoading(true);
    try {
      await deleteCourse(slug);
      await loadCourses();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdate = (course) => {
    setModalType('update');
    setSelectedCourse(course);
    setForm({ name: course.name, code: course.code, credits: course.credits });
    setShowModal(true);
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedCourse(null);
    setForm({ name: '', code: '', credits: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalType === 'create') {
        await createCourse(form);
      } else if (modalType === 'update' && selectedCourse) {
        await updateCourse(selectedCourse.slug, form);
      }
      setShowModal(false);
      await loadCourses();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="courses-mange-page">
      <h2 className="courses-mange-header">ادارة المقررات</h2>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <button className="courses-mange-add-btn" onClick={handleCreate}>اضافة مقرر جديد</button>
      <div className="courses-mange-table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', color: '#646cff' }}>جاري التحميل...</div>
        ) : (
          <table className="courses-mange-table">
            <thead>
              <tr>
                <th>اسم المقرر</th>
                <th>كود المقرر</th>
                <th>عدد الساعات</th>
                <th>تعديل</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.slug}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.credits}</td>
                  <td>
                    <button className="btn update" onClick={() => handleUpdate(course)}>تعديل</button>
                  </td>
                  <td>
                    <button className="btn delete" onClick={() => handleDelete(course.slug)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal for Create/Update */}
      {showModal && (
        <div className="courses-mange-modal-bg">
          <form className="courses-mange-modal" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h3>{modalType === 'create' ? 'اضافة مقرر جديد' : 'تعديل المقرر'}</h3>
            <label>
              اسم المقرر:
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              كود المقرر:
              <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} required />
            </label>
            <label>
              عدد الساعات:
              <input type="number" value={form.credits} onChange={e => setForm({ ...form, credits: e.target.value })} required />
            </label>
            <button type="submit" className="btn update">{modalType === 'create' ? 'اضافة المقرر' : 'تحديث المقرر'}</button>
            <button type="button" className="btn cancel" onClick={() => setShowModal(false)}>الغاء</button>
          </form>
        </div>
      )}
    </div>
  );
}
