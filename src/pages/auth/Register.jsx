import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerStudent } from '../../services/authService';
import { auth } from '../../config/firebaseConfig';
import { signOut } from 'firebase/auth';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { email, password, name } = formData;
      
      // 1. Create the user
      await registerStudent(email, password, name);
      
      // 2. Stopping auto-login loop
     
      await signOut(auth);
      
      // 3. Move to login with success message
      navigate('/login', { 
        state: { message: "Account created! Please sign in with your new credentials." },
        replace: true //Clear the register page from history
      });
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl shadow-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-slate-400 mt-2">Join the EduNova Student Portal</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" placeholder="Full Name" required
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" required
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Create Password" required
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button 
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 disabled:bg-slate-300"
          >
            {loading ? "Registering..." : "Get Started"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;