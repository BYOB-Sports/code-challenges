import type { Court, Review } from '../store/useCourtsStore';

const surfaces: Court['surface'][] = ['Hard','Clay','Grass'];
const cities = [
  { city: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
  { city: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { city: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { city: 'New York', state: 'NY', lat: 40.7128, lng: -74.0060 },
  { city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
];

export function generateSeedData(count = 100) {
  const courts: Court[] = [];
  const reviews: Review[] = [];
  let rid = 1;

  for (let i = 1; i <= count; i++) {
    const city = cities[i % cities.length];
    const surface = surfaces[i % surfaces.length];
    const lights = i % 2 === 0;
    const indoor = i % 3 === 0;
    const courtsCount = 2 + (i % 6);
    const id = `court_${i}`;
    const base: Court = {
      id,
      name: `Court ${i}`,
      city: city.city,
      state: city.state,
      surface,
      lights,
      indoor,
      courtsCount,
      lat: city.lat + (Math.random() - 0.5) * 0.2,
      lng: city.lng + (Math.random() - 0.5) * 0.2,
      avgRating: 0,
      reviewsCount: 0,
    };
    courts.push(base);

    const reviewCount = Math.floor(Math.random() * 20);
    let sum = 0;
    for (let r = 0; r < reviewCount; r++) {
      const rating = 1 + Math.floor(Math.random() * 5);
      sum += rating;
      reviews.push({
        id: `rev_${rid++}`,
        courtId: id,
        user: ['Alex','Sam','Jordan','Riley','Taylor'][(r+i)%5],
        rating,
        comment: ['Great courts','Busy at evenings','Needs resurfacing','Lights are awesome','Friendly staff'][(r+i)%5],
        createdAt: new Date(Date.now() - Math.random()*1000*60*60*24*180).toISOString(),
      });
    }
    if (reviewCount > 0) {
      base.avgRating = parseFloat((sum / reviewCount).toFixed(2));
      base.reviewsCount = reviewCount;
    }
  }
  return { courts, reviews };
}
