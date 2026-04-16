import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  BookOpen,
  Clock,
  Tag,
  AlignLeft,
  CheckCircle,
  Trash2,
  Edit,
  Loader2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Toast from "../../components/layout/Toast";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    title: "",
    category: "Frontend",
    duration: "",
    description: "",
    id: null,
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (isEditing) {
        const courseRef = doc(db, "courses", formData.id);
        const { id: _, ...data } = formData;
        await updateDoc(courseRef, data);
        setToast({
          show: true,
          message: "Course details updated!",
          type: "success",
        });
      } else {
        const { id: __, ...data } = formData;
        await addDoc(collection(db, "courses"), {
          ...data,
          createdAt: serverTimestamp(),
        });
        setToast({
          show: true,
          message: "New course published!",
          type: "success",
        });
      }
      resetForm();
      fetchCourses();
    } catch {
      setToast({
        show: true,
        message: "Failed to save changes.",
        type: "error",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Permanently delete "${title}"?`)) {
      try {
        await deleteDoc(doc(db, "courses", id));
        setToast({
          show: true,
          message: "Course removed from catalog.",
          type: "success",
        });

        // Adjust page if the last item on a page is deleted
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
        fetchCourses();
      } catch {
        setToast({
          show: true,
          message: "Error deleting course.",
          type: "error",
        });
      }
    }
  };

  const startEdit = (course) => {
    setFormData(course);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Frontend",
      duration: "",
      description: "",
      id: null,
    });
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* FORM SECTION */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div
          className={`p-6 text-white flex justify-between items-center transition-colors duration-500 ${isEditing ? "bg-amber-500" : "bg-slate-900"}`}
        >
          <div>
            <h2 className="text-xl font-bold">
              {isEditing ? "Edit Course" : "Create New Course"}
            </h2>
            <p className="text-sm opacity-80 italic">
              Update your curriculum in real-time.
            </p>
          </div>
          {isEditing && (
            <button
              onClick={resetForm}
              className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2">
            <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <BookOpen size={14} className="mr-2 text-blue-500" /> Course Title
            </label>
            <input
              required
              placeholder="e.g. Advanced React Architecture"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Tag size={14} className="mr-2 text-blue-500" /> Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Clock size={14} className="mr-2 text-blue-500" /> Duration
            </label>
            <input
              required
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="e.g. 6 Weeks"
              className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <AlignLeft size={14} className="mr-2 text-blue-500" /> Description
            </label>
            <textarea
              required
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Provide a brief syllabus overview..."
              className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            className={`md:col-span-2 py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center active:scale-[0.98] ${
              submitLoading
                ? "bg-slate-300"
                : isEditing
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-slate-900 hover:bg-blue-600"
            }`}
          >
            {submitLoading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : isEditing ? (
              <>
                <Save size={20} className="mr-2" /> Save Changes
              </>
            ) : (
              <>
                <CheckCircle size={20} className="mr-2" /> Publish to Catalog
              </>
            )}
          </button>
        </form>
      </div>

      {/* CATALOG TABLE WITH PAGINATION */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 text-lg">
            Active Curriculum
          </h2>
          <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-3 py-1 rounded-full">
            {courses.length} Total
          </span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="p-5">Course Details</th>
              <th className="p-5">Category</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentItems.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="p-5">
                  <p className="font-bold text-slate-900">{course.title}</p>
                  <p className="text-xs text-slate-400">{course.duration}</p>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                    {course.category}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEdit(course)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id, course.title)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 rounded-xl border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-100 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 rounded-xl border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-100 transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
