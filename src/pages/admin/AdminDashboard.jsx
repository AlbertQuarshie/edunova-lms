import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Users, BookOpen, CheckCircle, PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Fetch Students count
        const studentsQuery = query(collection(db, "users"), where("role", "==", "student"));
        const studentsSnap = await getDocs(studentsQuery);
        
        // 2. Fetch Courses count
        const coursesSnap = await getDocs(collection(db, "courses"));
        
        // 3. Fetch Total Enrollments
        const enrollmentsSnap = await getDocs(collection(db, "enrollments"));

        setStats({
          totalStudents: studentsSnap.size,
          totalCourses: coursesSnap.size,
          totalEnrollments: enrollmentsSnap.size
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Enrollments', value: stats.totalEnrollments, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Overview</h1>
          <p className="text-gray-500">Real-time data from your LMS platform.</p>
        </div>
        <Link 
          to="/admin/add-course" 
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <PlusCircle size={20} className="mr-2" />
          Create Course
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-700">Course Saturation</h3>
            <p className="text-sm text-gray-500 mt-1">
              Currently hosting {stats.totalCourses} unique curricula with {stats.totalEnrollments} student registrations.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-700">User Growth</h3>
            <p className="text-sm text-gray-500 mt-1">
              {stats.totalStudents} students have successfully registered profiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;