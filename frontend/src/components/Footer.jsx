import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>جامعة بورسعيد</h3>
          <p>منصة تتبع تعليمي شاملة</p>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">GitHub</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>المنتج</h4>
          <ul>
            <li><Link to="/features">المميزات</Link></li>
            <li><Link to="/pricing">الأسعار</Link></li>
            <li><Link to="/roadmap">الخريطة</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>الدعم</h4>
          <ul>
            <li><Link to="/help">مركز المساعدة</Link></li>
            <li><Link to="/contact">اتصل بنا</Link></li>
            <li><Link to="/faq">الأسئلة الشائعة</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>الشركة</h4>
          <ul>
            <li><Link to="/about">حول</Link></li>
            <li><Link to="/privacy">سياسة الخصوصية</Link></li>
            <li><Link to="/terms">شروط الخدمة</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 جامعة بورسعيد. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}

export default Footer; 