import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

// Layout & UI
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import AITutor from "./components/ai/AITutor";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/student/Dashboard";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import Profile from "./pages/student/Profile";
import MyCourses from "./pages/student/MyCourses";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourse from "./pages/admin/ManageCourse";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewEnrollments from "./pages/admin/ViewEnrollments";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes - No Protection */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Portal Layout */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex min-h-screen">
                    <Sidebar />
                    
                    {/* ml-64 must match Sidebar width to prevent cutoff */}
                    <div className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-x-hidden">
                      <Navbar />
                      <main className="p-6 flex-1 bg-gray-50">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/courses" element={<Courses />} />
                          <Route path="/my-courses" element={<MyCourses />} />
                          <Route path="/courses/:id" element={<CourseDetails />} />
                          <Route path="/profile" element={<Profile />} />

                          {/* Admin Routes */}
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="/admin/manage-course" element={<ManageCourse />}/>
                          <Route path="/admin/manage-users" element={<ManageUsers />} />
                          <Route path="/admin/enrollments" element={<ViewEnrollments />} />

                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </main>
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