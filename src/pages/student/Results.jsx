import React from 'react';

const Results = () => {
  // Mock data representing student grades
  const grades = [
    { id: 1, subject: "React Fundamentals", type: "Assignment", score: 92, grade: "A" },
    { id: 2, subject: "UI Design Patterns", type: "Exam", score: 88, grade: "B+" },
    { id: 3, subject: "Firebase Security", type: "Project", score: 95, grade: "A+" },
    { id: 4, subject: "JavaScript ES6+", type: "Quiz", score: 78, grade: "C" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Results</h1>
          <p className="text-gray-500">Your performance summary for the current term.</p>
        </div>
        
        {/* GPA Summary Card */}
        <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-100 flex items-center gap-4">
          <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Current GPA</span>
          <span className="text-3xl font-black">3.8</span>
        </div>
      </header>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Module / Subject</th>
              <th className="px-6 py-4">Assessment Type</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4 text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {grades.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-800">{item.subject}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{item.type}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.score}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-black text-blue-600 text-lg">
                  {item.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;