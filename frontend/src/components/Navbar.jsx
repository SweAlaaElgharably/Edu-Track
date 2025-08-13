import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';
import psuLogo from '../assets/psu-logo.svg';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={psuLogo} alt="جامعة بورسعيد" className="navbar-logo-img" />
          <h4>جامعة بورسعيد</h4>
        </Link>
      </div>
      
      <button 
        className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        {!isAuthenticated ? (
          // Public navigation
          <>
            <Link to="/about" className="nav-link" onClick={closeMenu}>حول</Link>
            <Link to="/features" className="nav-link" onClick={closeMenu}>المميزات</Link>
            <Link to="/" className="nav-link" onClick={closeMenu}>الرئيسية</Link>
          </>
        ) : (
          // Authenticated navigation
          <>
            <Link to="/dashboard" className="nav-link" onClick={closeMenu}>لوحة التحكم</Link>
            <Link to="/" className="nav-link" onClick={closeMenu}>الصفحة الرئيسية</Link>
          </>
        )}
      </div>
      
      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn btn-outline" onClick={closeMenu}>تسجيل الدخول</Link>
            {/* <Link to="/register" className="btn btn-primary" onClick={closeMenu}>إنشاء حساب</Link> */}
          </>
        ) : (
          <div className="user-section">
            <Link to="/profile" className="profile-icon" onClick={closeMenu}>
              {user?.picture ? (
                (() => {
                  const p = user.picture;
                  const normalized = p.startsWith('http')
                    ? p
                    : p.startsWith('/')
                      ? `http://localhost:8000${p}`
                      : `http://localhost:8000/media/${p}`;
                  return (
                    <img className="profile-icon-img" alt="صورة الحساب" src={`${normalized}?t=${Date.now()}`} />
                  );
                })()
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
              )}
            </Link>
            {/* Icon-only logout across all sizes */}
            <button
              className="logout-icon"
              title="تسجيل الخروج"
              aria-label="تسجيل الخروج"
              onClick={() => { logout(); closeMenu(); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 