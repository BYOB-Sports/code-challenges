import { Court, Review, SurfaceType } from '../types';

const STORAGE_KEY = 'byob.tennis.v1';

export type PersistedData = {
  courts: Court[];
  reviews: Review[];
};

const surfaceTypes: SurfaceType[] = ['hard', 'clay', 'grass', 'carpet'];
const cities = ['Austin', 'Denver', 'Seattle', 'Miami', 'San Diego', 'Chicago', 'Boston', 'Phoenix', 'Atlanta', 'Portland'];
const states = ['TX', 'CO', 'WA', 'FL', 'CA', 'IL', 'MA', 'AZ', 'GA', 'OR'];
const cityCoords: Record<string, { lat: number; lon: number }> = {
  'Austin,TX': { lat: 30.2672, lon: -97.7431 },
  'Denver,CO': { lat: 39.7392, lon: -104.9903 },
  'Seattle,WA': { lat: 47.6062, lon: -122.3321 },
  'Miami,FL': { lat: 25.7617, lon: -80.1918 },
  'San Diego,CA': { lat: 32.7157, lon: -117.1611 },
  'Chicago,IL': { lat: 41.8781, lon: -87.6298 },
  'Boston,MA': { lat: 42.3601, lon: -71.0589 },
  'Phoenix,AZ': { lat: 33.4484, lon: -112.074 },
  'Atlanta,GA': { lat: 33.749, lon: -84.388 },
  'Portland,OR': { lat: 45.5152, lon: -122.6784 },
};

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function generateCourts(count: number): Court[] {
  const courts: Court[] = [];
  for (let i = 0; i < count; i++) {
    const city = randomChoice(cities);
    const state = randomChoice(states);
    const surface = randomChoice(surfaceTypes);
    const indoor = Math.random() < 0.35;
    const lighted = Math.random() < 0.6;
    const numCourts = randomInt(2, 16);
    const name = `${city} ${surface.charAt(0).toUpperCase() + surface.slice(1)} Courts ${i + 1}`;
    const key = `${city},${state}`;
    const coords = cityCoords[key];
    courts.push({
      id: createId('court'),
      name,
      city,
      state,
      surface,
      indoor,
      lighted,
      numCourts,
      lat: coords?.lat,
      lon: coords?.lon,
    });
  }
  return courts;
}

export function generateReviews(courts: Court[], maxPerCourt = 6): Review[] {
  const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Devin', 'Jamie', 'Kris'];
  const comments = [
    'Great surface and well maintained.',
    'Lights are decent for evening play.',
    'Gets crowded on weekends.',
    'Courts could use resurfacing.',
    'Nice community vibe!',
    'Wind can be tricky here.',
    'Ample parking and clean restrooms.',
    'Nets are a bit low.',
    'Love the view around the courts.',
    'Staff is friendly and helpful.',
  ];
  const reviews: Review[] = [];
  for (const court of courts) {
    const count = randomInt(2, maxPerCourt);
    for (let i = 0; i < count; i++) {
      reviews.push({
        id: createId('rev'),
        courtId: court.id,
        author: randomChoice(names),
        rating: randomInt(3, 5) as 3 | 4 | 5,
        comment: randomChoice(comments),
        createdAt: new Date(Date.now() - randomInt(0, 1000 * 60 * 60 * 24 * 365)).toISOString(),
      });
    }
  }
  return reviews;
}

export function loadData(): PersistedData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as PersistedData;
      if (Array.isArray(parsed.courts) && Array.isArray(parsed.reviews)) {
        return parsed;
      }
    } catch {
      // fall through to regeneration
    }
  }
  const courts = generateCourts(60);
  const reviews = generateReviews(courts);
  const data = { courts, reviews };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function saveData(data: PersistedData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


