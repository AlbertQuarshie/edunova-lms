import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  BookOpen, Clock, Tag, AlignLeft, CheckCircle, 
  Trash2, Edit, Plus, Loader2, Save, X 
} from 'lucide-react';

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Frontend',
    duration: '',
    description: '',
    id: null 
  });

  // 1. Fetch all courses on load
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  // 2. Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      if (isEditing) {
        // Update Logic
        const courseRef = doc(db, "courses", formData.id);
        const { id: _, ...data } = formData; // Satisfies linter: '_' means unused
        await updateDoc(courseRef, data);
        alert("Course updated!");
      } else {
        // Add Logic
        const { id: __, ...data } = formData; // Satisfies linter: '__' means unused
        await addDoc(collection(db, "courses"), { 
          ...data, 
          createdAt: serverTimestamp() 
        });
        alert("Course published!");
      }
      resetForm();
      fetchCourses();
    } catch (err) {
      console.error("Action error:", err);
      alert("Action failed. Check permissions.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // 3. Delete Logic
  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await deleteDoc(doc(db, "courses", id));
      fetchCourses();
    }
  };

  // 4. Set form for editing
  const startEdit = (course) => {
    setFormData(course);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'Frontend', duration: '', description: '', id: null });
    setIsEditing(false);
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      
      {/* SECTION 1: THE FORM (Add or Edit) */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className={`p-6 text-white flex justify-between items-center ${isEditing ? 'bg-amber-500' : 'bg-blue-600'}`}>
          <div>
            <h2 className="text-xl font-bold">{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
            <p className="text-sm opacity-90 text-white/80">Manage your curriculum details here.</p>
          </div>
          {isEditing && (
            <button onClick={resetForm} className="bg-white/20 p-2 rounded-lg hover:bg-white/30">
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <BookOpen size={16} className="mr-2 text-blue-500" /> Course Title
            </label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2"><Tag size={16} className="mr-2 text-blue-500" /> Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2"><Clock size={16} className="mr-2 text-blue-500" /> Duration</label>
            <input
              required
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="e.g. 4 Weeks"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2"><AlignLeft size={16} className="mr-2 text-blue-500" /> Description</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            className={`md:col-span-2 py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center ${
              submitLoading ? 'bg-gray-400' : isEditing ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-900 hover:bg-blue-600'
            }`}
          >
            {submitLoading ? 'Processing...' : isEditing ? <><Save size={20} className="mr-2" /> Update Course</> : <><CheckCircle size={20} className="mr-2" /> Publish Course</>}
          </button>
        </form>
      </div>

      {/* SECTION 2: THE CATALOG TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h2 className="font-bold text-gray-800 text-lg">Existing Courses</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-5">Course</th>
              <th className="p-5">Category</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-5 font-bold text-gray-800">{course.title}</td>
                <td className="p-5 text-gray-500 text-sm">{course.category}</td>
                <td className="p-5 flex justify-end gap-3">
                  <button onClick={() => startEdit(course)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(course.id, course.title)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourse;