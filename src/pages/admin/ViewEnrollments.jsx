import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Check, X, User, BookOpen, Calendar, Mail } from 'lucide-react';

const ViewEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "enrollments"), async (snapshot) => {
      const enrollmentPromises = snapshot.docs.map(async (enrollmentDoc) => {
        const data = enrollmentDoc.data();
        const userSnap = await getDoc(doc(db, "users", data.userId));
        const userData = userSnap.exists() ? userSnap.data() : { name: "Removed User", email: "N/A" };

        return {
          id: enrollmentDoc.id,
          ...data,
          studentName: userData.name || "Unknown Student",
          studentEmail: userData.email,
          displayCourseName: data.courseTitle || "Untitled Course"
        };
      });

      const results = await Promise.all(enrollmentPromises);
      setEnrollments(results);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, "enrollments", id), { status: 'active' });
    } catch {
      alert("Admin access required.");
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteDoc(doc(db, "enrollments", id));
      } catch {
        alert("Error deleting.");
      }
    }
  };

  if (loading) return (
    <div className="flex-1 flex justify-center items-center h-screen bg-slate-50">
      <p className="text-slate-500 font-medium">Loading Enrollments...</p>
    </div>
  );

  return (
    /* REMOVED ml-64: This div now fills the available space next to the sidebar */
    <div className="flex-1 min-h-screen bg-slate-50">
      <div className="p-10 w-full"> 
        <header className="mb-10">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Edunova Portal
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Course Enrollments</h1>
          <p className="text-slate-500 mt-1">Manage student access and track course popularity.</p>
        </header>

        <div className="grid gap-4 max-w-5xl">
          {enrollments.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 border-dashed">
              <p className="text-slate-400 font-medium">No records found.</p>
            </div>
          ) : (
            enrollments.map((enroll) => (
              <div 
                key={enroll.id} 
                className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-500"
              >
                <div className="flex items-center gap-4 min-w-[280px]">
                  <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{enroll.studentName}</h3>
                    <div className="flex items-center text-slate-400 text-sm gap-1 mt-1">
                      <Mail size={14} /> {enroll.studentEmail}
                    </div>
                  </div>
                </div>

                <div className="flex-1 md:border-l md:border-slate-100 md:pl-8">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                    <BookOpen size={18} />
                    <span>{enroll.displayCourseName}</span> 
                  </div>
                  <div className="flex items-center text-slate-400 text-xs gap-1 font-medium">
                    <Calendar size={14} /> 
                    Applied: {enroll.enrolledAt?.toDate().toLocaleDateString() || 'Recently'}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                    enroll.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {enroll.status}
                  </span>

                  <div className="flex gap-2">
                    {enroll.status === 'pending' && (
                      <button 
                        onClick={() => handleApprove(enroll.id)}
                        className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                      >
                        <Check size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleRemove(enroll.id)}
                      className="p-2.5 bg-white text-slate-400 border border-slate-200 rounded-xl hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all active:scale-95"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEnrollments;