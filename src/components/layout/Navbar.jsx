import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-0">
      {/* Search Bar */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          🔍
        </span>
        <input 
          type="text" 
          placeholder="Search for courses or resources..." 
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col text-right">
          <span className="text-sm font-bold text-gray-800">Alex Johnson</span>
          <span className="text-xs text-green-500 font-medium">Student ID: #2026-04</span>
        </div>
        
        {/* Profile Avatar  */}
        <div className="h-10 w-10 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-600 font-bold cursor-pointer hover:bg-blue-200 transition-colors">
          AJ
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="text-gray-400 hover:text-red-500 transition-colors p-2"
          title="Logout"
        >
          
        </button>
      </div>
    </header>
  );
};

export default Navbar;