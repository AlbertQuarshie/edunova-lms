import React from 'react';

const Assignments = () => {
  const assignments = [
    { 
      id: 1, 
      title: "Responsive Dashboard UI", 
      course: "React Web Development", 
      dueDate: "Oct 25, 2026", 
      status: "Pending",
      priority: "High" 
    },
    { 
      id: 2, 
      title: "User Persona Research", 
      course: "UI/UX Design Basics", 
      dueDate: "Oct 28, 2026", 
      status: "Submitted",
      priority: "Medium" 
    },
    { 
      id: 3, 
      title: "Firebase Auth Integration", 
      course: "Firebase for Beginners", 
      dueDate: "Nov 02, 2026", 
      status: "Pending",
      priority: "High" 
    }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
        <p className="text-gray-500">Track your tasks and upcoming deadlines.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Assignment Name</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {assignments.map((task) => (
              <tr key={task.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-800">{task.title}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{task.course}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{task.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    task.status === 'Submitted' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-amber-100 text-amber-600'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 font-bold text-sm hover:underline">
                    {task.status === 'Submitted' ? 'View' : 'Submit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;