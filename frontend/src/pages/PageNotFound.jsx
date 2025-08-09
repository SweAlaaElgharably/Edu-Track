import React from "react";
import "../styles/PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found modern-fade-in">
      <div className="notfound-circle">
        <span className="notfound-404">404</span>
      </div>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-desc">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className="notfound-home-btn" to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
