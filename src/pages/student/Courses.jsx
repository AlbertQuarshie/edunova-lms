import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading courses...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h1>
      
      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No courses available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition">
              <div className="h-40 bg-blue-100 flex items-center justify-center">
                {/* Placeholder for course image */}
                <span className="text-blue-500 font-bold text-xl">{course.title?.charAt(0)}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2 text-sm">{course.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase">
                    {course.category || 'General'}
                  </span>
                  <Link 
                    to={`/courses/${course.id}`}
                    className="text-blue-600 font-semibold hover:underline text-sm"
                  >
                    View Details →
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

export default Courses;