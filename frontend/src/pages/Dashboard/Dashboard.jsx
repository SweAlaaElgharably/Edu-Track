import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';
import Courses from '../../components/Courses';
import Schedule from '../../components/Schedule';
import FacultyManage from '../FacultyManage/FacultyManage';
import Department from '../Department/Department';
import Hall from '../Hall/Hall';
import CoursesMange from '../../components/CoursesMange';

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Mock data - replace with real data from backend
  const mockData = {
    courses: [
      {
        id: 1,
        name: "الرياضيات 101",
        progress: 75,
        nextClass: "2024-01-15 10:00",
      },
      {
        id: 2,
        name: "معمل الفيزياء",
        progress: 60,
        nextClass: "2024-01-16 14:00",
      },
      {
        id: 3,
        name: "الأدب الإنجليزي",
        progress: 90,
        nextClass: "2024-01-17 09:00",
      },
    ],
    upcomingDeadlines: [
      {
        id: 1,
        title: "واجب الرياضيات",
        course: "الرياضيات 101",
        dueDate: "2024-01-20",
      },
      {
        id: 2,
        title: "تقرير الفيزياء",
        course: "معمل الفيزياء",
        dueDate: "2024-01-22",
      },
    ],
    recentActivity: [
      {
        id: 1,
        action: "تم إكمال الواجب",
        course: "الأدب الإنجليزي",
        time: "قبل ساعتين",
      },
      {
        id: 2,
        action: "حضور المحاضرة",
        course: "الرياضيات 101",
        time: "قبل يوم واحد",
      },
    ],
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (

    <div className="dashboard-container">
      {/* <PlexusBackground /> */}
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <nav className="sidebar-nav">
          <h3 style={{ marginBottom: "10px" }}>لوحة التحكم</h3>
          <button
            className={`sidebar-tab ${activeTab === "overview" ? "active" : ""
              }`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-text">نظرة عامة</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            <span className="tab-icon">📚</span>
            <span className="tab-text">المقررات</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "schedule" ? "active" : ""
              }`}
            onClick={() => setActiveTab("schedule")}
          >
            <span className="tab-icon">📅</span>
            <span className="tab-text">الجدول</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "progress" ? "active" : ""
              }`}
            onClick={() => setActiveTab("progress")}
          >
            <span className="tab-icon">📈</span>
            <span className="tab-text">التقدم</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "facultyManagement" ? "active" : ""
              }`}
            onClick={() => setActiveTab("facultyManagement")}
          >
            <span className="tab-icon">🏫</span>
            <span className="tab-text"> الكليات</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "department" ? "active" : ""
              }`}
            onClick={() => setActiveTab("department")}
          >
            <span className="tab-icon"> 🗂️ </span>
            <span className="tab-text"> الأقسام</span>
          </button>
          <button
            className={`sidebar-tab ${
              activeTab === "hall" ? "active" : ""
            }`}
            onClick={() => setActiveTab("hall")}
          >
            <span className="tab-icon">🏛️</span>
            <span className="tab-text"> القاعات</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "coursesMange" ? "active" : ""}`}
            onClick={() => setActiveTab("coursesMange")}
          >
            <span className="tab-icon">📝</span>
            <span className="tab-text">ادارة المقررات</span>
          </button>
        </nav>
        <div className="sidebar-header">
          <div className="user-info">
            <span>مرحباً بك، {user?.first_name || "طالب"}!</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <Link to="/profile" className="btn btn-secondary">
            الملف الشخصي
          </Link>
        </div>
      </aside>

      {/* Main Content */}

      <main className="dashboard-main">

        <div className="dashboard-content">
          {activeTab === "overview" && (
            <div className="overview-grid">
              <div className="stats-card">
                <h3>المقررات الحالية</h3>
                <div className="stat-number-dashboard">
                  {mockData.courses.length}
                </div>
                <p>المقررات النشطة هذا الفصل الدراسي</p>
              </div>

              <div className="stats-card">
                <h3>متوسط التقدم</h3>
                <div className="stat-number-dashboard">75%</div>
                <p>في جميع المقررات</p>
              </div>

              <div className="stats-card">
                <h3>المواعيد القادمة</h3>
                <div className="stat-number-dashboard">
                  {mockData.upcomingDeadlines.length}
                </div>
                <p>الواجبات المستحقة قريباً</p>
              </div>

              <div className="stats-card">
                <h3>المحاضرات اليوم</h3>
                <div className="stat-number-dashboard">2</div>
                <p>المحاضرة القادمة خلال 30 دقيقة</p>
              </div>
              {/* University/Faculty Management Card */}
              {/* <div
                className="stats-card"
                style={{ cursor: "pointer" }}
                onClick={() => (window.location.href = "/universities")}
              >
                <h3>إدارة الجامعات والكليات</h3>
                <div className="stat-number-dashboard" style={{ fontSize: 32 }}>
                  🔗
                </div>
                <p>انتقل لإدارة الجامعات والكليات</p>
                <a
                  href="/universities"
                  className="btn btn-secondary"
                  style={{
                    marginTop: 12,
                    color: "#fff",
                    background: "#1976d2",
                    border: "none",
                  }}
                >
                  الذهاب للإدارة
                </a>
              </div> */}
            </div>
          )}

          {activeTab === "courses" && <Courses />}
          {activeTab === "facultyManagement" && <FacultyManage />}
          {activeTab === "coursesMange" && <CoursesMange />}
          {activeTab === "schedule" && <Schedule />}
          {activeTab === "department" && <Department />}
          {activeTab === "hall" && <Hall />}

          {activeTab === "progress" && (
            <div className="progress-section-applying">
              <h2>التقدم الأكاديمي</h2>
              <div className="progress-chart">
                <div className="chart-placeholder">
                  <p>سيتم عرض الرسوم البيانية والتحليلات هنا</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
