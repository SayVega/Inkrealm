import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-white text-3xl font-cinzel tracking-wider hover:text-gray-200 transition-colors"
          >
            Inkrealm
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/cart" 
                  className="text-white hover:text-gray-200 flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span>Cart</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-gray-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 