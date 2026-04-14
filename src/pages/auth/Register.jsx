import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 mt-1 border rounded-md"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 mt-1 border rounded-md"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 mt-1 border rounded-md"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
            Sign Up
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Already registered? <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;