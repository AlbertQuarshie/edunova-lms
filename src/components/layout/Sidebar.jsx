import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  BookOpen,
  ShieldCheck,
  Settings,
  User,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { logoutUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const studentLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Browse Courses", path: "/courses", icon: Search },
    { name: "My Courses", path: "/my-courses", icon: BookOpen },
  ];

  const adminLinks = [
    { name: "Admin Overview", path: "/admin", icon: ShieldCheck },
    { name: "Manage Courses", path: "/admin/manage-course", icon: Settings },
    { name: "Manage Users", path: "/admin/manage-users", icon: User },
    { name: "Enrollments", path: "/admin/enrollments", icon: ClipboardList }, // Add this
  ];

  const role = userData?.role;

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
          Edunova
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {/* Render Student Links */}
        {role === "student" &&
          studentLinks.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              activePath={location.pathname}
            />
          ))}

        {/* Render Admin Links */}
        {role === "admin" && (
          <>
            <p className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Administration
            </p>
            {adminLinks.map((item) => (
              <SidebarLink
                key={item.path}
                item={item}
                activePath={location.pathname}
              />
            ))}
          </>
        )}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-50 space-y-1">
        {/* Hide profile for Admin */}
        {role !== "admin" && (
          <Link
            to="/profile"
            className="flex items-center p-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors group"
          >
            <User className="mr-3 w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            <span>My Profile</span>
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ item, activePath }) => {
  const isActive = activePath === item.path;
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={`flex items-center p-3 rounded-2xl transition-all font-semibold ${
        isActive
          ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon
        className={`mr-3 w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`}
      />
      <span>{item.name}</span>
    </Link>
  );
};

export default Sidebar;
