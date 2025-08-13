import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Register from "../src/pages/Register/Register";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Profile from "../src/pages/Profile/Profile";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Features from "../src/pages/Features/Features";
import Contact from "../src/pages/Contact/Contact";

import FacultyManage from "../src/pages/FacultyManage/FacultyManage";
import PageNotFound from "../src/pages/PageNotFound/PageNotFound";
import ForgotPassword from "../src/pages/ForgotPassword/ForgotPassword";
import HelpCenter from "../src/pages/HelpCenter/HelpCenter";
import ChangePassword from "../src/pages/ChangePassword/ChangePassword";
import About from "../src/pages/About/About";


const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
    
      <Route
        path="/universities/:slug/faculties"
        element={
          <ProtectedRoute>
            <FacultyManage />
          </ProtectedRoute>
        }
      />
      <Route path="/help" element={<HelpCenter />} />    
      <Route path="*" element={<PageNotFound />} />
      <Route path="/about" element={<About />} />

    </Routes>
  );
};

export default RoutesList;
