import { Link, useNavigate } from 'react-router-dom';
import { LogOut, MessageSquare } from 'lucide-react';
import { account } from '../appwrite/config';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80 transition-opacity"
          >
            <MessageSquare className="w-8 h-8" />
            <span>CustomerQueries</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 