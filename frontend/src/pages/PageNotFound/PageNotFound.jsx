import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="pnf-container" dir="rtl">
      <div className="pnf-title">٤٠٤</div>
      <div className="pnf-message">
        عذراً، الصفحة التي تبحث عنها غير موجودة.
        <br />
        ربما تم نقلها أو حذفها.
      </div>
      <button className="pnf-home-btn" onClick={() => navigate("/")}>
        العودة إلى الصفحة الرئيسية
      </button>
    </div>
  );
};

export default PageNotFound;
