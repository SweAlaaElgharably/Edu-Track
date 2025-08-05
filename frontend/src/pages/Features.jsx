import React from 'react';
import '../styles/features.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Features() {
  return (
    <div className="features">
      <div className="feature">
        <div className="feature-icon">📚</div>
        <h3>إدارة المقررات</h3>
        <p>نظم وتتبع مقرراتك الدراسية والواجبات والمواعيد النهائية</p>
      </div>
        <div className="feature">
            <div className="feature-icon">📅</div>
            <h3>جدول المواعيد</h3>
            <p>خطط وتنظم مواعيدك الدراسية والاختبارات والمراجعات</p>
        </div>
        <div className="feature">
            <div className="feature-icon">👤</div>
            <h3>الملف الشخصي</h3>
            <p>قم بإدارة معلوماتك الشخصية وإعدادات حسابك</p>
        </div>
        <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>الأمان والخصوصية</h3>
            <p>نحن نأخذ أمان بياناتك على محمل الجد ونضمن خصوصيتك</p>
        </div>
        <div className="feature">
            <div className="feature-icon">🏫</div>
            <h3>الجامعات والكليات والبرامج الدراسية</h3>
            <p>استكشف الجامعات والكليات والبرامج الدراسية المتاحة</p>
        </div>
        <div className="feature">
            <div className="feature-icon">🌐</div>
            <h3>التواصل الاجتماعي</h3>
            <p>تابعنا على وسائل التواصل الاجتماعي للبقاء على اطلاع بأحدث الأخبار والتحديثات</p>
        </div>
        <div className="feature">
            <div className="feature-icon">📈</div>
            <h3>تحليل الأداء</h3>
            <p>احصل على رؤى حول أدائك الأكاديمي وتقدمك الدراسي</p>
        </div>
        <div className="feature">
            <div className="feature-icon">💬</div>
            <h3>الدعم الفني</h3>
            <p>احصل على المساعدة والدعم الفني عند الحاجة</p>
        </div>
    </div>
  )
}

export default Features
