import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getHotelById, updateHotel } from '../../data/mockData';
import { Hotel as HotelIcon, ArrowLeft } from 'lucide-react';

export function UpdateRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const hotel = roomId ? getHotelById(roomId) : undefined;

  const [formData, setFormData] = useState({
    hotelName: hotel?.name || '',
    location: hotel?.location || '',
    roomType: hotel?.roomType || '',
    amenities: hotel?.amenities || [],
    price: hotel?.pricePerNight.toString() || '',
    availableRooms: hotel?.availableRooms.toString() || '',
    hotelType: hotel?.hotelType || '',
    description: hotel?.description || '',
  });

  const amenitiesOptions = ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hotel) {
      alert('Hotel not found.');
      return;
    }

    const updatedHotel: Hotel = {
      id: hotel.id,
      name: formData.hotelName,
      location: formData.location,
      roomType: formData.roomType,
      amenities: formData.amenities,
      pricePerNight: Number(formData.price),
      rating: hotel.rating,
      image: hotel.image,
      description: formData.description,
      hotelType: formData.hotelType,
      availableRooms: Number(formData.availableRooms),
    };

    const success = updateHotel(updatedHotel);
    if (success) {
      alert('Room updated successfully!');
      navigate('/admin/dashboard');
    } else {
      alert('Failed to update room.');
    }
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <p className="text-center py-8">Room not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg">
                <HotelIcon className="w-6 h-6 text-slate-800" />
              </div>
              <span className="text-2xl font-bold">COZYSTAY Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Update Room</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type *
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Deluxe Suite">Deluxe Suite</option>
                  <option value="Premium Suite">Premium Suite</option>
                  <option value="Ocean View Room">Ocean View Room</option>
                  <option value="Mountain View Suite">Mountain View Suite</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Type *
                </label>
                <select
                  name="hotelType"
                  value={formData.hotelType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Hotel Type</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Resort">Resort</option>
                  <option value="Budget">Budget</option>
                  <option value="Business">Business</option>
                  <option value="Lodge">Lodge</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Night ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Rooms *
                </label>
                <input
                  type="number"
                  name="availableRooms"
                  value={formData.availableRooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {amenitiesOptions.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                      formData.amenities.includes(amenity)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Update Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
