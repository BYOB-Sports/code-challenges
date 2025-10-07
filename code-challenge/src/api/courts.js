// Mock dataset of tennis/pickleball courts
// At least 60 courts to enable scalable list UX

const surfaces = ['Hard', 'Clay', 'Grass', 'Acrylic'];
const cities = [
  'San Francisco, CA',
  'San Jose, CA',
  'Oakland, CA',
  'Palo Alto, CA',
  'Mountain View, CA',
  'Los Angeles, CA',
  'San Diego, CA',
  'Sacramento, CA',
  'Portland, OR',
  'Seattle, WA',
  'Austin, TX',
  'Dallas, TX',
  'Houston, TX',
  'New York, NY',
  'Brooklyn, NY',
  'Boston, MA',
  'Chicago, IL',
  'Denver, CO',
  'Phoenix, AZ',
  'Miami, FL'
];

const generateCourts = (count = 64) => {
  const courts = [];
  for (let i = 1; i <= count; i++) {
    const city = cities[i % cities.length];
    const surface = surfaces[i % surfaces.length];
    const hasLights = i % 3 !== 0;
    const isIndoor = i % 7 === 0;
    const rating = Number(((i % 50) / 10 + 2.5).toFixed(1)); // 2.5 - 7.4
    courts.push({
      id: String(i),
      name: `Court ${i} - ${city.split(',')[0]} ${surface}`,
      city,
      surface,
      hasLights,
      isIndoor,
      rating: Math.min(5, Math.max(1, Number((rating % 5).toFixed(1)))),
      address: `${100 + i} Main St, ${city}`,
      
    });
  }
  return courts;
};

export const courts = generateCourts(72);

export default courts;


