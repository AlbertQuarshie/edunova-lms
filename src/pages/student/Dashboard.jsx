import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../services/userService';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const data = await getUserProfile(user.uid);
          setProfile(data);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  if (loading) return <div className="p-10 text-center">Loading your portal...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {profile?.name || 'Student'}!
        </h1>
        <p className="text-gray-600 mt-2">Here is your academic overview for today.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">4</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Assignments Due</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Average Grade</p>
          <p className="text-2xl font-bold text-green-600 mt-1">A-</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;