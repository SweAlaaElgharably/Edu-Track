import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import image2 from '../assets/psu2.jpg';
import PlexusBackground from '../components/PlexusBackground';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Image is loaded for the split layout

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-page">
      <PlexusBackground />
      <div className="auth-image-section">
        <img src={image2} alt="Port Said University" className="auth-bg-image" />
        <div className="university-logo"></div>
      </div>
      <div className="auth-form-section">
        <div className="auth-container">
          <h2>مرحباً بعودتك</h2>
          <p>سجل دخولك إلى حساب جامعة بورسعيد</p>
          
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">اسم المستخدم</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="أدخل اسم المستخدم"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="أدخل كلمة المرور"
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
          
          <div className="auth-links">
            <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
            <p>
              ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 