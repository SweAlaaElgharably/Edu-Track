import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import Courses from '../src/pages/Courses';
import Schedule from '../src/pages/Schedule';
import Profile from '../src/pages/Profile';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Features from '../src/pages/Features';
import UniversityManage from '../src/pages/UniversityManage';
import FacultyManage from '../src/pages/FacultyManage';
import Contact from '../src/pages/Contact';

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/features" element={<Features />} />
            <Route path="/university" element={<ProtectedRoute><UniversityManage /></ProtectedRoute>} />
            <Route path="/faculty" element={<ProtectedRoute><FacultyManage /></ProtectedRoute>} />
            <Route path="/university/:slug/faculties" element={<ProtectedRoute><FacultyManage /></ProtectedRoute>} />
            <Route path= "/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path= "/about" element={<ProtectedRoute><Features /></ProtectedRoute>} />
            
        </Routes>
    )
}

export default RoutesList;
