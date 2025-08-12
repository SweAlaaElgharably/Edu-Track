import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './register.css';
import image2 from '../../assets/2.jpeg';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  
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
      await register(formData);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-split-page">
      <div className="register-image-section">
        <img src={image2} alt="Port Said University" className="register-bg-image" />
        <div className="university-logo"></div>
      </div>
      <div className="register-form-section">
        <div className="register-container">
          <h2>إنشاء حساب جديد</h2>
          <p>سجل بياناتك للانضمام إلى جامعة بورسعيد</p>
          {error && <div className="register-error-message">{error}</div>}
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-group">
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
            <div className="register-form-row">
              <div className="register-form-group">
                <label htmlFor="first_name">الاسم الأول</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك الأول"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="last_name">اسم العائلة</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسم العائلة"
                />
              </div>
            </div>
            <div className="register-form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div className="register-form-row">
              <div className="register-form-group">
                <label htmlFor="password">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="أنشئ كلمة مرور"
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="re_password">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  id="re_password"
                  name="re_password"
                  value={formData.re_password}
                  onChange={handleChange}
                  required
                  placeholder="أكد كلمة المرور"
                />
              </div>
            </div>
            <button type="submit" className="register-btn btn-primary" disabled={loading}>
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </form>
          <div className="register-links">
            <p>
              لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
