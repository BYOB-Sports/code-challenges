// Mock >50 courts for the UI challenge
// Fields: id, name, city, state, surface, isIndoor, hasLights, courtsCount

const cities = [
  { city: 'Austin', state: 'TX' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Houston', state: 'TX' },
  { city: 'San Antonio', state: 'TX' },
  { city: 'Miami', state: 'FL' },
  { city: 'Orlando', state: 'FL' },
  { city: 'Tampa', state: 'FL' },
  { city: 'Jacksonville', state: 'FL' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Savannah', state: 'GA' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Memphis', state: 'TN' },
  { city: 'Raleigh', state: 'NC' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'Charleston', state: 'SC' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Scottsdale', state: 'AZ' },
  { city: 'Tucson', state: 'AZ' },
  { city: 'Denver', state: 'CO' },
  { city: 'Boulder', state: 'CO' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'San Diego', state: 'CA' },
  { city: 'San Jose', state: 'CA' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Sacramento', state: 'CA' },
  { city: 'Portland', state: 'OR' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Spokane', state: 'WA' },
  { city: 'New York', state: 'NY' },
  { city: 'Brooklyn', state: 'NY' },
  { city: 'Queens', state: 'NY' },
  { city: 'Buffalo', state: 'NY' },
  { city: 'Rochester', state: 'NY' },
  { city: 'Boston', state: 'MA' },
  { city: 'Cambridge', state: 'MA' },
  { city: 'Philadelphia', state: 'PA' },
  { city: 'Pittsburgh', state: 'PA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Evanston', state: 'IL' },
  { city: 'Madison', state: 'WI' },
  { city: 'Minneapolis', state: 'MN' },
  { city: 'Detroit', state: 'MI' },
  { city: 'Ann Arbor', state: 'MI' },
  { city: 'Columbus', state: 'OH' },
  { city: 'Cleveland', state: 'OH' },
  { city: 'Indianapolis', state: 'IN' },
  { city: 'Louisville', state: 'KY' },
  { city: 'New Orleans', state: 'LA' },
  { city: 'Baton Rouge', state: 'LA' },
  { city: 'Albuquerque', state: 'NM' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'Reno', state: 'NV' },
  { city: 'Boise', state: 'ID' },
  { city: 'Salt Lake City', state: 'UT' },
  { city: 'Provo', state: 'UT' }
];

const surfaces = ['Hard', 'Clay', 'Grass'];

const courts = Array.from({ length: 60 }).map((_, index) => {
  const loc = cities[index % cities.length];
  const surface = surfaces[index % surfaces.length];
  const id = String(index + 1);
  return {
    id,
    name: `${loc.city} ${surface} Courts #${index + 1}`,
    city: loc.city,
    state: loc.state,
    surface,
    isIndoor: index % 4 === 0,
    hasLights: index % 3 !== 0,
    courtsCount: 4 + (index % 8)
  };
});

export default courts;


