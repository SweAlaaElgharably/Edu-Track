import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './home.css';

function Home() {
  const { isAuthenticated, user } = useAuth();
  
  // Determine best display name: full name > first name > username > email local-part
  const displayName = (() => {
    if (!user) return '';
    const first = (user.first_name || '').trim();
    const last = (user.last_name || '').trim();
    if (first && last) return `${first} ${last}`; // full name
    if (first) return first;                      // first name only
    if (user.username) return user.username;      // username
    if (user.email) return user.email.split('@')[0]; // email local-part
    return '';
  })();
  
  return (
    <div className="home">
      <div className="hero-section">
        <h1>
          {isAuthenticated && displayName
            ? `مرحباً بك ${displayName} في جامعة بورسعيد`
            : 'مرحباً بك في جامعة بورسعيد'}
        </h1>
        <p className="subtitle">منصة تتبع تعليمي شاملة</p>
        <div className="cta-buttons">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-primary">ابدأ الآن</Link>
              <Link to="/register" className="btn btn-secondary">إنشاء حساب</Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">اذهب إلى لوحة التحكم</Link>
          )}
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <div className="feature-icon-home">📚</div>
          <h3>إدارة المقررات</h3>
          <p>نظم وتتبع مقرراتك الدراسية والواجبات والمواعيد النهائية</p>
        </div>
        <div className="feature">
          <div className="feature-icon-home">📊</div>
          <h3>تتبع التقدم</h3>
          <p>راقب تقدمك الأكاديمي مع تحليلات مفصلة</p>
        </div>
        <div className="feature">
          <div className="feature-icon-home">🎯</div>
          <h3>تحديد الأهداف</h3>
          <p>حدد وحقق أهدافك التعليمية مع تذكيرات ذكية</p>
        </div>
        <div className="feature">
          <div className="feature-icon-home">📅</div>
          <h3>إدارة الجدول</h3>
          <p>تتبع المحاضرات والامتحانات والتواريخ المهمة</p>
        </div>
        <div className="feature">
          <div className="feature-icon-home">📈</div>
          <h3>لوحة التحكم</h3>
          <p>لوحة تحكم شاملة لعرض إحصائياتك الأكاديمية والتقدم الدراسي</p>
        </div>
        <div className="feature">
          <div className="feature-icon-home">👨‍🏫</div>
          <h3>إدارة محاضرات الأساتذة</h3>
          <p>منصة خاصة للأساتذة لإدارة جداول المحاضرات والمواعيد الدراسية</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 