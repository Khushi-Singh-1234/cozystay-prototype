import { useNavigate } from 'react-router';
import { mockHotels } from '../../data/mockData';
import { Hotel, Plus, Edit, Trash2, LogOut, Users, DollarSign, Star, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();

  const totalRooms = mockHotels.reduce((sum, hotel) => sum + hotel.availableRooms, 0);
  const totalRevenue = mockHotels.reduce((sum, hotel) => sum + hotel.pricePerNight * hotel.availableRooms, 0);
  const averageRating = (mockHotels.reduce((sum, hotel) => sum + hotel.rating, 0) / mockHotels.length).toFixed(1);

  const handleDelete = (hotelId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      alert('Room deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg">
                <Hotel className="w-6 h-6 text-slate-800" />
              </div>
              <span className="text-2xl font-bold">COZYSTAY Admin</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-gray-200 transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Hotel className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{mockHotels.length}</div>
            <div className="text-sm text-gray-600">Total Hotels</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalRooms}</div>
            <div className="text-sm text-gray-600">Available Rooms</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${totalRevenue}</div>
            <div className="text-sm text-gray-600">Potential Revenue</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{averageRating}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Room Management */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Room Management</h2>
            <button
              onClick={() => navigate('/admin/add-room')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Add New Room
            </button>
          </div>

          {/* Rooms Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hotel Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Room Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price/Night</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Available</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{hotel.name}</div>
                      <div className="text-sm text-gray-500">{hotel.location}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{hotel.roomType}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">${hotel.pricePerNight}</td>
                    <td className="px-6 py-4 text-gray-700">{hotel.availableRooms} rooms</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/update-room/${hotel.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(hotel.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
