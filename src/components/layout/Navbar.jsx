import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-sm">
      <div className="font-semibold text-gray-700">EduNova Portal</div>
      <button 
        onClick={handleSignOut}
        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
      >
        Logout
      </button>
    </nav>
  );
};
export default Navbar;