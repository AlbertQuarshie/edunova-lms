import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import AITutor from './components/ai/AITutor'; // New AI Tutor Component

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/student/Dashboard';
import Courses from './pages/student/Courses';
import CourseDetails from './pages/student/CourseDetails';
import Profile from './pages/student/Profile';
import MyCourses from './pages/student/MyCourses';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourse from './pages/admin/ManageCourse';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Portal Layout */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex">
                 
                    <Sidebar />
                    
                    {/* Main Content Area */}
                    <div className="flex-1 ml-64 min-h-screen flex flex-col relative">
                      <Navbar />
                      
                      <main className="p-6 flex-1">
                        <Routes>
                          {/*Student Routes */}
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/courses" element={<Courses />} />
                          <Route path="/my-courses" element={<MyCourses />} />
                          <Route path="/courses/:id" element={<CourseDetails />} />
                          <Route path="/profile" element={<Profile />} />

                          {/* Admin Only Routes */}
                          <Route path="/admin/dashboard" element={<AdminDashboard />} />
                          <Route path="/admin/manage-course" element={<ManageCourse />} />

                          {/* Redirects */}
                          <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                      </main>

                      {/* AI Tutor - Placed inside Protected area so it's only for logged-in users */}
                      <AITutor />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;