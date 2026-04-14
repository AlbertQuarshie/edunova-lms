import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollInCourse } from '../../services/courseService';
import { useAuth } from '../../hooks/useAuth';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); // 'user' is now used in handleEnroll below
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, navigate]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please login to enroll");
      return navigate('/login');
    }

    setEnrolling(true);
    try {
      await enrollInCourse(user.uid, id, course.title);
      alert(`Successfully enrolled in ${course.title}!`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading course details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Course Header */}
        <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex flex-col justify-end text-white">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold rounded-full w-fit mb-4 uppercase">
            {course.category || 'General'}
          </span>
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="mt-2 text-blue-100 italic">Instructor: {course.instructor || 'TBD'}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">About this Course</h2>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Syllabus Highlights</h2>
                <ul className="space-y-3">
                  {['Introduction', 'Core Concepts', 'Advanced Projects'].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Enrollment Sidebar Card */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
              <h3 className="font-bold text-gray-800 mb-4">Ready to start?</h3>
              <button 
                disabled={enrolling}
                onClick={handleEnroll}
                className={`w-full py-3 text-white font-bold rounded-lg shadow-lg transition transform ${
                  enrolling ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
                }`}
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Access your materials immediately after enrollment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;