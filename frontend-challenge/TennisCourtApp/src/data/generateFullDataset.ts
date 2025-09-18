import type { Court } from '@/types';

// Helper functions to generate realistic data
const generateRandomRating = (min: number, max: number): number => {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
};

const getRandomElement = <T>(array: T[]): T => {
  if (array.length === 0) {
    throw new Error('Array cannot be empty');
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

// Data pools for realistic generation
const surfaces: Court['surface'][] = ['hard', 'clay', 'grass', 'synthetic'];
const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'Fort Worth, TX',
  'Columbus, OH',
  'Charlotte, NC',
  'San Francisco, CA',
  'Indianapolis, IN',
  'Seattle, WA',
  'Denver, CO',
  'Washington, DC',
  'Boston, MA',
  'Nashville, TN',
  'El Paso, TX',
  'Detroit, MI',
  'Portland, OR',
  'Las Vegas, NV',
  'Memphis, TN',
  'Louisville, KY',
  'Baltimore, MD',
  'Milwaukee, WI',
  'Albuquerque, NM',
  'Tucson, AZ',
  'Fresno, CA',
  'Mesa, AZ',
  'Sacramento, CA',
  'Atlanta, GA',
  'Kansas City, MO',
  'Colorado Springs, CO',
  'Omaha, NE',
  'Raleigh, NC',
  'Miami, FL',
  'Long Beach, CA',
  'Virginia Beach, VA',
  'Oakland, CA',
  'Minneapolis, MN',
  'Tampa, FL',
  'Tulsa, OK',
  'Arlington, TX',
  'Wichita, KS',
  'Bakersfield, CA',
];

const courtNameTemplates = [
  '{city} Tennis Center',
  '{city} Racquet Club',
  '{adjective} Courts Tennis Club',
  '{city} Indoor Tennis',
  '{landmark} Tennis Resort',
  '{city} Community Tennis',
  '{adjective} Tennis Academy',
  '{city} Sports Complex',
  '{landmark} Tennis Club',
  '{adjective} Tennis Courts',
];

const adjectives = [
  'Elite',
  'Premium',
  'Grand',
  'Royal',
  'Champion',
  'Victory',
  'Ace',
  'Summit',
  'Metropolitan',
  'Heritage',
  'Classic',
  'Modern',
  'Professional',
  'Executive',
  'Platinum',
  'Diamond',
  'Golden',
  'Silver',
  'Prime',
  'Superior',
];

const landmarks = [
  'Riverside',
  'Hillside',
  'Parkside',
  'Lakeside',
  'Oceanview',
  'Mountain View',
  'Valley View',
  'Garden',
  'Sunset',
  'Sunrise',
  'Downtown',
  'Uptown',
  'Midtown',
  'Westside',
  'Eastside',
  'Northside',
  'Southside',
  'Central',
];

const amenitiesPool = [
  'Lighting',
  'Parking',
  'Pro Shop',
  'Locker Rooms',
  'Restrooms',
  'Water Fountain',
  'Equipment Rental',
  'Coaching Available',
  'Professional Coaching',
  'Café',
  'Restaurant',
  'Fitness Center',
  'Spa',
  'Pool',
  'Sauna',
  'Steam Room',
  'Tennis Lessons',
  'Youth Programs',
  'Adult Leagues',
  'Tournament Hosting',
  'Court Reservations',
  'Online Booking',
  'Member Discounts',
  'Group Rates',
  'Climate Control',
  'Sound System',
  'Spectator Seating',
  'Ball Machine Rental',
  'Stringing Service',
  'First Aid Station',
  'Security',
  'Valet Parking',
];

// Generate a realistic court name
const generateCourtName = (city: string): string => {
  const template = getRandomElement(courtNameTemplates);
  const cityName = city.split(',')[0];

  let courtName = template;
  if (courtName.includes('{city}')) {
    courtName = courtName.replace('{city}', cityName);
  }
  if (courtName.includes('{adjective}')) {
    courtName = courtName.replace('{adjective}', getRandomElement(adjectives));
  }
  if (courtName.includes('{landmark}')) {
    courtName = courtName.replace('{landmark}', getRandomElement(landmarks));
  }

  return courtName;
};

// Generate realistic amenities
const generateAmenities = (rating: number, pricePerHour: number): string[] => {
  const baseAmenities = ['Restrooms', 'Water Fountain'];
  const additionalAmenities: string[] = [];

  // Basic amenities for all courts
  if (rating >= 3.0) {
    additionalAmenities.push('Lighting', 'Parking');
  }

  // Mid-tier amenities
  if (rating >= 3.5 || pricePerHour >= 35) {
    additionalAmenities.push('Equipment Rental', 'Court Reservations');
  }

  // Higher-end amenities
  if (rating >= 4.0 || pricePerHour >= 50) {
    additionalAmenities.push('Pro Shop', 'Locker Rooms', 'Coaching Available');
  }

  // Premium amenities
  if (rating >= 4.5 || pricePerHour >= 70) {
    additionalAmenities.push(
      'Professional Coaching',
      'Café',
      'Tournament Hosting'
    );
  }

  // Luxury amenities
  if (rating >= 4.7 || pricePerHour >= 90) {
    additionalAmenities.push('Restaurant', 'Fitness Center', 'Spa');
  }

  // Add some random amenities based on court type
  const randomAmenities = amenitiesPool
    .filter(
      amenity =>
        !baseAmenities.includes(amenity) &&
        !additionalAmenities.includes(amenity)
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3));

  return [...baseAmenities, ...additionalAmenities, ...randomAmenities];
};

// Generate coordinates for a city (mock implementation)
const generateCoordinates = (city: string) => {
  // This is a simplified approach - in reality you'd use a geocoding service
  const cityCoords: { [key: string]: { lat: number; lng: number } } = {
    'New York, NY': { lat: 40.7128, lng: -74.006 },
    'Los Angeles, CA': { lat: 34.0522, lng: -118.2437 },
    'Chicago, IL': { lat: 41.8781, lng: -87.6298 },
    'Houston, TX': { lat: 29.7604, lng: -95.3698 },
    'Phoenix, AZ': { lat: 33.4484, lng: -112.074 },
    // Add more as needed...
  };

  const coords = cityCoords[city] || {
    lat: 40 + Math.random() * 10,
    lng: -120 + Math.random() * 40,
  };

  // Add small random offset for variety
  return {
    latitude: coords.lat + (Math.random() - 0.5) * 0.1,
    longitude: coords.lng + (Math.random() - 0.5) * 0.1,
  };
};

// Generate opening hours
const generateOpeningHours = (indoor: boolean) => {
  const weekdayOpen = indoor ? '05:00' : '06:00';
  const weekdayClose = indoor ? '24:00' : '22:00';
  const weekendOpen = indoor ? '06:00' : '07:00';
  const weekendClose = indoor ? '22:00' : '20:00';

  return {
    Monday: { open: weekdayOpen, close: weekdayClose },
    Tuesday: { open: weekdayOpen, close: weekdayClose },
    Wednesday: { open: weekdayOpen, close: weekdayClose },
    Thursday: { open: weekdayOpen, close: weekdayClose },
    Friday: { open: weekdayOpen, close: weekdayClose },
    Saturday: { open: weekendOpen, close: weekendClose },
    Sunday: { open: weekendOpen, close: weekendClose },
  };
};

// Generate the complete dataset of 65 courts
export const generateFullCourtDataset = (): Court[] => {
  const courts: Court[] = [];

  for (let i = 1; i <= 65; i++) {
    const city = getRandomElement(cities);
    const surface = getRandomElement(surfaces);
    const indoor = Math.random() < 0.25; // 25% indoor courts

    // Price correlation with quality
    let pricePerHour: number;
    let rating: number;

    if (i <= 10) {
      // Premium courts (first 10)
      pricePerHour = 60 + Math.random() * 35;
      rating = generateRandomRating(4.3, 4.9);
    } else if (i <= 40) {
      // Mid-range courts
      pricePerHour = 30 + Math.random() * 40;
      rating = generateRandomRating(3.5, 4.5);
    } else {
      // Budget courts
      pricePerHour = 15 + Math.random() * 25;
      rating = generateRandomRating(2.8, 4.0);
    }

    const name = generateCourtName(city);
    const numberOfCourts = Math.floor(Math.random() * 20) + 2; // 2-21 courts
    const coordinates = generateCoordinates(city);
    const amenities = generateAmenities(rating, pricePerHour);
    const openingHours = generateOpeningHours(indoor);

    const court: Court = {
      id: i.toString(),
      name,
      address: `${Math.floor(Math.random() * 9999) + 100} ${getRandomElement(['Main', 'Oak', 'Pine', 'Elm', 'Maple', 'Cedar'])} ${getRandomElement(['Street', 'Avenue', 'Drive', 'Boulevard', 'Lane'])}, ${city}`,
      location: city,
      surface,
      indoor,
      pricePerHour: Math.round(pricePerHour),
      rating,
      imageUrl: `https://picsum.photos/800/600?random=${i}`,
      images: [
        `https://picsum.photos/800/600?random=${i}`,
        `https://picsum.photos/800/600?random=${i + 100}`,
        ...(Math.random() > 0.5
          ? [`https://picsum.photos/800/600?random=${i + 200}`]
          : []),
      ],
      description: `${indoor ? 'Indoor' : 'Outdoor'} ${surface} court facility in ${city}. ${rating >= 4.5 ? 'Premium' : rating >= 4.0 ? 'Quality' : rating >= 3.5 ? 'Good' : 'Basic'} tennis facility with ${numberOfCourts} courts available.`,
      amenities,
      numberOfCourts,
      coordinates,
      phoneNumber: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      openingHours,
      availability: [],
      reviews: [],
    };

    courts.push(court);
  }

  return courts;
};

// Export the generated dataset
export const fullMockCourts = generateFullCourtDataset();
