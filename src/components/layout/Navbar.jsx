import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../services/userService';

const Navbar = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const data = await getUserProfile(user.uid);
      
        if (data) setProfile(data);
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <nav className="h-20 bg-white px-8 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center"></div>

      <div className="flex items-center space-x-3">
        <div className="text-right flex flex-col justify-center">
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {/* REMOVE the hardcoded name here */}
            {profile?.name || (user?.displayName) || "User"}
          </h3>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-1">
            {profile?.role || "STUDENT"}
          </p>
        </div>
        
        <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
          <span className="text-lg">
            {/* Dynamically get first letter */}
            {profile?.name ? profile.name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || "U")}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;