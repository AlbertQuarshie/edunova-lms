import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
   
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full border border-gray-100 p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">
           Edunova LMS
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Enter your details to login.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-black transition"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-black transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-500">
            First time here?{" "}
            <Link to="/register" className="text-black font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;