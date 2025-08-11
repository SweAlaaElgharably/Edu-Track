import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Profile from "../src/pages/Profile";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Features from "../src/pages/Features";
import Contact from "../src/pages/Contact";
import UniversityManage from "../src/pages/UniversityManage";
import FacultyManage from "../src/pages/FacultyManage";
import PageNotFound from "../src/pages/PageNotFound";
import ForgotPassword from "../src/pages/ForgotPassword";
import HelpCenter from "../src/pages/HelpCenter";
import ChangePassword from "../src/pages/ChangePassword";

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
        path="/universities"
        element={
          <ProtectedRoute>
            <UniversityManage />
          </ProtectedRoute>
        }
      />
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
    </Routes>
  );
};

export default RoutesList;
