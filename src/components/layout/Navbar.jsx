import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-sm border-b border-gray-100 h-16">
      <div className="font-semibold text-gray-700 ml-64"> {/* Margin added to clear the fixed sidebar */}
        EduNova Portal
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500 font-medium">
          Welcome, <span className="text-blue-600">{user?.displayName || 'Student'}</span>
        </span>
        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
          {user?.displayName?.charAt(0) || 'S'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;