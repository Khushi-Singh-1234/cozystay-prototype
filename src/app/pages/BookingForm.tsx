import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface Guest {
  name: string;
  age: number;
  gender: string;
  idProof: string;
  contact: string;
  email: string;
}

export function BookingForm() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState<Guest[]>([
    {
      name: '',
      age: 0,
      gender: '',
      idProof: '',
      contact: '',
      email: '',
    },
  ]);

  const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');

  const addGuest = () => {
    setGuests([
      ...guests,
      {
        name: '',
        age: 0,
        gender: '',
        idProof: '',
        contact: '',
        email: '',
      },
    ]);
  };

  const removeGuest = (index: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index));
    }
  };

  const updateGuest = (index: number, field: keyof Guest, value: string | number) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    localStorage.setItem('currentBooking', JSON.stringify({
      bookingId,
      ...bookingData,
      checkIn,
      checkOut,
      guests,
    }));
    
    navigate(`/payment/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Guest Details</h1>

          {/* Booking Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-gray-900 mb-2">Booking Summary</h2>
            <p className="text-gray-700">
              <strong>Hotel:</strong> {bookingData.hotelName}
            </p>
            <p className="text-gray-700">
              <strong>Room Type:</strong> {bookingData.roomType}
            </p>
            <p className="text-gray-700">
              <strong>Number of Rooms:</strong> {bookingData.numberOfRooms}
            </p>
            <p className="text-gray-700">
              <strong>Price per Night:</strong> ${bookingData.pricePerNight}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Check-in/Check-out */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date *
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
                  Check-out Date *
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

            {/* Guest Details */}
            {guests.map((guest, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Guest {index + 1}
                  </h3>
                  {guests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGuest(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={guest.name}
                      onChange={(e) => updateGuest(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      value={guest.age || ''}
                      onChange={(e) => updateGuest(index, 'age', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      value={guest.gender}
                      onChange={(e) => updateGuest(index, 'gender', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Proof *
                    </label>
                    <input
                      type="text"
                      value={guest.idProof}
                      onChange={(e) => updateGuest(index, 'idProof', e.target.value)}
                      placeholder="Driver's License, Passport, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      value={guest.contact}
                      onChange={(e) => updateGuest(index, 'contact', e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={guest.email}
                      onChange={(e) => updateGuest(index, 'email', e.target.value)}
                      placeholder="guest@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addGuest}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Another Guest
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
