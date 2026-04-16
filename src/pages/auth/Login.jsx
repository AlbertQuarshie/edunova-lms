import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginUser, signInWithGoogle } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      // Role-based Redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl shadow-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2">Log in to your portal</p>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 disabled:bg-slate-300"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-4 bg-white text-slate-400 font-bold tracking-widest">
              Or
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 border border-slate-100 rounded-xl flex items-center justify-center space-x-2 hover:bg-slate-50 transition font-medium text-slate-600"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="G"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
