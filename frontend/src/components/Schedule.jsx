import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/schedule.css';

function Schedule() {
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
    todaySchedule: [
      { id: 1, time: '08:00 ص', course: 'الرياضيات 101', instructor: 'د. أحمد محمد', room: 'القاعة 201', duration: '90 دقيقة', type: 'محاضرة' },
      { id: 2, time: '10:30 ص', course: 'معمل الفيزياء', instructor: 'د. فاطمة علي', room: 'المعمل 105', duration: '120 دقيقة', type: 'معمل' },
      { id: 3, time: '02:00 م', course: 'الأدب الإنجليزي', instructor: 'د. سارة أحمد', room: 'القاعة 301', duration: '90 دقيقة', type: 'محاضرة' },
      { id: 4, time: '04:30 م', course: 'البرمجة المتقدمة', instructor: 'د. محمد خالد', room: 'معمل الحاسوب 1', duration: '120 دقيقة', type: 'معمل' }
    ],
    weekSchedule: {
      'الأحد': [
        { time: '08:00 ص', course: 'الرياضيات 101', room: 'القاعة 201' },
        { time: '10:30 ص', course: 'معمل الفيزياء', room: 'المعمل 105' }
      ],
      'الاثنين': [
        { time: '09:00 ص', course: 'الأدب الإنجليزي', room: 'القاعة 301' },
        { time: '11:30 ص', course: 'البرمجة المتقدمة', room: 'معمل الحاسوب 1' }
      ],
      'الثلاثاء': [
        { time: '08:00 ص', course: 'قواعد البيانات', room: 'القاعة 401' },
        { time: '10:30 ص', course: 'شبكات الحاسوب', room: 'معمل الشبكات' }
      ],
      'الأربعاء': [
        { time: '09:00 ص', course: 'الرياضيات 101', room: 'القاعة 201' },
        { time: '11:30 ص', course: 'معمل الفيزياء', room: 'المعمل 105' }
      ],
      'الخميس': [
        { time: '08:00 ص', course: 'الأدب الإنجليزي', room: 'القاعة 301' },
        { time: '10:30 ص', course: 'البرمجة المتقدمة', room: 'معمل الحاسوب 1' }
      ],
      'السبت': [
        { time: '09:00 ص', course: 'قواعد البيانات', room: 'القاعة 401' },
        { time: '11:30 ص', course: 'شبكات الحاسوب', room: 'معمل الشبكات' }
      ],
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="schedule-page">
      <header className="schedule-header">
        <h1>جدول المحاضرات</h1>
       
      </header>

      <div className="schedule-stats">
        <div className="stat-card">
          <h3>محاضرات اليوم</h3>
          <div className="stat-number">{mockData.todaySchedule.length}</div>
          <p>محاضرات ومعامل</p>
        </div>
        <div className="stat-card">
          <h3>إجمالي الساعات</h3>
          <div className="stat-number">
            {mockData.todaySchedule.reduce((sum, class_) => {
              const duration = parseInt(class_.duration);
              return sum + (isNaN(duration) ? 90 : duration);
            }, 0) / 60}
          </div>
          <p>ساعة دراسية</p>
        </div>
        <div className="stat-card">
          <h3>المحاضرة القادمة</h3>
          <div className="stat-number">
            {mockData.todaySchedule.length > 0 ? mockData.todaySchedule[0].time : 'لا توجد'}
          </div>
          <p>في اليوم</p>
        </div>
      </div>

      <main className="schedule-content schedule-columns">
        <section className="today-schedule">
          <h2>جدول اليوم</h2>
          <div className="schedule-list">
            {mockData.todaySchedule.map(class_ => (
              <div key={class_.id} className="schedule-item">
                <div className="time-section">
                  <div className="time">🕒{class_.time}</div>
                  <div className="duration">{class_.duration}</div>
                </div>
                <div className="class-info">
                  <h4>{class_.course}</h4>
                  <p><strong>المحاضر:</strong> {class_.instructor}</p>
                  <p><strong>القاعة:</strong> {class_.room}</p>
                  <span className="class-type">{class_.type}</span>
                </div>
                <div className="class-actions">
                  <Link to={`/course/${class_.id}`} className="btn btn-outline">تفاصيل المقرر</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="week-schedule">
          <h2>جدول الأسبوع</h2>
          <div className="week-grid">
            {Object.entries(mockData.weekSchedule).map(([day, classes]) => (
              <div key={day} className="day-card">
                <h3>{day}</h3>
                <div className="day-classes">
                  {classes.map((class_, index) => (
                    <div key={index} className="day-class">
                      <span className="class-time">{class_.time}</span>
                      <span className="class-name">{class_.course}</span>
                      <span className="class-room">{class_.room}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Schedule; 