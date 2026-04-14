import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500">Manage your account information and preferences.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50">
          <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            AJ
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Alex Johnson</h2>
            <p className="text-blue-500 font-medium">Software Development Student</p>
            <p className="text-gray-400 text-sm mt-1">Joined: January 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Student ID</label>
            <p className="text-gray-800 font-medium">STU-2026-04</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</label>
            <p className="text-gray-800 font-medium">alex.j@example.edu</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</label>
            <p className="text-gray-800 font-medium">+1 (555) 000-1234</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Year</label>
            <p className="text-gray-800 font-medium">2nd Year (Sophomore)</p>
          </div>
        </div>

        <button className="mt-8 px-6 py-2 bg-gray-800 text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-colors">
          Edit Profile Details
        </button>
      </div>
    </div>
  );
};

export default Profile;