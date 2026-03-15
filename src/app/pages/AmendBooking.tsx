import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { mockBookings, mockHotels } from '../data/mockData';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export function AmendBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === bookingId);
  const hotel = mockHotels.find((h) => h.name === booking?.hotelName);

  const [checkIn, setCheckIn] = useState(booking?.checkIn || '');
  const [checkOut, setCheckOut] = useState(booking?.checkOut || '');
  const [numberOfRooms, setNumberOfRooms] = useState(booking?.numberOfRooms || 1);
  const [roomType, setRoomType] = useState(booking?.roomType || '');

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

  const originalPrice = booking.totalPrice;
  const newCheckIn = new Date(checkIn);
  const newCheckOut = new Date(checkOut);
  const nights = Math.ceil((newCheckOut.getTime() - newCheckIn.getTime()) / (1000 * 3600 * 24));
  const pricePerNight = hotel?.pricePerNight || 0;
  const newPrice = pricePerNight * numberOfRooms * (nights || 1);
  const priceDifference = newPrice - originalPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking amendment submitted successfully!');
    navigate('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(`/booking-details/${bookingId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Booking Details
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Amend Booking</h1>

          {/* Original Booking Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Original Booking</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Check-in</p>
                <p className="font-medium text-gray-900">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Check-out</p>
                <p className="font-medium text-gray-900">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Rooms</p>
                <p className="font-medium text-gray-900">{booking.numberOfRooms}</p>
              </div>
              <div>
                <p className="text-gray-600">Room Type</p>
                <p className="font-medium text-gray-900">{booking.roomType}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amendment Options */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Make Changes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value={booking.roomType}>{booking.roomType}</option>
                    <option value="Standard Room">Standard Room</option>
                    <option value="Deluxe Suite">Deluxe Suite</option>
                    <option value="Premium Suite">Premium Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms
                  </label>
                  <select
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Price Update */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Price Update</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Original Price</span>
                  <span className="font-semibold text-gray-900">${originalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">New Price</span>
                  <span className="font-semibold text-gray-900">${newPrice}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      {priceDifference >= 0 ? 'Additional Payment' : 'Refund Amount'}
                    </span>
                    <span
                      className={`text-xl font-bold ${
                        priceDifference >= 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {priceDifference >= 0 ? '+' : ''}${priceDifference}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amendment Policy */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Amendment Policy</h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Amendments must be made at least 24 hours before check-in</li>
                    <li>Subject to room availability</li>
                    <li>Price differences will be adjusted in your next payment</li>
                    <li>You will receive a confirmation email once the amendment is processed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/booking-details/${bookingId}`)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Confirm Amendment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
