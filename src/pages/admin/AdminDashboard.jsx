import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Users, BookOpen, Activity, Plus, Loader2 } from 'lucide-react';
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
        const studentsQuery = query(collection(db, "users"), where("role", "==", "student"));
        const studentsSnap = await getDocs(studentsQuery);
        
        const coursesSnap = await getDocs(collection(db, "courses"));
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

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-slate-800" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans">
      
      {/* Minimalist Header */}
      <header className="flex flex-col md:flex-row justify-between md:items-end mb-10 pb-6 border-b border-slate-200 gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Control Center</p>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">EduNova Admin</h1>
        </div>
        <Link 
          to="/admin/add-course" 
          className="flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white text-sm rounded-full font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Create Course
        </Link>
      </header>

      {/* Unified Command Panel */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          
          {/* Stat: Students */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 text-sm font-medium">Registered Students</span>
              <Users size={20} className="text-slate-500" />
            </div>
            <p className="text-5xl font-light text-white">{stats.totalStudents}</p>
          </div>

          {/* Stat: Courses */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 text-sm font-medium">Active Curricula</span>
              <BookOpen size={20} className="text-slate-500" />
            </div>
            <p className="text-5xl font-light text-white">{stats.totalCourses}</p>
          </div>

          {/* Stat: Enrollments */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 text-sm font-medium">Total Enrollments</span>
              <Activity size={20} className="text-slate-500" />
            </div>
            <p className="text-5xl font-light text-white">{stats.totalEnrollments}</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;