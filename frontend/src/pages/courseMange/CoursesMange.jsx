import React, { useEffect, useState } from 'react';
import './coursesMange.css';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../../services/courseApi';
import { fetchPrograms } from '../../services/programApi';

export default function CoursesMange() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', programs: [] });
  const [programs, setPrograms] = useState([]);
  const [programsLoaded, setProgramsLoaded] = useState(false);

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
    loadPrograms();
    loadCourses();
  }, []);

  const loadPrograms = async () => {
    try {
      const data = await fetchPrograms();
      setPrograms(Array.isArray(data) ? data : []);
      setProgramsLoaded(!!(data && data.length));
    } catch (err) {
      setPrograms([]);
      setProgramsLoaded(false);
      setError('تعذر تحميل الأقسام الأكاديمية (البرامج). لا يمكن إضافة/تعديل مقرر بدون الأقسام.');
    }
  };

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
    setForm({ title: course.title || '', slug: course.slug || '', programs: (course.programs || []).map(p => p.id ?? p) });
    setShowModal(true);
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedCourse(null);
    setForm({ title: '', slug: '', programs: [] });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!programsLoaded) {
      setError('تعذر تحميل الأقسام الأكاديمية. يرجى إعادة تحميل الصفحة أو التأكد من تشغيل السيرفر.');
      return;
    }
    if (!form.title?.trim()) {
      setError('اسم المقرر مطلوب');
      return;
    }
    if (!form.slug?.trim()) {
      setError('المعرف (Slug) مطلوب');
      return;
    }
    const slugPattern = /^[A-Za-z0-9_-]+$/;
    if (!slugPattern.test(form.slug)) {
      setError('المعرف (Slug) يجب أن يحتوي على أحرف إنجليزية أو أرقام أو - أو _ فقط');
      return;
    }
    if (!Array.isArray(form.programs) || form.programs.length === 0) {
      setError('يجب اختيار برنامج واحد على الأقل');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        programs: form.programs.map(Number),
      };
      if (modalType === 'create') {
        await createCourse(payload);
      } else if (modalType === 'update' && selectedCourse) {
        await updateCourse(selectedCourse.slug, payload);
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
      <button className="courses-mange-add-btn" onClick={handleCreate} disabled={!programsLoaded}>اضافة مقرر جديد</button>
      <div className="courses-mange-table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', color: '#646cff' }}>جاري التحميل...</div>
        ) : (
          <table className="courses-mange-table">
            <thead>
              <tr>
                <th>اسم المقرر</th>
                <th>المعرف (Slug)</th>
                <th>البرامج المرتبطة</th>
                <th>تعديل</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.slug}>
                  <td>{course.title}</td>
                  <td>{course.slug}</td>
                  <td>{Array.isArray(course.programs) ? course.programs.map(p => p.name || p.title || p).join('، ') : '-'}</td>
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
              <input name="title" type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label>
              المعرف (Slug):
              <input name="slug" type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
            </label>
            <label>
              اختر البرامج المرتبطة:
              <select
                name="programs"
                multiple
                size={Math.min(6, Math.max(3, programs.length || 3))}
                value={(form.programs || []).map(String)}
                onChange={e => {
                  const opts = Array.from(e.target.selectedOptions).map(o => o.value);
                  setForm({ ...form, programs: opts });
                }}
                disabled={!programsLoaded || !programs.length}
                required
              >
                {!programsLoaded && (
                  <option value="" disabled>جاري تحميل البرامج...</option>
                )}
                {programsLoaded && !programs.length && (
                  <option value="" disabled>لا توجد برامج متاحة</option>
                )}
                {programsLoaded && programs.length > 0 && (
                  <option value="" disabled>— اختر برنامج/برامج —</option>
                )}
                {programsLoaded && programs.map(p => (
                  <option key={p.slug || p.id} value={String(p.id)}>{p.name || p.title}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn update" disabled={!programsLoaded}>{modalType === 'create' ? 'اضافة المقرر' : 'تحديث المقرر'}</button>
            <button type="button" className="btn cancel" onClick={() => setShowModal(false)}>الغاء</button>
          </form>
        </div>
      )}
    </div>
  );
}
