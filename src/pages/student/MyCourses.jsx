import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getStudentEnrollments } from '../../services/courseService';
import { Clock, BookOpen } from 'lucide-react';

const MyCourses = () => {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyData = async () => {
      if (!user) return;
      try {
        const data = await getStudentEnrollments(user.uid);
        setMyCourses(data);
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyData();
  }, [user]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading your classroom...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Track your progress and enrollment status.</p>
      </header>

      {myCourses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Colored top bar based on status */}
              <div className={`h-1.5 ${course.status === 'active' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-6">{course.courseTitle}</h3>
                
                <div className="flex items-center justify-between border-t pt-4 border-slate-50">
                  {course.status === 'active' ? (
                    <>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Progress</span>
                        <span className="text-sm font-bold text-slate-700">{course.progress || 0}%</span>
                      </div>
                     
                    </>
                  ) : (
                    /* PENDING STATE: No button at all, just status text */
                    <div className="flex items-center gap-2 text-amber-600 py-2">
                      <Clock size={16} className="animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-widest">Awaiting Admin Approval</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;