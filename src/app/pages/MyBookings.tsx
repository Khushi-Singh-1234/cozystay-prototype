import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { mockBookings } from '../data/mockData';
import { Calendar, MapPin, Users, Eye, Edit, XCircle } from 'lucide-react';

export function MyBookings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {mockBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Bookings Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and book your perfect stay
            </p>
            <button
              onClick={() => navigate('/search')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Search Hotels
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {booking.hotelName}
                      </h2>
                      <div className="flex items-center gap-4 text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{booking.guests.length} Guest(s)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Booking ID:</span>
                        <span className="font-semibold text-blue-600">{booking.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${booking.totalPrice}
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Room Type</p>
                        <p className="font-semibold text-gray-900">{booking.roomType}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Rooms</p>
                        <p className="font-semibold text-gray-900">{booking.numberOfRooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Payment Method</p>
                        <p className="font-semibold text-gray-900">{booking.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Primary Guest</p>
                        <p className="font-semibold text-gray-900">{booking.guests[0].name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/booking-details/${booking.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    {booking.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => navigate(`/amend-booking/${booking.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          Amend
                        </button>
                        <button
                          onClick={() => navigate(`/cancel-booking/${booking.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
