import { useNavigate } from 'react-router';
import { Hotel, Search, BookMarked, User, LogOut } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Hotel className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">COZYSTAY</span>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => navigate('/search')}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search Hotels</span>
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <BookMarked className="w-5 h-5" />
              <span className="font-medium">My Bookings</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
