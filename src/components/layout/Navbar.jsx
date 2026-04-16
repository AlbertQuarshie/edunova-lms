import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User as UserIcon, Shield } from 'lucide-react';

const Navbar = () => {
  const { userData } = useAuth();

  return (
    <nav className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <h1 className="text-sm font-black uppercase tracking-widest text-slate-400">EduNova Portal</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          {/* Displays Name and Role from Firestore  */}
          <p className="text-sm font-bold text-slate-900 leading-none">
            {userData?.name || "User"}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            {userData?.role === 'admin' && <Shield size={10} className="text-blue-600" />}
            <p className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">
              {userData?.role || "Student"}
            </p>
          </div>
        </div>

        {/* User Avatar Initial [cite: 336] */}
        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold uppercase">
          {userData?.name?.charAt(0) || <UserIcon size={18} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;