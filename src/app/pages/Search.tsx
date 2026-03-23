import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import type { Hotel } from '../data/mockData';
import { readHotels } from '../data/mockData';
import { Search as SearchIcon, MapPin, Star, Wifi, Tv, Wind, CircleDollarSign } from 'lucide-react';

export function Search() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    setHotels(readHotels());
  }, []);

  const [filters, setFilters] = useState({

    location: '',
    checkIn: '',
    checkOut: '',
    hotelType: '',
    minRating: 0,
    maxPrice: 500,
  });

  const filteredHotels = hotels.filter((hotel) => {
    if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.hotelType && hotel.hotelType !== filters.hotelType) {
      return false;
    }
    if (hotel.rating < filters.minRating) {
      return false;
    }
    if (hotel.pricePerNight > filters.maxPrice) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Hotels</h1>

        {/* Search Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="Enter city or place"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Date
              </label>
              <input
                type="date"
                value={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Date
              </label>
              <input
                type="date"
                value={filters.checkOut}
                onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Type
              </label>
              <select
                value={filters.hotelType}
                onChange={(e) => setFilters({ ...filters, hotelType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Types</option>
                <option value="Luxury">Luxury</option>
                <option value="Resort">Resort</option>
                <option value="Budget">Budget</option>
                <option value="Business">Business</option>
                <option value="Lodge">Lodge</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="0">All Ratings</option>
                <option value="4.0">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.7">4.7+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${filters.maxPrice}
              </label>
              <input
                type="range"
                min="50"
                max="500"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={() => {}}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <SearchIcon className="w-5 h-5" />
            Search
          </button>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{filteredHotels.length}</span> hotels
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{hotel.rating}</span>
                        <span className="text-gray-500 text-sm ml-2">({hotel.hotelType})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        ${hotel.pricePerNight}
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3">{hotel.description}</p>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Room Type:</strong> {hotel.roomType}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
                          {amenity === 'TV' && <Tv className="w-3 h-3" />}
                          {amenity === 'AC' && <Wind className="w-3 h-3" />}
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>{hotel.availableRooms}</strong> rooms available
                    </div>
                    <button
                      onClick={() => navigate(`/hotel/${hotel.id}`)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
