import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  Check,
  X,
  User,
  BookOpen,
  Calendar,
  Mail,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Toast from "../../components/layout/Toast";

const ViewEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "enrollments"),
      async (snapshot) => {
        const enrollmentPromises = snapshot.docs.map(async (enrollmentDoc) => {
          const data = enrollmentDoc.data();
          const userSnap = await getDoc(doc(db, "users", data.userId));
          const userData = userSnap.exists()
            ? userSnap.data()
            : { name: "Removed User", email: "N/A" };

          return {
            id: enrollmentDoc.id,
            ...data,
            studentName: userData.name || "Unknown Student",
            studentEmail: userData.email,
            displayCourseName: data.courseTitle || "Untitled Course",
          };
        });

        const results = await Promise.all(enrollmentPromises);
        setEnrollments(results);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEnrollments = enrollments.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(enrollments.length / itemsPerPage);

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, "enrollments", id), { status: "active" });
      setToast({
        show: true,
        message: "Enrollment approved!",
        type: "success",
      });
    } catch {
      setToast({
        show: true,
        message: "Admin access required.",
        type: "error",
      });
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Delete this enrollment record?")) {
      try {
        await deleteDoc(doc(db, "enrollments", id));
        setToast({ show: true, message: "Record deleted.", type: "success" });
        if (currentEnrollments.length === 1 && currentPage > 1)
          setCurrentPage((p) => p - 1);
      } catch {
        setToast({
          show: true,
          message: "Error deleting record.",
          type: "error",
        });
      }
    }
  };

  if (loading)
    return (
      <div className="flex-1 flex justify-center items-center h-screen bg-slate-50 font-bold text-slate-400">
        <Loader2 className="animate-spin mr-2" /> LOADING REGISTRY...
      </div>
    );

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-10">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <header className="mb-10">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          Edunova Portal
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Enrollments
        </h1>
        <p className="text-slate-500 mt-1">
          Manage student access and verify registry data.
        </p>
      </header>

      <div className="grid gap-4 max-w-5xl">
        {enrollments.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 border-dashed">
            <p className="text-slate-400 font-medium">No records found.</p>
          </div>
        ) : (
          <>
            {currentEnrollments.map((enroll) => (
              <div
                key={enroll.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-600"
              >
                <div className="flex items-center gap-4 min-w-[280px]">
                  <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">
                      {enroll.studentName}
                    </h3>
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
                    Applied:{" "}
                    {enroll.enrolledAt?.toDate().toLocaleDateString() ||
                      "Recently"}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                      enroll.status === "active"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {enroll.status}
                  </span>

                  <div className="flex gap-2">
                    {enroll.status === "pending" && (
                      <button
                        onClick={() => handleApprove(enroll.id)}
                        className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-md"
                      >
                        <Check size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(enroll.id)}
                      className="p-2.5 bg-white text-slate-400 border border-slate-200 rounded-xl hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all active:scale-95 shadow-sm"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* PAGINATION UI */}
            <div className="mt-8 flex items-center justify-between px-2">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-all shadow-sm"
              >
                <ChevronLeft size={20} /> Prev
              </button>

              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Page {currentPage} / {totalPages || 1}
              </div>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-900 rounded-2xl font-bold text-white hover:bg-blue-600 disabled:opacity-40 transition-all shadow-sm"
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEnrollments;
