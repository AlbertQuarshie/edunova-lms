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


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user] = useState({
    name: "Alex Johnson",
    studentId: "STU-2026-04",
    role: "student"
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Authentication Routes */}
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />

          {/* Protected Portal Routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <div className="flex">
                  {/* Sidebar handles main navigation */}
                  <Sidebar setIsAuthenticated={setIsAuthenticated} />
                  
                  {/* Main content area */}
                  <div className="flex-1 ml-64 min-h-screen flex flex-col">
                    {/* Navbar reflects the logged-in user */}
                    <Navbar user={user} setIsAuthenticated={setIsAuthenticated} />
                    
                    <main className="p-6 flex-1">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/courses/:id" element={<CourseDetails />} />
                      <Route path="/assignments" element={<Assignments />} />
                        
                        {/* Default internal redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                      
                      </Routes>
                    </main>
                  </div>
                </div>
              ) : (
                // Redirect to login if a guest tries to access any portal path
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;