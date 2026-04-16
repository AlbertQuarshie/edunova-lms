import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollInCourse, getStudentEnrollments } from '../../services/courseService';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../../components/layout/Toast';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchCourseAndStatus = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);

        if (user) {
          const enrollments = await getStudentEnrollments(user.uid);
          const currentEnrollment = enrollments.find(e => e.courseId === id);
          if (currentEnrollment) {
            setEnrollmentStatus(currentEnrollment.status);
          }
        }
      } catch {
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndStatus();
  }, [id, user, navigate]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    if (enrollmentStatus) return;

    setEnrolling(true);
    try {
      await enrollInCourse(user.uid, id, course.title);
      setEnrollmentStatus('pending'); 
      setToast({ show: true, message: "Request sent! Please wait for admin approval.", type: 'success' });
    } catch (err) {
      setToast({ show: true, message: err.message, type: 'error' });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center text-slate-400 animate-pulse font-medium">
      Loading course particulars...
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-72 bg-slate-900 p-10 flex flex-col justify-end text-white relative">
          <div className="absolute top-10 right-10 opacity-10">
             <div className="w-32 h-32 rounded-full border-8 border-white"></div>
          </div>
          <span className="px-3 py-1 bg-blue-500 text-[10px] font-black rounded-full w-fit mb-4 uppercase tracking-widest">
            {course.category}
          </span>
          <h1 className="text-4xl font-black tracking-tight">{course.title}</h1>
          <p className="mt-2 text-slate-400 font-medium">Instructor: {course.instructor || 'EduNova Faculty'}</p>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Course Overview</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{course.description}</p>
              </section>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-fit">
              <h3 className="font-bold text-slate-800 mb-6 text-center">Enrollment Status</h3>
              
              <button 
                disabled={enrolling || enrollmentStatus}
                onClick={handleEnroll}
                className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all transform active:scale-95 ${
                  enrollmentStatus === 'active' 
                    ? 'bg-emerald-500 text-white cursor-default' 
                    : enrollmentStatus === 'pending'
                    ? 'bg-amber-500 text-white cursor-default'
                    : 'bg-slate-900 hover:bg-blue-600 text-white'
                } ${enrolling ? 'opacity-70' : ''}`}
              >
                {enrolling ? 'Processing...' : 
                 enrollmentStatus === 'active' ? '✓ Fully Enrolled' : 
                 enrollmentStatus === 'pending' ? 'Awaiting Approval' : 
                 'Request Enrollment'}
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-6 leading-relaxed font-medium">
                {enrollmentStatus === 'active' ? "You have full access to all materials." : 
                 enrollmentStatus === 'pending' ? "The Registrar is reviewing your request." : 
                 "Access to this course requires manual administrator verification."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;