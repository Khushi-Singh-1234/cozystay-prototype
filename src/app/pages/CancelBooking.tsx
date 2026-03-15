import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { mockBookings } from '../data/mockData';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';

export function CancelBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

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

  // Calculate refund (80% of total price as example policy)
  const refundPercentage = 80;
  const refundAmount = (booking.totalPrice * refundPercentage) / 100;
  const deductionAmount = booking.totalPrice - refundAmount;

  const handleCancellation = () => {
    setConfirmed(true);
  };

  const handleConfirm = () => {
    alert('Booking cancelled successfully! Refund will be processed in 5-7 business days.');
    navigate('/my-bookings');
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cancellation Confirmed
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your booking has been successfully cancelled
            </p>
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Refund Amount</p>
              <p className="text-4xl font-bold text-green-600 mb-2">${refundAmount}</p>
              <p className="text-sm text-gray-600">
                Will be processed to your original payment method within 5-7 business days
              </p>
            </div>
            <button
              onClick={() => navigate('/my-bookings')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Cancel Booking</h1>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-semibold text-gray-900">{booking.id}</span>
              </div>
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
                  {new Date(booking.checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold text-gray-900">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total Amount Paid</span>
                  <span className="font-bold text-gray-900">${booking.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Cancellation Policy</h2>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Free cancellation up to 48 hours before check-in</li>
              <li>Cancellations made 24-48 hours before check-in: 50% refund</li>
              <li>Cancellations made within 24 hours of check-in: 20% refund</li>
              <li>No-show: No refund</li>
            </ul>
          </div>

          {/* Refund Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Refund Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Original Amount</span>
                <span className="font-semibold text-gray-900">${booking.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Cancellation Fee ({100 - refundPercentage}%)</span>
                <span className="font-semibold text-red-600">-${deductionAmount}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Refundable Amount</span>
                  <span className="text-2xl font-bold text-green-600">${refundAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Processing */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              <strong>Refund Processing:</strong> The refund will be processed to your original payment method ({booking.paymentMethod}) within 5-7 business days after cancellation confirmation.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Warning</h4>
                <p className="text-sm text-red-800">
                  This action cannot be undone. Once you cancel this booking, you will need to make a new reservation if you wish to stay at this hotel.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/booking-details/${bookingId}`)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Keep Booking
            </button>
            <button
              type="button"
              onClick={handleCancellation}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
