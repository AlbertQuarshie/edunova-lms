import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  User, 
  LogOut, 
  ShieldCheck, 
  PlusCircle,
  Settings
} from 'lucide-react'; 
import { logoutUser } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Standard Student Links
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Courses', path: '/courses', icon: Search },
    { name: 'My Courses', path: '/my-courses', icon: BookOpen },
    { name: 'Assignments', path: '/assignments', icon: ClipboardList },
    { name: 'Results', path: '/results', icon: BarChart3 },
  ];

  // Links visible only to Admins
  const adminItems = [
    { name: 'Admin Overview', path: '/admin/dashboard', icon: ShieldCheck },
    { name: 'Manage Course', path: '/admin/manage-course', icon: Settings },
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
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50">
      {/* Brand Branding */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Edunova LMS</h1>
      </div>

      {/* Main Navigation */}
     {/* Main Navigation */}
<nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto">
  
  {/* ONLY show Student Section if user is NOT an admin */}
  {userData?.role !== 'admin' && (
    <>
      {menuItems.map((item) => (
        <SidebarLink key={item.path} item={item} activePath={location.pathname} />
      ))}
    </>
  )}

  {/* Conditional Admin Section */}
  {userData?.role === 'admin' && (
    <div className="mt-2 pt-4">
      <p className="px-4 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Admin Management
      </p>
      {adminItems.map((item) => (
        <SidebarLink key={item.path} item={item} activePath={location.pathname} />
      ))}
    </div>
  )}
</nav>

      {/* User Actions Footer */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <Link 
          to="/profile" 
          className="flex items-center p-3 text-gray-600 font-semibold hover:bg-blue-50 rounded-xl transition-colors group mb-1"
        >
          <User className="mr-3 w-5 h-5 text-gray-400 group-hover:text-blue-600" />
          <span>My Profile</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut className="mr-3 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            V1.0 Stable
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for individual links
const SidebarLink = ({ item, activePath }) => {
  const isActive = activePath === item.path;
  const Icon = item.icon;

  return (
    <Link 
      to={item.path} 
      className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon 
        className={`mr-3 w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} 
      />
      <span className="font-semibold">{item.name}</span>
    </Link>
  );
};

export default Sidebar;