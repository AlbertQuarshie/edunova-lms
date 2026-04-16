import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading, userData } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-slate-400 font-medium animate-pulse">Initializing Portal...</div>
      </div>
    );
  }

  // If no user is logged in, send them to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (user && !userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-slate-400 font-medium animate-pulse">Fetching Profile...</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;