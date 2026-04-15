import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  User, 
  LogOut 
} from 'lucide-react'; // Import icons
import { logoutUser } from '../../services/authService';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Courses', path: '/courses', icon: Search },
    { name: 'My Courses', path: '/my-courses', icon: BookOpen },
    { name: 'Assignments', path: '/assignments', icon: ClipboardList },
    { name: 'Results', path: '/results', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      {/* Branding */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Edunova LMS Portal</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon; // Assign to a variable to render as a component

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
              <IconComponent 
                className={`mr-3 w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 transition-colors'}`} 
              />
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Action Area */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut className="mr-3 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Student Portal V1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;