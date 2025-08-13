import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/courses.css';

function Courses() {
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
      { id: 1, name: 'الرياضيات 101', progress: 75, nextClass: '2024-01-15 10:00', instructor: 'د. أحمد محمد', room: 'القاعة 201', credits: 3 },
      { id: 2, name: 'معمل الفيزياء', progress: 60, nextClass: '2024-01-16 14:00', instructor: 'د. فاطمة علي', room: 'المعمل 105', credits: 4 },
      { id: 3, name: 'الأدب الإنجليزي', progress: 90, nextClass: '2024-01-17 09:00', instructor: 'د. سارة أحمد', room: 'القاعة 301', credits: 3 },
      { id: 4, name: 'البرمجة المتقدمة', progress: 45, nextClass: '2024-01-18 11:00', instructor: 'د. محمد خالد', room: 'معمل الحاسوب 1', credits: 4 },
      { id: 5, name: 'قواعد البيانات', progress: 80, nextClass: '2024-01-19 13:00', instructor: 'د. أحمد سعيد', room: 'القاعة 401', credits: 3 },
      { id: 6, name: 'شبكات الحاسوب', progress: 70, nextClass: '2024-01-20 15:00', instructor: 'د. نورا محمد', room: 'معمل الشبكات', credits: 4 }
    ]
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="courses-page">
      {/* <PlexusBackground /> */}
      <header className="courses-header">
        <h1>مقرراتي</h1>
      
      </header>

      <div className="courses-stats">
        <div className="stat-card-contact">
          <h3>إجمالي المقررات</h3>
          <div className="stat-number-contact">{mockData.courses.length}</div>
          <p>مقررات مسجلة هذا الفصل</p>
        </div>
        <div className="stat-card-contact">
          <h3>متوسط التقدم</h3>
          <div className="stat-number-contact">
            {Math.round(mockData.courses.reduce((sum, course) => sum + course.progress, 0) / mockData.courses.length)}%
          </div>
          <p>في جميع المقررات</p>
        </div>
        <div className="stat-card-contact">
          <h3>إجمالي الساعات المعتمدة</h3>
          <div className="stat-number-contact">
            {mockData.courses.reduce((sum, course) => sum + course.credits, 0)}
          </div>
          <p>ساعة معتمدة</p>
        </div>
      </div>

      <main className="courses-content">
        <div className="courses-grid">
          {mockData.courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h3>{course.name}</h3>
                <span className="course-credits">{course.credits} ساعة معتمدة</span>
              </div>
              
              <div className="course-info">
                <p><strong>المحاضر:</strong> {course.instructor}</p>
                <p><strong>القاعة:</strong> {course.room}</p>
                <p><strong>المحاضرة القادمة:</strong> {course.nextClass}</p>
              </div>
              
              <div className="progress-section">
                <div className="progress-label">
                  <span>التقدم</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                </div>
              </div>
              
              <div className="course-actions">
                <Link to={`/course/${course.id}`} className="btn btn-primary">عرض التفاصيل</Link>
                <Link to={`/course/${course.id}/assignments`} className="btn btn-outline">الواجبات</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Courses; 