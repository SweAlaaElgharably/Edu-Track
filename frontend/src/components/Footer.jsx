import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/footer.css";
import psuLogo from "../assets/psu-logo.svg";

function Footer() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard');

  return (
    <footer className={`footer ${isDashboard ? 'dashboard-footer' : ''}`}>
      <div className={`footer-content ${isDashboard ? 'dashboard-content' : ''}`}>
        <div className="footer-map">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54566.947425925944!2d32.279756755357496!3d31.264082394404376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f99dc961ff1487%3A0xd647f6053ce7da2!2sPort%20Said%20University!5e0!3m2!1sen!2seg!4v1754331964851!5m2!1sen!2seg"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="social-media">
            <a href="#" className="social-link" title="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link" title="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="social-link" title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-link" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-link" title="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-info">
          <div className="university-info">
            <div className="university-logo">
              <img src={psuLogo} alt="جامعة بورسعيد" className="footer-logo" />
              <h3>جامعة بورسعيد</h3>
            </div>
            <p>منصة تتبع تعليمي شاملة</p>
            <p>Port Said University</p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>روابط سريعة</h4>
              <ul>
                <li>
                  <Link to="/about">حول الجامعة</Link>
                </li>
                <li>
                  <Link to="/contact">اتصل بنا</Link>
                </li>
                <li>
                  <Link to="/help">مركز المساعدة</Link>
                </li>
              </ul>
            </div>

            <div className="link-group">
              <h4>الخدمات</h4>
              <ul>
                <li>
                  <Link to="/dashboard">لوحة التحكم</Link>
                </li>
                <li>
                  <Link to="/courses">المقررات</Link>
                </li>
                <li>
                  <Link to="/schedule">الجدول</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 جامعة بورسعيد. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}

export default Footer;