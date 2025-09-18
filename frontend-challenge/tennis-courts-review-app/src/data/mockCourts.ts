export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  description: string;
}

const generateMockCourts = (): TennisCourt[] => {
  const courts: TennisCourt[] = [];
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville',
    'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville'
  ];

  const courtNames = [
    'Tennis Center', 'Racket Club', 'Courts & More', 'Ace Tennis', 'Grand Slam Courts',
    'Net Results', 'Love All Tennis', 'Court Masters', 'Tennis Pro', 'Rally Point',
    'Service Line', 'Baseline Club', 'Volley Station', 'Smash Courts', 'Deuce Club'
  ];

  const descriptions = [
    'Beautiful outdoor tennis courts with excellent lighting for evening play.',
    'Professional-grade indoor courts with climate control and premium amenities.',
    'Well-maintained courts in a scenic park setting with modern facilities.',
    'Top-quality tennis facility with experienced staff and coaching services.',
    'Premier tennis club featuring multiple court surfaces and comprehensive services.',
    'Community tennis center with accessible courts and friendly atmosphere.',
    'Elite tennis facility with tournament-quality courts and professional coaching.',
    'Family-friendly tennis courts with excellent maintenance and safety features.',
    'Modern tennis complex with state-of-the-art equipment and comfortable seating.',
    'Historic tennis club with classic courts and traditional tennis atmosphere.'
  ];

  for (let i = 1; i <= 60; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const name = courtNames[Math.floor(Math.random() * courtNames.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    courts.push({
      id: `court-${i}`,
      name: `${name} ${city}`,
      location: `${Math.floor(Math.random() * 9999) + 1} Tennis Ave`,
      city,
      state: 'CA',
      rating: Math.round((Math.random() * 3 + 2) * 10) / 10, // Rating between 2.0 and 5.0
      description
    });
  }

  return courts.sort((a, b) => b.rating - a.rating);
};

export const mockCourts = generateMockCourts();
