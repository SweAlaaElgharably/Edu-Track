import React from 'react';
import Chatbot from '../components/Chatbot';
import '../styles/help.css';

function HelpCenter() {
  return (
    <div className="help-center">
      <header className="help-header">
        <h1>مركز المساعدة</h1>
        <p>كيف يمكننا مساعدتك اليوم؟</p>
        <div className="search-bar">
          <input type="text" placeholder="ابحث في مركز المساعدة..." />
          <button>بحث</button>
        </div>
      </header>
 
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '2rem' }}>

      <section className="chatbot-section">
          <h2>المساعد الذكي</h2>
          <div className="chatbot-container">
            {/* Chatbot component will be integrated here */}
            <Chatbot />
          </div>
        </section>

        <section className="faq-section">
          <h2>الأسئلة الشائعة</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 style={{ color: '#0d3d6e', fontWeight: 'bold' }}>كيف يمكنني إعادة تعيين كلمة المرور الخاصة بي؟</h3>
              <p style={{ color: '#0d3d6e' }}>يمكنك إعادة تعيين كلمة المرور الخاصة بك عن طريق الذهاب إلى صفحة تسجيل الدخول والنقر على 'هل نسيت كلمة المرور؟'.</p>
            </div>
            <div className="faq-item">
              <h3 style={{ color: '#0d3d6e', fontWeight: 'bold' }}>أين يمكنني أن أجد الجدول الدراسي الخاص بي؟</h3>
              <p style={{ color: '#0d3d6e' }}>الجدول الدراسي متاح في لوحة التحكم الخاصة بك بمجرد تسجيل الدخول.</p>
            </div>
            <div className="faq-item">
              <h3 style={{ color: '#0d3d6e', fontWeight: 'bold' }}>كيف يمكنني التواصل مع الدعم الفني؟</h3>
              <p style={{ color: '#0d3d6e' }}>يمكنك التواصل معنا عبر صفحة 'اتصل بنا' أو استخدام الشات بوت للمساعدة الفورية.</p>
            </div>
            <div className="faq-item">
              <h3 style={{ color: '#0d3d6e', fontWeight: 'bold' }}>هل يمكنني تغيير معلوماتي الشخصية؟</h3>
              <p style={{ color: '#0d3d6e' }}>نعم، يمكنك تحديث معلوماتك الشخصية من خلال صفحة ملفك الشخصي.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default HelpCenter;
