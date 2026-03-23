export interface Hotel {
  id: string;
  name: string;
  location: string;
  roomType: string;
  amenities: string[];
  pricePerNight: number;
  rating: number;
  image: string;
  description: string;
  hotelType: string;
  availableRooms: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: {
    name: string;
    age: number;
    gender: string;
    idProof: string;
    contact: string;
    email: string;
  }[];
  numberOfRooms: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  paymentMethod: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York, USA',
    roomType: 'Deluxe Suite',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service'],
    pricePerNight: 250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczNDM0NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Experience luxury at its finest with stunning city views and world-class amenities.',
    hotelType: 'Luxury',
    availableRooms: 12,
  },
  {
    id: '2',
    name: 'Ocean View Resort',
    location: 'Miami, USA',
    roomType: 'Ocean View Room',
    amenities: ['WiFi', 'TV', 'AC', 'Pool', 'Beach Access'],
    pricePerNight: 180,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1691849233457-837d8e2f9da3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGJlYWNoJTIwcmVzb3J0JTIwYWVyaWFsfGVufDF8fHx8MTc3MzQ5OTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Wake up to breathtaking ocean views and enjoy direct beach access.',
    hotelType: 'Resort',
    availableRooms: 8,
  },
  {
    id: '3',
    name: 'Mountain Lodge',
    location: 'Aspen, USA',
    roomType: 'Mountain View Suite',
    amenities: ['WiFi', 'TV', 'Fireplace', 'Hot Tub'],
    pricePerNight: 200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1759281944533-a9eea164ffe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxvZGdlJTIwZXh0ZXJpb3IlMjB3aW50ZXJ8ZW58MXx8fHwxNzczNDk5NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Cozy mountain retreat with panoramic views and rustic charm.',
    hotelType: 'Lodge',
    availableRooms: 6,
  },
  {
    id: '4',
    name: 'City Center Inn',
    location: 'Los Angeles, USA',
    roomType: 'Standard Room',
    amenities: ['WiFi', 'TV', 'AC', 'Parking'],
    pricePerNight: 120,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwaG90ZWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM0OTk1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Affordable comfort in the heart of the city with easy access to attractions.',
    hotelType: 'Budget',
    availableRooms: 15,
  },
  {
    id: '5',
    name: 'Riverside Hotel',
    location: 'Chicago, USA',
    roomType: 'River View Room',
    amenities: ['WiFi', 'TV', 'AC', 'Restaurant', 'Gym'],
    pricePerNight: 150,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1609520934787-b6b2bffdbb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlcnNpZGUlMjBob3RlbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM0OTk1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Modern hotel overlooking the beautiful Chicago River.',
    hotelType: 'Business',
    availableRooms: 10,
  },
  {
    id: '6',
    name: 'Desert Oasis Resort',
    location: 'Las Vegas, USA',
    roomType: 'Premium Suite',
    amenities: ['WiFi', 'TV', 'AC', 'Casino', 'Spa', 'Pool'],
    pricePerNight: 220,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1745792820122-1ad63dda2b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXMlMjB2ZWdhcyUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzczNDk5NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ultimate entertainment destination with luxury accommodations.',
    hotelType: 'Resort',
    availableRooms: 20,
  },
];

export const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 234 567 8900',
  address: '123 Main Street, New York, NY 10001',
};

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    hotelId: '1',
    hotelName: 'Grand Plaza Hotel',
    roomType: 'Deluxe Suite',
    checkIn: '2026-04-15',
    checkOut: '2026-04-18',
    guests: [
      {
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        idProof: 'DL123456',
        contact: '+1 234 567 8900',
        email: 'john.doe@email.com',
      }
    ],
    numberOfRooms: 1,
    totalPrice: 750,
    status: 'confirmed',
    paymentMethod: 'Credit Card',
  },
];

const HOTELS_STORAGE_KEY = 'cozystay:hotels';

export function readHotels(): Hotel[] {
  if (typeof window === 'undefined') return mockHotels;

  try {
    const raw = localStorage.getItem(HOTELS_STORAGE_KEY);
    if (!raw) return mockHotels;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return mockHotels;

    return parsed;
  } catch {
    return mockHotels;
  }
}

export function writeHotels(hotels: Hotel[]) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
  } catch {
    // ignore quota errors
  }
}

export function getHotelById(id: string): Hotel | undefined {
  return readHotels().find((h) => h.id === id);
}

export function addHotel(newHotel: Hotel) {
  const hotels = readHotels();
  const updated = [...hotels, newHotel];
  writeHotels(updated);
}

export function updateHotel(updatedHotel: Hotel): boolean {
  const hotels = readHotels();
  const idx = hotels.findIndex((h) => h.id === updatedHotel.id);
  if (idx === -1) return false;

  hotels[idx] = updatedHotel;
  writeHotels(hotels);
  return true;
}

export function deleteHotel(id: string): boolean {
  const hotels = readHotels();
  const exists = hotels.some((h) => h.id === id);
  if (!exists) return false;

  writeHotels(hotels.filter((h) => h.id !== id));
  return true;
}
