import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'Active Courses', value: '4', color: 'bg-blue-500' },
    { label: 'Completed', value: '12', color: 'bg-green-500' },
    { label: 'Assignments Due', value: '3', color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back, Alex!</h2>
        <p className="text-gray-500 text-sm">Here is what is happening with your studies today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <div className={`h-1 w-12 mt-4 rounded ${stat.color}`}></div>
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent Course Activity</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Last Accessed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 font-medium">React Web Development</td>
                <td className="px-6 py-4">75%</td>
                <td className="px-6 py-4 text-gray-500 text-sm">2 hours ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">UI/UX Design Basics</td>
                <td className="px-6 py-4">40%</td>
                <td className="px-6 py-4 text-gray-500 text-sm">Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;