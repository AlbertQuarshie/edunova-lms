import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getStudentEnrollments } from '../../services/courseService';

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
        console.error("Error loading your courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyData();
  }, [user]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading your classroom...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Continue where you left off.</p>
        </div>
        <Link to="/courses" className="text-blue-600 font-semibold hover:underline">
          Browse more courses →
        </Link>
      </div>

      {myCourses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Start Learning
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-3 bg-blue-500" style={{ width: `${course.progress || 0}%` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{course.courseTitle}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Progress: {course.progress || 0}%</span>
                  <Link 
                    to={`/courses/${course.id}`} 
                    className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-black transition"
                  >
                    Go to Class
                  </Link>
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