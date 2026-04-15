import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Book, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(courseList);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading courses...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Browse Courses</h1>
        <p className="text-gray-500">Expand your knowledge with our curated curriculum.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-blue-600 flex items-center justify-center">
              <Book size={48} className="text-white/50" />
            </div>
            
            <div className="p-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{course.category || 'General'}</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center mt-6 pt-6 border-t border-gray-50 text-gray-500 text-sm space-x-4">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {course.duration || '4 Weeks'}
                </div>
              </div>

              <Link 
                to={`/courses/${course.id}`}
                className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl font-semibold flex items-center justify-center group hover:bg-blue-600 transition-colors"
              >
                View Details
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;