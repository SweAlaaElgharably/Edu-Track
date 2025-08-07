<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import Schedule from './pages/Schedule.jsx';
import Profile from './pages/Profile.jsx';
import Contact from './pages/Contact.jsx';
=======
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import PlexusBackground from "./components/PlexusBackground.jsx";
import RoutesList from "../routes/RoutesList.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!isAuthPage && <PlexusBackground />}
      <Navbar />
      <main className="main-content">
        <RoutesList />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
=======
      <AppContent />
>>>>>>> be439f8696bec3da3c21746abf070980497f0ee3
    </AuthProvider>
  );
}

export default App;
