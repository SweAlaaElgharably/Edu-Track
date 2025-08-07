import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Mock data - replace with real data from backend
  const mockData = {
    courses: [
      { id: 1, name: 'الرياضيات 101', progress: 75, nextClass: '2024-01-15 10:00' },
      { id: 2, name: 'معمل الفيزياء', progress: 60, nextClass: '2024-01-16 14:00' },
      { id: 3, name: 'الأدب الإنجليزي', progress: 90, nextClass: '2024-01-17 09:00' }
    ],
    upcomingDeadlines: [
      { id: 1, title: 'واجب الرياضيات', course: 'الرياضيات 101', dueDate: '2024-01-20' },
      { id: 2, title: 'تقرير الفيزياء', course: 'معمل الفيزياء', dueDate: '2024-01-22' }
    ],
    recentActivity: [
      { id: 1, action: 'تم إكمال الواجب', course: 'الأدب الإنجليزي', time: 'قبل ساعتين' },
      { id: 2, action: 'حضور المحاضرة', course: 'الرياضيات 101', time: 'قبل يوم واحد' }
    ]
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>لوحة التحكم</h1>
        <div className="user-info">
          <span>مرحباً بك، {user?.first_name || 'طالب'}!</span>
          <Link to="/profile" className="btn btn-secondary">الملف الشخصي</Link>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          نظرة عامة
        </button>
        <button 
          className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          المقررات
        </button>
        <button 
          className={`nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          الجدول
        </button>
        <button 
          className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          التقدم
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="stats-card">
              <h3>المقررات الحالية</h3>
              <div className="stat-number">{mockData.courses.length}</div>
              <p>المقررات النشطة هذا الفصل الدراسي</p>
            </div>
            
            <div className="stats-card">
              <h3>متوسط التقدم</h3>
              <div className="stat-number">75%</div>
              <p>في جميع المقررات</p>
            </div>
            
            <div className="stats-card">
              <h3>المواعيد القادمة</h3>
              <div className="stat-number">{mockData.upcomingDeadlines.length}</div>
              <p>الواجبات المستحقة قريباً</p>
            </div>
            
            <div className="stats-card">
              <h3>المحاضرات اليوم</h3>
              <div className="stat-number">2</div>
              <p>المحاضرة القادمة خلال 30 دقيقة</p>
            </div>
            <Link to="/university" className="stats-card stats-card-link">
              <h3>إدارة الجامعات</h3>
              <div className="stat-number" style={{ fontSize: 32 }}>🎓</div>
              <p>انتقل لإدارة الجامعات</p>
            </Link>
           
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="courses-section">
            <h2>مقرراتي</h2>
            <p>انقر على "المقررات" في شريط التنقل لعرض جميع مقرراتك</p>
            <Link to="/courses" className="btn btn-primary">عرض جميع المقررات</Link>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="schedule-section">
            <h2>جدول المحاضرات</h2>
            <p>انقر على "الجدول" في شريط التنقل لعرض جدول محاضراتك</p>
            <Link to="/schedule" className="btn btn-primary">عرض الجدول الكامل</Link>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-section">
            <h2>التقدم الأكاديمي</h2>
            <div className="progress-chart">
              <div className="chart-placeholder">
                <p>سيتم عرض الرسوم البيانية والتحليلات هنا</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard; 