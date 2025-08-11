import React, { useState } from "react";
import "../styles/contact.css";
import { useForm } from "@formspree/react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [state, handleSubmit] = useForm("mzzvjlqy");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  // Validate individual fields on input
  const validateField = (name, value) => {
    let error = "";

    // Only validate if the field has content
    if (value.trim() !== "") {
      if (name === "name" && value.trim().length < 5) {
        error = "يجب أن يكون الاسم 5 أحرف على الأقل";
      }

      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "البريد الإلكتروني غير صالح";
      }

      if (name === "message" && value.trim().length < 10) {
        error = "يجب أن تحتوي الرسالة على 10 أحرف على الأقل";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle input change and validate
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Only submit if no errors
  const onSubmit = (e) => {
    e.preventDefault();
    const allValid = Object.values(errors).every((e) => e === "") &&
                     Object.values(formData).every((v) => v.trim() !== "");
    if (allValid) {
      handleSubmit(e);
      alert("تم إرسال الرسالة بنجاح");
      navigate('/');
    }
  };

  return (
    <div className="contact">
      <div className="row">
        {/* Contact Form Section */}
        <div className="col-lg-6 d-flex align-items-center">
          <div className="contact-form">
            {state.succeeded ? (
              <p className="success-msg">تم إرسال الرسالة بنجاح! ✅</p>
            ) : (
              <form id="contact-form" onSubmit={onSubmit}>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="name">اسم المستخدم</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="ادخل الاسم *"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="email">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="ادخل البريد الالكتروني *"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="message">الرسالة</label>
                    <textarea
                      rows="4"
                      name="message"
                      id="message"
                      className="form-control"
                      placeholder="اكتب رسالتك *"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && (
                      <p className="error">{errors.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn-big contact-btn btn-bg"
                    disabled={state.submitting}
                  >
                    <i className="fas fa-arrow-right"></i> ارسل
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="col-lg-6 d-flex align-items-center">
          <div className="contact-info">
            <div className="overlay"></div>
            <div className="contact-info-content">
              <h2 className="contact-title">تواصل معنا</h2>
              <p>
                هل لديك أي استفسارات أو تحتاج إلى مساعدة؟ لا تتردد في التواصل
                معنا. نحن هنا لمساعدتك في كل ما تحتاجه.
              </p>
              <ul>
                <li>
                  <div className="info">
                    <i className="fas fa-mobile-alt"></i>
                    <h4>+11223344550</h4>
                  </div>
                </li>
                <li>
                  <div className="info">
                    <i className="fas fa-at"></i>
                    <h4>info@example.com</h4>
                  </div>
                </li>
                <li>
                  <div className="info">
                    <i className="fas fa-map-marker-alt"></i>
                    <h4>
                      Port Said University, University Administration، Port
                      Fouad City, Port Said Governorate 42526
                    </h4>
                  </div>
                </li>
              </ul>
              <div className="social-media">
                <a href="#" className="social-link" title="Facebook" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" title="Twitter" aria-label="Twitter">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="social-link" title="Instagram" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="social-link" title="LinkedIn" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" title="YouTube" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}