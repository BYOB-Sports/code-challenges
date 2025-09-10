const courtPrefixes = [
  'Sunset', 'Maple', 'Blue Lake', 'Highland', 'Greenfield',
  'Riverside', 'Oakwood', 'Silver Pines', 'Willow Creek', 'Brighton',
  'Grandview', 'Shady Grove', 'Cedar Hill', 'Forest Edge', 'Golden Valley',
];

const courtSuffixes = [
  'Tennis Club', 'Tennis Courts', 'Tennis Center', 'Recreation Courts',
  'Racquet Club', 'Park Courts', 'Sports Complex', 'Indoor Courts',
  'Community Courts',
];

function generateCourtName(index: number) {
  const prefix = courtPrefixes[index % courtPrefixes.length];
  const suffix = courtSuffixes[index % courtSuffixes.length];
  return `${prefix} ${suffix}`;
}

export function generateMockCourts(count: number) {
  const locations = [
    'New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Miami, FL', 'Austin, TX',
    'Denver, CO', 'Portland, OR', 'San Diego, CA', 'Atlanta, GA', 'Boston, MA',
  ];

  const courts = [];

  for (let i = 0; i < count; i++) {
    const name = generateCourtName(i);
    const location = locations[i % locations.length];
    const description = `${name} is a well known court in ${location}, offering a great playing experience for locals and visitors. It features excellent maintenance and amenities. This court is perfect for both casual matches and competitive play. Whether you're a beginner or a seasoned player, you'll find everything you need for a great game and workout.`;

    courts.push({
      id: i + 1,
      name,
      location,
      players: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
      description,
      reviews: [],
    });
  }

  return courts;
}
