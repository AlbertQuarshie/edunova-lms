import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Page Context (Optional) */}
      <div className="text-gray-400 text-sm font-medium uppercase tracking-widest">
        Student Portal
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          {/* Reflecting the logged in user's name [cite: 123] */}
          <span className="text-sm font-bold text-gray-800 leading-tight">
            {user?.name || "Guest User"}
          </span>
          {/* Reflecting the role or ID [cite: 125] */}
          <span className="text-xs text-blue-500 font-semibold italic">
            {user?.studentId || "No ID"}
          </span>
        </div>

        {/* User Avatar - Initials based on user name */}
        <div className="h-10 w-10 bg-blue-50 text-blue-600 border border-blue-200 rounded-full flex items-center justify-center font-bold shadow-inner">
          {user?.name?.charAt(0) || "U"}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;