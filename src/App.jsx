import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import Dashboard from './pages/student/Dashboard';
import Courses from './pages/student/Courses';
import CourseDetails from './pages/student/CourseDetails';
import Assignments from './pages/student/Assignments';
import Results from './pages/student/Results';
import Profile from './pages/student/Profile';

// Utility Pages
import NotFound from './pages/NotFound';

function App() {
  // Use the state here to satisfy the linter
  // Toggle this to 'true' manually to work on the Dashboard/Sidebar
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Portal Routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <div className="flex">
                  <Sidebar />
                  
                  <div className="flex-1 ml-64 min-h-screen">
                    <Navbar />
                    <main className="p-6">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/courses/:id" element={<CourseDetails />} />
                        <Route path="/assignments" element={<Assignments />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/profile" element={<Profile />} />
                        
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;