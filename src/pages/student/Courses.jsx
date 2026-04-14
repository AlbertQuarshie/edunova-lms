import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();


  const courses = [
    { 
      id: 'react-101', 
      title: 'React Web Development', 
      description: 'Master modern frontend development with React and Tailwind CSS.',
      lessons: 12,
      duration: '4 weeks'
    },
    { 
      id: 'uiux-202', 
      title: 'UI/UX Design Basics', 
      description: 'Learn the principles of user interface and experience design.',
      lessons: 8,
      duration: '3 weeks'
    },
    { 
      id: 'firebase-303', 
      title: 'Firebase for Beginners', 
      description: 'Implement real-time databases and authentication in your apps.',
      lessons: 10,
      duration: '5 weeks'
    }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
        <p className="text-gray-500">Explore and continue your learning journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="h-40 bg-blue-600 flex items-center justify-center text-white text-4xl group-hover:scale-105 transition-transform">
              📚
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-5">
                <span> {course.lessons} Lessons</span>
                <span> {course.duration}</span>
              </div>
              <button 
                onClick={() => navigate(`/courses/${course.id}`)}
                className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 