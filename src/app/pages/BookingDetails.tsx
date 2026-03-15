import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { mockBookings } from '../data/mockData';
import { ArrowLeft, Calendar, MapPin, Users, CreditCard } from 'lucide-react';

export function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">Booking not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/my-bookings')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to My Bookings
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">
                Booking ID: <span className="font-semibold text-blue-600">{booking.id}</span>
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          {/* Hotel Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hotel Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{booking.hotelName}</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Room Type:</strong> {booking.roomType}
                </p>
                <p>
                  <strong>Number of Rooms:</strong> {booking.numberOfRooms}
                </p>
              </div>
            </div>
          </div>

          {/* Stay Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stay Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Check-in</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-7">
                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Check-out</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-7">
                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h2>
            <div className="space-y-4">
              {booking.guests.map((guest, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Guest {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Name</p>
                      <p className="font-medium text-gray-900">{guest.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Age</p>
                      <p className="font-medium text-gray-900">{guest.age}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Gender</p>
                      <p className="font-medium text-gray-900">{guest.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">ID Proof</p>
                      <p className="font-medium text-gray-900">{guest.idProof}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Contact</p>
                      <p className="font-medium text-gray-900">{guest.contact}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Email</p>
                      <p className="font-medium text-gray-900">{guest.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Payment Method:</span>
                <span className="font-semibold text-gray-900">{booking.paymentMethod}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">Total Amount Paid</span>
                  <span className="text-2xl font-bold text-blue-600">${booking.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {booking.status === 'confirmed' && (
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/amend-booking/${booking.id}`)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Amend Booking
              </button>
              <button
                onClick={() => navigate(`/cancel-booking/${booking.id}`)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
