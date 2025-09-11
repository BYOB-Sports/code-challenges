import { Court } from '../types/court';
import tennisCourtImage1 from '../assets/tennis-court-1.jpg';
import tennisCourtImage2 from '../assets/tennis-court-2.jpg';
import tennisCourtImage3 from '../assets/tennis-court-3.jpg';

const images = [tennisCourtImage1, tennisCourtImage2, tennisCourtImage3];

const courtNames = [
  'Central Park Tennis Center',
  'Riverside Athletic Club',
  'Mountain View Tennis Courts',
  'Sunset Tennis Academy',
  'Oak Grove Country Club',
  'Pine Valley Tennis Complex',
  'Harbor View Tennis Club',
  'Summit Sports Center',
  'Maple Leaf Tennis Courts',
  'Golden Gate Tennis Academy',
  'Lakeside Tennis Center',
  'Heritage Tennis Club',
  'Valley View Courts',
  'Hillcrest Tennis Academy',
  'Oceanview Tennis Complex',
  'Redwood Tennis Center',
  'Willowbrook Tennis Club',
  'Eastside Community Courts',
  'West End Tennis Academy',
  'Northshore Tennis Center'
];

const locations = [
  'Downtown', 'Westside', 'Eastside', 'Northside', 'Southside',
  'Midtown', 'Uptown', 'Riverside', 'Hillside', 'Lakeside',
  'Oceanside', 'Parkside', 'Mountainside', 'Countryside', 'Suburbia',
  'City Center', 'Harbor District', 'University Area', 'Historic District', 'Garden District'
];

const amenities = [
  'Parking', 'Pro Shop', 'Locker Rooms', 'Showers', 'Equipment Rental',
  'Coaching', 'Café', 'Lighting', 'Restrooms', 'Water Fountain',
  'Spectator Seating', 'WiFi', 'Court Reservation System'
];

const surfaceTypes = ['hard', 'clay', 'grass', 'indoor'] as const;
const priceRanges = ['$', '$$', '$$$', '$$$$'];

export const mockCourts: Court[] = courtNames.map((name, index) => ({
  id: `court-${index + 1}`,
  name,
  location: locations[index % locations.length],
  surfaceType: surfaceTypes[index % surfaceTypes.length],
  rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
  reviewCount: Math.floor(Math.random() * 200) + 15,
  priceRange: priceRanges[Math.floor(Math.random() * priceRanges.length)],
  amenities: amenities
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 6) + 3),
  image: images[index % images.length],
  description: `A premium tennis facility offering ${surfaceTypes[index % surfaceTypes.length]} courts with professional-grade equipment and excellent amenities.`,
  phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  website: `www.${name.toLowerCase().replace(/\s+/g, '')}.com`
}));