import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../services/userService';
import { getStudentEnrollments, getAllCourses } from '../../services/courseService';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, LayoutGrid, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [totalCatalog, setTotalCatalog] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      try {
        // Fetch profile, enrollments, and total courses in parallel
        const [profileData, enrollmentData, allCoursesData] = await Promise.all([
          getUserProfile(user.uid),
          getStudentEnrollments(user.uid),
          getAllCourses()
        ]);
        
        setProfile(profileData);
        setEnrollments(enrollmentData);
        setTotalCatalog(allCoursesData.length);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center text-gray-500 font-medium">
      <div className="animate-pulse">Loading your learning portal...</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Hello, {profile?.name?.split(' ')[0] || 'Learner'}!
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Here is what's happening with your studies today.</p>
      </header>

      {/* Simplified Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Enrolled</p>
            <p className="text-3xl font-black text-gray-800">{enrollments.length}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <LayoutGrid size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Catalog</p>
            <p className="text-3xl font-black text-gray-800">{totalCatalog}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Status</p>
            <p className="text-3xl font-black text-gray-800">Active</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Learning Journey</h2>
            <Link to="/courses" className="text-blue-600 text-sm font-bold hover:underline flex items-center">
              Browse All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-12 rounded-3xl text-center">
              <p className="text-gray-500 mb-6 font-medium">Your learning list is currently empty.</p>
              <Link to="/courses" className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-gray-200">
                Start Learning Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrollments.map((enrollment) => (
                <Link key={enrollment.id} to={`/courses/${enrollment.courseId}`} className="group p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold group-hover:bg-blue-600 transition-colors">
                      {enrollment.courseTitle?.charAt(0)}
                    </div>
                    <span className="ml-auto px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase rounded-full">
                      {enrollment.status || 'Enrolled'}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {enrollment.courseTitle}
                  </h4>
                  <p className="text-sm text-gray-400">Click to continue learning</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;