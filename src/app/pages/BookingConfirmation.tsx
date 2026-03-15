import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { CheckCircle, Download, Home, Calendar } from 'lucide-react';

export function BookingConfirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = JSON.parse(localStorage.getItem('finalBooking') || '{}');

  const downloadReceipt = () => {
    // Mock download functionality
    alert('Receipt downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your reservation has been successfully confirmed
          </p>

          {/* Booking ID */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Booking ID</p>
            <p className="text-3xl font-bold text-blue-600">{bookingId}</p>
          </div>

          {/* Booking Summary */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
            <div className="space-y-3 bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Hotel</span>
                <span className="font-semibold text-gray-900">{booking.hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room Type</span>
                <span className="font-semibold text-gray-900">{booking.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold text-gray-900">
                  {new Date(booking.checkIn).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold text-gray-900">
                  {new Date(booking.checkOut).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Rooms</span>
                <span className="font-semibold text-gray-900">{booking.numberOfRooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights</span>
                <span className="font-semibold text-gray-900">{booking.nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests</span>
                <span className="font-semibold text-gray-900">{booking.guests?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold text-gray-900">{booking.paymentMethod}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total Paid</span>
                  <span className="font-bold text-blue-600">${booking.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Details */}
          {booking.guests && booking.guests.length > 0 && (
            <div className="text-left mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Guest Details</h2>
              {booking.guests.map((guest: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="font-semibold text-gray-900 mb-2">Guest {index + 1}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name: </span>
                      <span className="text-gray-900">{guest.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Age: </span>
                      <span className="text-gray-900">{guest.age}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email: </span>
                      <span className="text-gray-900">{guest.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Contact: </span>
                      <span className="text-gray-900">{guest.contact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Important Information</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Please carry a valid ID proof during check-in</li>
              <li>Check-in time: 2:00 PM, Check-out time: 11:00 AM</li>
              <li>A confirmation email has been sent to your registered email</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadReceipt}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              <Calendar className="w-5 h-5" />
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/home')}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
