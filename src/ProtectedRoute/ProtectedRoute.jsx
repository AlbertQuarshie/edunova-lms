import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute Component
 * * Handles the logic for restricting access to authenticated users only.
 * It waits for Firebase to finish initializing before making a decision.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Removed userData to fix ESLint warning
  const location = useLocation();

  // 1. Initializing state: Show a pulse loader while checking Firebase Auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
            Initializing Portal...
          </div>
        </div>
      </div>
    );
  }

  // 2. Not Authenticated: Redirect to login page
  // We save the 'from' location so we can send them back after they log in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Authenticated: Render the requested page (Admin/Student Dashboard, etc.)
  return children;
};

export default ProtectedRoute;