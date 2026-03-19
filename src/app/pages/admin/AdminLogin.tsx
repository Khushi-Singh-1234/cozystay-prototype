import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Hotel, Shield, ArrowLeft } from 'lucide-react';
import { Alert } from '../../components/ui/alert';

export function AdminLogin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const adminUser = "admin";
    const adminPassword = "admin123";

    if (userId.trim().toLowerCase() !== adminUser || password !== adminPassword) {
      setError('Invalid admin credentials.');
      return;
    }

    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-800 p-3 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="ml-3 text-3xl font-bold text-gray-900">COZYSTAY</h1>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Admin Portal
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Hotel Management System
          </p>

          {error ? (
            <Alert variant="destructive" className="mb-4">
              <p>{error}</p>
            </Alert>
          ) : null}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                Admin ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition"
                placeholder="Enter admin ID"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 transition font-medium"
            >
              Sign In as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
