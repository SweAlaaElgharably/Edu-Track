import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  

  
 
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    re_new_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

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

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="profile-info">
            <h2>{user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.email}</h2>
            <p>{user?.email}</p>
            <p>اسم المستخدم: {user?.username || 'غير محدد'}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>تغيير كلمة المرور</h3>
          
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label htmlFor="current_password">كلمة المرور الحالية</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                required
                placeholder="أدخل كلمة المرور الحالية"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="new_password">كلمة المرور الجديدة</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                placeholder="أدخل كلمة المرور الجديدة"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="re_new_password">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                id="re_new_password"
                name="re_new_password"
                value={passwordData.re_new_password}
                onChange={handlePasswordChange}
                required
                placeholder="أعد إدخال كلمة المرور الجديدة"
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile; 