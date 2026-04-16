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
  <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-bold text-gray-800 mb-6">{course.courseTitle}</h3>
    
    <div className="flex items-center justify-between border-t pt-4">
      {course.status === 'active' ? (
        <>
          <span className="text-sm font-bold text-slate-700">Progress: {course.progress || 0}%</span>
          <Link 
            to={`/courses/${course.courseId}`} 
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg"
          >
            Go to Class
          </Link>
        </>
      ) : (
        /* Button is totally removed here */
        <div className="flex items-center gap-2 text-amber-600">
          <Clock size={16} className="animate-pulse" />
          <span className="text-xs font-bold uppercase">Awaiting Admin Approval</span>
        </div>
      )}
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;