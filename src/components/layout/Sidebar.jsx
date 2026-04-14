import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Courses', path: '/courses' },
    { name: 'Assignments', path: '/assignments' },
    { name: 'Results', path: '/results'},
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      {/* Branding */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">LMS Portal</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className={`mr-3 text-lg ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`}>
                {item.icon}
              </span>
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 bg-gray-50 m-4 rounded-2xl border border-gray-100">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Student Portal v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;