import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { mockHotels } from '../data/mockData';
import { MapPin, Star, Wifi, Tv, Wind, ArrowLeft } from 'lucide-react';

export function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  const hotel = mockHotels.find((h) => h.id === id);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const handleBooking = () => {
    localStorage.setItem('bookingData', JSON.stringify({
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomType: hotel.roomType,
      numberOfRooms,
      pricePerNight: hotel.pricePerNight,
    }));
    navigate(`/booking/${hotel.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/search')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Search
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hotel Image */}
          <div className="h-96 overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Hotel Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{hotel.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-semibold">{hotel.rating}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {hotel.hotelType}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  ${hotel.pricePerNight}
                </div>
                <div className="text-gray-500">per night</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">About This Hotel</h2>
              <p className="text-gray-600 text-lg">{hotel.description}</p>
            </div>

            {/* Room Type */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Room Type</h2>
              <p className="text-gray-700 text-lg">{hotel.roomType}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    {amenity === 'WiFi' && <Wifi className="w-6 h-6 text-blue-600" />}
                    {amenity === 'TV' && <Tv className="w-6 h-6 text-blue-600" />}
                    {amenity === 'AC' && <Wind className="w-6 h-6 text-blue-600" />}
                    {!['WiFi', 'TV', 'AC'].includes(amenity) && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    )}
                    <span className="font-medium text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  <strong>{hotel.availableRooms}</strong> rooms available
                </p>
              </div>
            </div>

            {/* Booking Section */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Your Stay</h2>
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms
                  </label>
                  <select
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {[...Array(Math.min(5, hotel.availableRooms))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">Total Price</div>
                  <div className="text-3xl font-bold text-blue-600">
                    ${hotel.pricePerNight * numberOfRooms}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>
              <button
                onClick={handleBooking}
                className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
