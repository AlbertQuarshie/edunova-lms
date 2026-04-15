import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollInCourse, getStudentEnrollments } from '../../services/courseService';
import { useAuth } from '../../hooks/useAuth';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false); // New state

  useEffect(() => {
    const fetchCourseAndStatus = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);

        // Check if user is already enrolled in this specific course
        if (user) {
          const enrollments = await getStudentEnrollments(user.uid);
          const alreadyIn = enrollments.some(e => e.courseId === id);
          setIsEnrolled(alreadyIn);
        }
      } catch (err) {
        console.error(err);
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndStatus();
  }, [id, user, navigate]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    if (isEnrolled) return; // Prevent double clicks

    setEnrolling(true);
    try {
      await enrollInCourse(user.uid, id, course.title);
      setIsEnrolled(true); // Update button immediately
      alert(`Successfully enrolled in ${course.title}!`);
 
    } catch (err) {
      alert(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading course details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex flex-col justify-end text-white">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold rounded-full w-fit mb-4 uppercase">
            {course.category}
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
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
              <h3 className="font-bold text-gray-800 mb-4">Ready to start?</h3>
              
              <button 
                disabled={enrolling || isEnrolled}
                onClick={handleEnroll}
                className={`w-full py-3 font-bold rounded-lg shadow-lg transition transform ${
                  isEnrolled 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-1'
                } ${enrolling ? 'opacity-70' : ''}`}
              >
                {enrolling ? 'Processing...' : isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                {isEnrolled ? "You have access to this course." : "Free access for registered students."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;