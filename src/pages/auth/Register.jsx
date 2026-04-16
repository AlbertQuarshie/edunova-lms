import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerStudent } from '../../services/authService';
import { auth } from '../../config/firebaseConfig'; // Added
import { signOut } from 'firebase/auth'; // Added

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
      
      // 1. Logic creates the user in Auth and Firestore
      await registerStudent(email, password, name);
      
      // 2. LOGIC FIX: Force sign out immediately to break the auto-login loop
      await signOut(auth);
      
      // 3. Navigate to login
      navigate('/login', { 
        state: { message: "Account created successfully! Please log in." } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <input 
            type="text" placeholder="Full Name" required
            className="w-full px-4 py-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email" required
            className="w-full px-4 py-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full px-4 py-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg">
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;