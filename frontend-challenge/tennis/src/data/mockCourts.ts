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
  'Northshore Tennis Center',
  'Champions Tennis Complex',
  'Elite Sports Academy',
  'Grandslam Tennis Club',
  'Ace Tennis Center',
  'Baseline Tennis Academy',
  'Court Masters Complex',
  'Diamond Tennis Club',
  'Eclipse Tennis Center',
  'Falcon Tennis Academy',
  'Grand Slam Tennis Courts',
  'Horizon Tennis Club',
  'Imperial Tennis Center',
  'Jupiter Tennis Academy',
  'Kings Court Tennis Club',
  'Liberty Tennis Center',
  'Metropolitan Tennis Academy',
  'Neptune Tennis Complex',
  'Olympic Tennis Center',
  'Platinum Tennis Club',
  'Quantum Tennis Academy',
  'Royal Tennis Center',
  'Sterling Tennis Club',
  'Titanium Tennis Academy',
  'Ultimate Tennis Center',
  'Victory Tennis Club',
  'Windsor Tennis Academy',
  'Xtreme Tennis Center',
  'Zenith Tennis Club',
  'Alpha Tennis Academy',
  'Bravo Tennis Center',
  'Charlie Tennis Club',
  'Delta Tennis Academy',
  'Echo Tennis Center',
  'Foxtrot Tennis Club',
  'Golf & Tennis Resort',
  'Hotel Tennis Courts',
  'Infinity Tennis Center',
  'Jade Tennis Academy',
  'Karma Tennis Club',
  'Luna Tennis Center',
  'Metro Tennis Academy',
  'Nova Tennis Club',
  'Omega Tennis Center',
  'Phoenix Tennis Academy',
  'Quest Tennis Club',
  'Radiant Tennis Center',
  'Sapphire Tennis Academy',
  'Thunder Tennis Club',
  'Unity Tennis Center',
  'Velocity Tennis Academy',
  'Wave Tennis Club',
  'X-Factor Tennis Center',
  'Yellowstone Tennis Academy',
  'Zephyr Tennis Club',
  'Admiral Tennis Center',
  'Beacon Tennis Academy',
  'Crystal Tennis Club',
  'Dynamo Tennis Center',
  'Emerald Tennis Academy',
  'Falcon Ridge Tennis Club',
  'Galaxy Tennis Center',
  'Harmony Tennis Academy',
  'Icon Tennis Club',
  'Jewel Tennis Center',
  'Knight Tennis Academy',
  'Legend Tennis Club',
  'Mirage Tennis Center',
  'Nexus Tennis Academy',
  'Oasis Tennis Club',
  'Pinnacle Tennis Center',
  'Quest Tennis Academy',
  'Rainbow Tennis Club',
  'Spectrum Tennis Center',
  'Triumph Tennis Academy',
  'Ultra Tennis Club',
  'Vortex Tennis Center',
  'Wildcard Tennis Academy',
  'Xcel Tennis Club',
  'Yolo Tennis Center',
  'Zero Gravity Tennis Academy'
];

const locations = [
  'Downtown', 'Westside', 'Eastside', 'Northside', 'Southside',
  'Midtown', 'Uptown', 'Riverside', 'Hillside', 'Lakeside',
  'Oceanside', 'Parkside', 'Mountainside', 'Countryside', 'Suburbia',
  'City Center', 'Harbor District', 'University Area', 'Historic District', 'Garden District',
  'Financial District', 'Arts Quarter', 'Tech Hub', 'Medical Center', 'Airport Area',
  'Beach Town', 'Mountain View', 'Valley Center', 'Industrial Zone', 'Shopping District',
  'Sports Complex', 'Entertainment District', 'Business Park', 'Residential Heights', 'Waterfront',
  'Old Town', 'New Town', 'Metro Center', 'Suburb Hills', 'Vista Point',
  'Pine Ridge', 'Oak Valley', 'Cedar Heights', 'Maple Grove', 'Birch Lane',
  'Sunset Boulevard', 'Sunrise Avenue', 'Rainbow Valley', 'Crystal Lake', 'Golden Hills',
  'Silver Springs', 'Diamond Heights', 'Emerald Park', 'Ruby Ridge', 'Sapphire Bay',
  'Coral Reef', 'Ocean Breeze', 'Mountain Peak', 'Desert Oasis', 'Forest Glen',
  'River Bend', 'Creek Side', 'Pond View', 'Hill Crest', 'Valley Floor',
  'North Point', 'South Bay', 'East Ridge', 'West Coast', 'Central Plaza',
  'Upper East', 'Lower West', 'Mid Valley', 'High Point', 'Low Lands',
  'Coastal Area', 'Inland Valley', 'Border Town', 'Port District', 'Marina Bay',
  'Golf Course', 'Country Club', 'Resort Area', 'Convention Center', 'Stadium District',
  'Park Avenue', 'Main Street', 'Broadway', 'Fifth Avenue', 'Wall Street'
];

const amenities = [
  'Parking', 'Pro Shop', 'Locker Rooms', 'Showers', 'Equipment Rental',
  'Coaching', 'Café', 'Lighting', 'Restrooms', 'Water Fountain',
  'Spectator Seating', 'WiFi', 'Court Reservation System', 'Valet Parking',
  'Restaurant', 'Fitness Center', 'Swimming Pool', 'Spa Services', 'Massage Therapy',
  'Physical Therapy', 'Sports Medicine', 'Childcare', 'Pro Lessons', 'Group Classes',
  'Tournament Hosting', 'Event Space', 'Conference Rooms', 'Gift Shop', 'Ball Machine',
  'Stringing Service', 'Court Maintenance', 'Video Analysis', 'Fitness Classes', 'Yoga Studio',
  'Sauna', 'Steam Room', 'Hot Tub', 'Cold Plunge', 'Recovery Room',
  'Nutritionist', 'Sports Psychology', 'Athletic Training', 'Court Booking App', 'Live Streaming',
  'Score Tracking', 'Match Statistics', 'Player Rankings', 'Social Events', 'Club Tournaments',
  'Junior Programs', 'Adult Leagues', 'Senior Programs', 'Wheelchair Access', 'Adaptive Equipment',
  'First Aid Station', 'Security Service', 'Climate Control', 'Sound System', 'LED Scoreboards',
  'Court Cameras', 'Player Tracking', 'Performance Analytics', 'Guest Passes', 'Member Discounts'
];

const surfaceTypes = ['hard', 'clay', 'grass', 'indoor'] as const;
const priceRanges = ['$', '$$', '$$$', '$$$$'];

const descriptions = [
  'A world-class tennis facility featuring state-of-the-art courts and premium amenities for players of all skill levels.',
  'Experience tennis excellence at this premier facility with championship-quality courts and professional coaching staff.',
  'Modern tennis complex offering exceptional playing conditions with breathtaking views and top-tier facilities.',
  'Elite tennis destination featuring meticulously maintained courts and comprehensive training programs.',
  'Prestigious tennis club combining luxury amenities with competitive playing opportunities for discerning players.',
  'Award-winning tennis facility known for its perfect court conditions and exceptional member services.',
  'Professional-grade tennis center offering world-class training facilities and tournament-quality courts.',
  'Exclusive tennis club featuring pristine courts, expert instruction, and unparalleled member experiences.',
  'Championship tennis facility with Olympic-standard courts and comprehensive athletic development programs.',
  'Luxury tennis resort offering premium court surfaces and five-star amenities in a stunning setting.',
  'Historic tennis club combining traditional elegance with modern facilities and expert coaching.',
  'Innovative tennis center featuring cutting-edge technology and personalized training programs.',
  'Community-focused tennis facility offering inclusive programs and well-maintained courts for all ages.',
  'Boutique tennis club providing intimate settings with personalized attention and exceptional court quality.',
  'Metropolitan tennis center offering convenient access to premium courts and professional instruction.',
  'Resort-style tennis facility featuring multiple court surfaces and comprehensive recreational programs.',
  'High-performance tennis academy specializing in competitive development and elite training methods.',
  'Family-friendly tennis center offering programs for all ages with safe, well-lit courts.',
  'Eco-friendly tennis facility featuring sustainable practices and environmentally conscious operations.',
  'Tech-forward tennis center incorporating advanced analytics and digital coaching methodologies.'
];

const getRandomDescription = (surfaceType: string, hasPool: boolean, hasSpa: boolean) => {
  const baseDescriptions = descriptions[Math.floor(Math.random() * descriptions.length)];
  const surfaceDescription = ` Features pristine ${surfaceType} courts`;
  const extraAmenities = [];
  
  if (hasPool) extraAmenities.push('resort-style swimming facilities');
  if (hasSpa) extraAmenities.push('full-service spa and wellness center');
  
  const amenityDescription = extraAmenities.length > 0 
    ? ` Includes ${extraAmenities.join(' and ')}.`
    : ' with professional-grade equipment and exceptional playing conditions.';
    
  return baseDescriptions + surfaceDescription + amenityDescription;
};

export const mockCourts: Court[] = courtNames.map((name, index) => {
  const courtAmenities = amenities
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 8) + 4);
    
  const hasPool = courtAmenities.includes('Swimming Pool');
  const hasSpa = courtAmenities.includes('Spa Services');
  const surface = surfaceTypes[index % surfaceTypes.length];
  
  return {
    id: `court-${index + 1}`,
    name,
    location: locations[index % locations.length],
    surfaceType: surface,
    rating: Math.round((3.2 + Math.random() * 1.8) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 500) + 25,
    priceRange: priceRanges[Math.floor(Math.random() * priceRanges.length)],
    amenities: courtAmenities,
    image: images[index % images.length],
    description: getRandomDescription(surface, hasPool, hasSpa),
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    website: `www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
  };
});