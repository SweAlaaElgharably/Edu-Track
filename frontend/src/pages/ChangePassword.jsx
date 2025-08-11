import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/change-password.css';

function ChangePassword() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    re_new_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    setMessage('');
    setError('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const validatePasswords = () => {
    if (passwordData.new_password.length < 8) {
      setError('كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل');
      return false;
    }
    if (passwordData.new_password !== passwordData.re_new_password) {
      setError('كلمة المرور الجديدة غير متطابقة');
      return false;
    }
    return true;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!validatePasswords()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/users/set_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(passwordData)
      });

      if (response.ok) {
        setMessage('تم تغيير كلمة المرور بنجاح');
        setPasswordData({
          current_password: '',
          new_password: '',
          re_new_password: ''
        });
        // Reset password visibility
        setShowPassword({
          current: false,
          new: false,
          confirm: false
        });
      } else {
        const errorData = await response.json();
        let errorMessage = 'فشل في تغيير كلمة المرور';

        if (errorData.current_password) {
          errorMessage = 'كلمة المرور الحالية غير صحيحة';
        } else if (errorData.new_password) {
          errorMessage = 'كلمة المرور الجديدة لا تستوفي المتطلبات';
        } else if (errorData.re_new_password) {
          errorMessage = 'كلمة المرور الجديدة غير متطابقة';
        }

        setError(errorMessage);
      }
    } catch (error) {
      setError('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="change-password-page">
      <div className="change-password-container">
        <div className="change-password-header">
          <button onClick={handleBackToProfile} className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1>تغيير كلمة المرور</h1>
          <p>قم بتغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك</p>
        </div>

        <div className="change-password-form-container">
          {message && (
            <div className="success-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="change-password-form">
            <div className="form-group">
              <label htmlFor="current_password">كلمة المرور الحالية</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.current ? "text" : "password"}
                  id="current_password"
                  name="current_password"
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="أدخل كلمة المرور الحالية"
                  className="password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPassword.current ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5.63636 6 12 6C18.3636 6 22 12 22 12C22 12 18.3636 18 12 18C5.63636 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1747 15.0074 10.8019 14.8565C10.4291 14.7056 10.0917 14.4811 9.80385 14.1962C9.51597 13.9113 9.29326 13.5778 9.14394 13.2084C8.99462 12.8389 8.92157 12.4415 8.92869 12.0418C8.93581 11.6421 9.02291 11.2477 9.18556 10.8826C9.34821 10.5176 9.58291 10.1891 9.876 9.92M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="new_password">كلمة المرور الجديدة</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.new ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="أدخل كلمة المرور الجديدة (8 أحرف على الأقل)"
                  className="password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPassword.new ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5.63636 6 12 6C18.3636 6 22 12 22 12C22 12 18.3636 18 12 18C5.63636 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1747 15.0074 10.8019 14.8565C10.4291 14.7056 10.0917 14.4811 9.80385 14.1962C9.51597 13.9113 9.29326 13.5778 9.14394 13.2084C8.99462 12.8389 8.92157 12.4415 8.92869 12.0418C8.93581 11.6421 9.02291 11.2477 9.18556 10.8826C9.34821 10.5176 9.58291 10.1891 9.876 9.92M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="password-strength">
                <div className={`strength-bar ${passwordData.new_password.length >= 8 ? 'strong' : passwordData.new_password.length >= 4 ? 'medium' : 'weak'}`}></div>
                <span className="strength-text">
                  {passwordData.new_password.length >= 8 ? 'قوية' : passwordData.new_password.length >= 4 ? 'متوسطة' : 'ضعيفة'}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="re_new_password">تأكيد كلمة المرور الجديدة</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  id="re_new_password"
                  name="re_new_password"
                  value={passwordData.re_new_password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                  className={`password-input ${passwordData.re_new_password && passwordData.new_password !== passwordData.re_new_password ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPassword.confirm ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5.63636 6 12 6C18.3636 6 22 12 22 12C22 12 18.3636 18 12 18C5.63636 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1747 15.0074 10.8019 14.8565C10.4291 14.7056 10.0917 14.4811 9.80385 14.1962C9.51597 13.9113 9.29326 13.5778 9.14394 13.2084C8.99462 12.8389 8.92157 12.4415 8.92869 12.0418C8.93581 11.6421 9.02291 11.2477 9.18556 10.8826C9.34821 10.5176 9.58291 10.1891 9.876 9.92M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              {passwordData.re_new_password && passwordData.new_password !== passwordData.re_new_password && (
                <div className="password-match-error">كلمة المرور غير متطابقة</div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    جاري التحديث...
                  </>
                ) : (
                  'تغيير كلمة المرور'
                )}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleBackToProfile}>
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
