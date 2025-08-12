import React, { useState } from 'react';
import '../../styles/auth.css';
import PlexusBackground from '../../components/PlexusBackground';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Replace with your API endpoint for password reset
      const response = await fetch('/api/password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!email) {
        throw new Error('يرجى إدخال بريدك الإلكتروني.');
      }
      if (!response.ok) {
        throw new Error('حدث خطأ أثناء إرسال الرابط، حاول مرة أخرى.');
      }

      setSuccess('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.');
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-page">
      <PlexusBackground />

      <div className="auth-form-section">
        <div className="auth-container">
          <h2>نسيت كلمة المرور</h2>
          <p>أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
