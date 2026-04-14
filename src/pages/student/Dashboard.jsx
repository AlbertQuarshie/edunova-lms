import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../services/userService';
import { getStudentEnrollments } from '../../services/courseService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      try {
        // Fetch profile and enrollments in parallel for speed
        const [profileData, enrollmentData] = await Promise.all([
          getUserProfile(user.uid),
          getStudentEnrollments(user.uid)
        ]);
        
        setProfile(profileData);
        setEnrollments(enrollmentData);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) return <div className="p-10 text-center text-gray-500">Updating your stats...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {profile?.name || 'Student'}!
        </h1>
        <p className="text-gray-600 mt-1">You have {enrollments.length} active courses.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Courses Enrolled</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{enrollments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Assignments Due</p>
          <p className="text-3xl font-bold text-orange-500 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">GPA / Progress</p>
          <p className="text-3xl font-bold text-green-600 mt-2">100%</p>
        </div>
      </div>

      {/* Enrolled Courses List */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Current Courses</h2>
        {enrollments.length === 0 ? (
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
            <p className="text-blue-800 mb-4">You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold mr-4">
                  {enrollment.courseTitle.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{enrollment.courseTitle}</h4>
                  <p className="text-xs text-gray-500">Status: {enrollment.status}</p>
                </div>
                <Link to={`/courses/${enrollment.courseId}`} className="ml-auto text-blue-600 text-sm hover:underline">
                  Open
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;