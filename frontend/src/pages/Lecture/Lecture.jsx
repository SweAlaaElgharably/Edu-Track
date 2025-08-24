import React, { useEffect, useMemo, useState } from "react";
import "./lecture.css";
import {
  fetchLectures,
  createLecture,
  updateLecture,
  deleteLecture,
} from "../../services/lectureApi";
import { fetchLocations } from "../../services/locationApi";
import { fetchCourses } from "../../services/courseApi"
import { fetchUsers } from "../../services/userApi"

export default function Lecture() {
  const [lectures, setLectures] = useState([]);
  const [locations, setLocations] = useState([]);
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const [modalType, setModalType] = useState("create");
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Loaders and CRUD handlers (restored)
  useEffect(() => {
    loadLectures();
    loadLocations();
    loadCourses();
    loadUsers();
  }, []);

  const loadLectures = async () => {
    setLoading(true);
    try {
      const data = await fetchLectures();
      setLectures(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setLectures([]);
      setError(err?.message || "");
    }
    setLoading(false);
  };

  const loadLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(Array.isArray(data) ? data : []);
    } catch (err) {
      setLocations([]);
      setError(err?.message || "");
    }
  };

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setCourses([]);
      setError(err?.message || "");
    }
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setUsers([]);
      setError(err?.message || "");
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setSelectedLecture(null);
    resetForm();
    setShowModal(true);
  };

  const handleUpdate = (lec) => {
    setModalType("update");
    setSelectedLecture(lec);
    setForm({
      course: lec.course || "",
      instructor: lec.instructor || "",
      location: lec.location || lec.location_id || "",
      day: lec.day || "",
      starttime: (lec.starttime || "").slice(0, 5),
      endtime: (lec.endtime || "").slice(0, 5),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteLecture(id);
      await loadLectures();
      setShowDeleteModal(false);
      setLectureToDelete(null);
    } catch (err) {
      setError(err?.message || "");
    }
    setLoading(false);
  };

  const [form, setForm] = useState({
    course: "",
    instructor: "", // user name
    location: "", // location id
    day: "",
    starttime: "", // HH:MM
    endtime: "", // HH:MM
  });

  const dayOptions = useMemo(
    () => [
      "السبت",
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
    ],
    []
  );

  const resetForm = () => {
    setForm({
      course: "",
      instructor: "",
      location: "",
      day: "",
      starttime: "",
      endtime: "",
    });
  };

  const openDeleteModal = (lecture) => {
    setLectureToDelete(lecture);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validations
    const courseId = Number(form.course);
    if (!Number.isFinite(courseId) || courseId <= 0) {
      setError("المقرر مطلوب");
      return;
    }
    const instructorId = Number(form.instructor);
    if (!Number.isFinite(instructorId) || instructorId <= 0) {
      setError("المٌحاضر مطلوب");
      return;
    }
    const locationId = Number(form.location);
    if (!Number.isFinite(locationId) || locationId <= 0) {
      setError("القاعه مطلوبة");
      return;
    }
    if (!form.day) {
      setError("اليوم مطلوب");
      return;
    }
    setLoading(true);
    try {
      const startDate = new Date(`1970-01-01T${form.starttime}:00`);
      const endDate = new Date(`1970-01-01T${form.endtime}:00`);
      if (!(startDate < endDate)) {
        setError("وقت البدء يجب أن يكون قبل وقت الانتهاء");
        setLoading(false);
        return;
      }

      const payload = {
        course: courseId,
        instructor: instructorId,
        location: locationId,
        day: form.day,
        starttime: form.starttime,
        endtime: form.endtime,
      };

      if (modalType === "create") {
        console.log("send is ok")
        await createLecture(payload);
      } else if (modalType === "update" && selectedLecture) {
        await updateLecture(selectedLecture.id, payload);
      }
      setShowModal(false);
      resetForm();
      await loadLectures();
      setError(null);
    } catch (err) {
      setError(err?.message);
    }
    setLoading(false);
  };

  const getLocationName = (lec) => {
    // If backend provides nested object
    if (lec.location && typeof lec.location === "object")
      return lec.location.name || lec.location.title || lec.location.slug;
    // Try match by id
    const loc = locations.find(
      (l) => l.id === lec.location || l.slug === lec.location
    );
    return loc ? loc.name : lec.location;
  };

  const getCourseName = (lec) => {
    if (lec.course && typeof lec.course === "object")
      return lec.course.title || lec.location.slug;
    const course = courses.find((c) => c.id === lec.course);
    return course ? course.title : lec.course;
  };

  const getUserName = (lec) => {
    if (lec.instructor && typeof lec.instructor === "object")
      return `${lec.instructor.first_name} ${lec.instructor.last_name}`;
    const user = users.find((u) => u.id === lec.instructor);
    return user ? `${user.first_name} ${user.last_name}` : lec.instructor;
  };

  return (
    <div className="lecture-page">
      <h2 className="lecture-header">المحاضرات</h2>
      {error && (
        <div
          style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="add-lecture-btn"
          onClick={handleCreate}
          style={{
            minWidth: "160px",
            minHeight: "80px",
            padding: "1rem 0.7rem",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
            boxSizing: "border-box",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              marginBottom: 0,
              marginLeft: "0.5rem",
            }}
          >
            +
          </span>
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
            اضافة محاضرة
          </span>
        </div>
      </div>

      <div className="lecture-table-wrapper">
        {loading ? (
          <div style={{ textAlign: "center", color: "#646cff" }}>
            جاري التحميل...
          </div>
        ) : (
          <table className="lecture-table">
            <thead>
              <tr>
                <th>المقرر</th>
                <th>المحاضر</th>
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
                  <td>{getCourseName(lec)}</td>
                  <td>{getUserName(lec)}</td>
                  <td>{getLocationName(lec)}</td>
                  <td>{lec.day}</td>
                  <td>
                    {(lec.starttime || "").slice(0, 5)} -{" "}
                    {(lec.endtime || "").slice(0, 5)}
                  </td>
                  <td>
                    <button
                      className="btn update"
                      onClick={() => handleUpdate(lec)}
                    >
                      تعديل
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn delete"
                      onClick={() => openDeleteModal(lec)}
                    >
                      <span
                        style={{ verticalAlign: "middle", marginRight: "4px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 6h18v2H3V6zm2 3h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 2v7h2v-7h-2zm-4 0v7h2v-7H6zm8 0v7h2v-7h-2z" />
                        </svg>
                      </span>
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
        <div className="lecture-modal-bg" style={{ paddingTop: "80px" }}>
          <form
            className="lecture-modal"
            onSubmit={handleSubmit}
            style={{ maxWidth: 520, padding: "0.6rem 0.75rem", gap: "0.5rem" }}
          >
            <button
              type="button"
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ×
            </button>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>
              {modalType === "create" ? "اضافة محاضرة جديدة" : "تعديل محاضرة"}
            </h3>
            <label>
              المقرر:
              <select
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                required
              >
                <option value="">اختر المقرر</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              المٌحاضر:
              <select
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                required
              >
                <option value="">اختر المحاضر</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </select>
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
                  onChange={(e) =>
                    setForm({ ...form, starttime: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                وقت الانتهاء:
                <input
                  type="time"
                  value={form.endtime}
                  onChange={(e) =>
                    setForm({ ...form, endtime: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <button type="submit" className="btn update" disabled={loading}>
              {loading
                ? "جارٍ الحفظ..."
                : modalType === "create"
                ? "اضافة"
                : "تحديث"}
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                setShowModal(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={loading}
              style={{
                background: "#eee",
                color: "#333",
                border: "1px solid #bbb",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f5c6cb")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "#eee")}
            >
              الغاء
            </button>
          </form>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && lectureToDelete && (
        <div className="lecture-modal-bg" style={{ paddingTop: "80px" }}>
          <div
            className="lecture-modal"
            style={{
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <button
              type="button"
              className="close-btn"
              onClick={() => {
                setShowDeleteModal(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ×
            </button>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "#d32f2f", fontSize: "1.5rem" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18v2H3V6zm2 3h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 2v7h2v-7h-2zm-4 0v7h2v-7H6zm8 0v7h2v-7h-2z" />
                </svg>
              </span>
              تأكيد حذف المحاضرة
            </h3>
            <p>
              هل أنت متأكد من حذف المحاضرة <b>{lectureToDelete.title}</b>؟ لا
              يمكن التراجع عن هذا الإجراء.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <button
                className="btn delete"
                onClick={() => handleDelete(lectureToDelete.id)}
                disabled={loading}
              >
                <span style={{ verticalAlign: "middle", marginRight: "4px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 6h18v2H3V6zm2 3h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 2v7h2v-7h-2zm-4 0v7h2v-7H6zm8 0v7h2v-7h-2z" />
                  </svg>
                </span>
                نعم، حذف
              </button>
              <button
                className="btn cancel"
                style={{
                  background: "#eee",
                  color: "#333",
                  border: "1px solid #bbb",
                }}
                onClick={() => {
                  setShowDeleteModal(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5c6cb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#eee")
                }
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
