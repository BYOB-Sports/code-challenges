export interface Review {
  id: number;
  user: string;
  rating: number; // 1 to 5
  comment: string;
}

export interface Court {
  id: number;
  name: string;
  location: string; // e.g., "South Boston, MA"
  rating: number; // Average rating, 1 to 5, can have decimals
  surface: 'Hard' | 'Clay' | 'Grass';
  numberOfCourts: number;
  amenities: string[]; // e.g., ["Lights", "Restrooms", "Practice Wall"]
  imageUrl: string; // e.g., "https://source.unsplash.com/400x300/?tennis,court"
  reviews: Review[];
}

const surfaces: Array<Court['surface']> = ['Hard', 'Clay', 'Grass'];

const locations: string[] = [
  'South Boston, MA',
  'Brooklyn, NY',
  'Queens, NY',
  'Jersey City, NJ',
  'Philadelphia, PA',
  'Alexandria, VA',
  'Arlington, VA',
  'Charleston, SC',
  'Atlanta, GA',
  'Miami, FL',
  'Orlando, FL',
  'Tampa, FL',
  'Austin, TX',
  'Dallas, TX',
  'Houston, TX',
  'Boulder, CO',
  'Denver, CO',
  'Salt Lake City, UT',
  'Phoenix, AZ',
  'Scottsdale, AZ',
  'San Diego, CA',
  'Los Angeles, CA',
  'Orange, CA',
  'San Jose, CA',
  'San Francisco, CA',
  'Portland, OR',
  'Seattle, WA',
  'Spokane, WA',
  'Boise, ID',
  'Missoula, MT',
  'Minneapolis, MN',
  'Madison, WI',
  'Chicago, IL',
  'Ann Arbor, MI',
  'Columbus, OH',
  'Cleveland, OH',
  'Nashville, TN',
  'Louisville, KY',
  'New Orleans, LA',
  'Baton Rouge, LA',
  'Birmingham, AL',
  'Little Rock, AR',
  'Omaha, NE',
  'Kansas City, MO',
  'St. Louis, MO',
  'Oklahoma City, OK',
  'Albuquerque, NM',
  'Reno, NV',
  'Las Vegas, NV',
  'Raleigh, NC',
  'Charlotte, NC',
  'Savannah, GA',
  'Hartford, CT',
  'Providence, RI',
  'Burlington, VT',
  'New Haven, CT',
  'Pittsburgh, PA',
  'Buffalo, NY',
  'Syracuse, NY',
  'Albany, NY',
];

const amenitiesPool: string[] = [
  'Lights',
  'Restrooms',
  'Practice Wall',
  'Water Fountain',
  'Pro Shop',
  'Locker Rooms',
  'Parking',
  'Seating',
  'Wheelchair Accessible',
  'Ball Machine',
  'Reservation System',
  'Coaching',
  'Indoor Courts',
];

const centerNamesLeft: string[] = [
  'Riverside',
  'Maple',
  'Pine',
  'Oak',
  'Cedar',
  'Lakeside',
  'Highland',
  'Prospect',
  'Sunset',
  'Heritage',
  'Union',
  'Hillcrest',
  'Brookside',
  'Meadow',
  'Valley',
  'Gateway',
  'Liberty',
  'Summit',
  'Granite',
  'Willow',
];

const centerNamesRight: string[] = [
  'Tennis Center',
  'Park Courts',
  'Recreation Courts',
  'Athletic Club',
  'Community Courts',
  'Sports Complex',
  'Club',
  'Recreation Center',
  'Courts',
];

const userNames: string[] = [
  'Alex P.',
  'Jordan R.',
  'Sam K.',
  'Taylor M.',
  'Morgan L.',
  'Chris D.',
  'Jamie S.',
  'Casey B.',
  'Avery H.',
  'Riley C.',
  'Drew F.',
  'Robin W.',
  'Quinn V.',
  'Skyler T.',
  'Parker N.',
  'Hayden J.',
  'Rowan E.',
  'Kendall Z.',
  'Emerson Y.',
  'Sage X.',
  'Harper G.',
  'Reese Q.',
  'Sydney U.',
  'Lane I.',
  'Shawn O.',
  'Dakota P.',
  'Jesse R.',
  'Cameron S.',
  'Blake T.',
  'Finley M.',
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickFromArray<T>(arr: T[], seed: number): T {
  const idx = Math.floor(seededRandom(seed) * arr.length) % arr.length;
  return arr[idx];
}

function buildAmenities(seed: number): string[] {
  const count = 3 + (seed % 4); // 3..6
  const start = Math.floor(seededRandom(seed + 17) * amenitiesPool.length);
  const step = 1 + (seed % 3);
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (start + i * step) % amenitiesPool.length;
    const item = amenitiesPool[idx];
    if (!picked.includes(item)) picked.push(item);
  }
  return picked;
}

function buildReviews(courtId: number, surface: Court['surface']): Review[] {
  const count = 3 + (courtId % 6); // 3..8
  const comments: string[] = [
    `Great ${surface.toLowerCase()} surface and well-marked lines.`,
    'Courts are clean and nets are in good shape.',
    'Evening play is nice when the lights are on.',
    'Parking is easy and restrooms are nearby.',
    'Friendly regulars and good community vibe.',
    'A bit windy some days, but overall excellent.',
    'Good bounce and consistent speed.',
    'Reservations help avoid long waits at peak hours.',
  ];
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const user = userNames[(courtId + i) % userNames.length];
    const base = 2 + Math.floor(seededRandom(courtId * 31 + i * 7) * 4); // 2..5
    const edge = (courtId + i) % 5 === 0 ? 1 : base; // occasional 1-star
    const rating = Math.max(1, Math.min(5, edge));
    const comment = comments[(courtId + i) % comments.length];
    reviews.push({ id: i + 1, user, rating, comment });
  }
  return reviews;
}

function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return Math.round(avg * 10) / 10; // one decimal place
}

function buildName(seed: number): string {
  const left = pickFromArray(centerNamesLeft, seed + 5);
  const right = pickFromArray(centerNamesRight, seed + 11);
  return `${left} ${right}`;
}

const localImageFiles: string[] = [
  'outdoor-tennis-court-facility-in-the-evening.jpg',
  'images (1).jpeg',
  'images (2).jpeg',
  'Monte Vista-6.jpeg',
];

function buildCourt(id: number): Court {
  const surface = surfaces[id % surfaces.length];
  const location = pickFromArray(locations, id * 13);
  const numberOfCourts = 2 + (id % 11); // 2..12
  const amenities = buildAmenities(id * 19);
  const reviews = buildReviews(id, surface);
  const rating = averageRating(reviews);
  const name = buildName(id * 23);
  const imageFile = localImageFiles[(id - 1) % localImageFiles.length];
  const imageUrl = encodeURI(`/images/${imageFile}`);

  return {
    id,
    name,
    location,
    rating,
    surface,
    numberOfCourts,
    amenities,
    imageUrl,
    reviews,
  };
}

export const courtsData: Court[] = Array.from({ length: 60 }, (_, idx) => buildCourt(idx + 1));


