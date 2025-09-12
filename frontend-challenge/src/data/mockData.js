const surfaces = ['Hard', 'Clay', 'Grass', 'Synthetic'];
const amenities = [
  'Lighting', 'Parking', 'Restrooms', 'Water Fountain', 'Seating', 
  'Pro Shop', 'Locker Rooms', 'Ball Machine', 'Court Reservations', 
  'Equipment Rental', 'Lessons Available', 'Tournament Ready'
];

const nycLocations = [
  'Central Park, Manhattan', 'Bryant Park, Manhattan', 'Riverside Park, Manhattan',
  'Washington Square Park, Manhattan', 'Battery Park, Manhattan', 'Chelsea Piers, Manhattan',
  'Prospect Park, Brooklyn', 'Brooklyn Bridge Park, Brooklyn', 'McCarren Park, Brooklyn',
  'Sunset Park, Brooklyn', 'Marine Park, Brooklyn', 'Flushing Meadows, Queens',
  'Forest Hills, Queens', 'Astoria Park, Queens', 'Kissena Park, Queens',
  'Corona Park, Queens', 'Van Cortlandt Park, Bronx', 'Bronx River Park, Bronx',
  'Pelham Bay Park, Bronx', 'Crotona Park, Bronx', 'Silver Lake Park, Staten Island',
  'Great Kills Park, Staten Island', 'Wolfe\'s Pond Park, Staten Island',
  'Long Island City, Queens', 'DUMBO, Brooklyn', 'Williamsburg, Brooklyn',
  'Park Slope, Brooklyn', 'Red Hook, Brooklyn', 'Greenpoint, Brooklyn',
  'Upper East Side, Manhattan', 'Upper West Side, Manhattan', 'Midtown, Manhattan',
  'Lower East Side, Manhattan', 'SoHo, Manhattan', 'TriBeCa, Manhattan'
];

const courtNames = [
  'Tennis Center', 'Court Complex', 'Tennis Club', 'Sports Center', 
  'Recreation Center', 'Athletic Club', 'Tennis Academy', 'Courts', 
  'Tennis Facility', 'Sport Complex', 'Community Center', 'Tennis Courts',
  'Premier Tennis', 'Elite Courts', 'Championship Courts', 'Pro Tennis',
  'Tennis Village', 'Court Club', 'Tennis Haven', 'Grand Slam Courts'
];

const descriptions = [
  'Professional-grade tennis facility with excellent maintenance and modern amenities.',
  'Beautiful outdoor courts with stunning city views and top-notch facilities.',
  'Well-maintained courts perfect for players of all skill levels.',
  'Premium tennis facility featuring state-of-the-art surfaces and equipment.',
  'Family-friendly tennis center with courts suitable for beginners and pros.',
  'Historic tennis club offering traditional clay court experience.',
  'Modern facility with advanced lighting systems for night play.',
  'Community tennis center promoting local tennis development.',
  'Championship-quality courts hosting regular tournaments.',
  'Scenic tennis facility surrounded by beautiful park landscapes.',
  'Indoor/outdoor complex offering year-round tennis opportunities.',
  'Newly renovated courts with updated amenities and surfaces.'
];

const tennisCourtImages = [
  'https://images.unsplash.com/photo-1499510318569-1a3d67dc3976?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1666913667082-c1fecc45275d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVubmlzfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1666913667023-4bfd0f6cff0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1663045882560-3bdd5f71687c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1510846699902-9211b99dac11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1673995612732-7fabfa1df486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1664304182983-ebc71c4b200d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1632755898125-36cd72575dde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661607626631-edbff6804ae6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1569597773147-690dfdc3bb4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1614743758466-e569f4791116?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1637071692126-d0ee7df18271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D'

];

const generateRandomCourts = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const location = nycLocations[i % nycLocations.length];
    const namePrefix = courtNames[Math.floor(Math.random() * courtNames.length)];
    const locationShort = location.split(',')[0];
    
    return {
      id: `court-${i + 1}`,
      name: `${locationShort} ${namePrefix}`,
      location: location,
      surface: surfaces[Math.floor(Math.random() * surfaces.length)],
      price: Math.floor(Math.random() * 50) + 15,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 150) + 10,
      image: tennisCourtImages[i % tennisCourtImages.length],
      amenities: amenities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 6) + 3),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      coordinates: {
        lat: 40.7128 + (Math.random() - 0.5) * 0.15,
        lng: -74.0060 + (Math.random() - 0.5) * 0.15
      }
    };
  });
};

const reviewComments = [
  'Excellent courts with great maintenance! Highly recommend.',
  'Perfect for weekend games with friends. Clean facilities.',
  'Amazing lighting for evening matches. Staff is very helpful.',
  'Well-maintained surface and good parking availability.',
  'Great value for money. Courts are always in good condition.',
  'Beautiful location with nice views. Equipment rental available.',
  'Professional-quality courts. Perfect for serious players.',
  'Family-friendly environment with courts for all skill levels.',
  'Could use better restroom facilities, but courts are excellent.',
  'Outstanding tennis facility with top-notch amenities.',
  'Regular tournaments held here. Very competitive atmosphere.',
  'Good for beginners with patient and helpful staff.',
  'Courts book up quickly due to high demand. Worth the wait!',
  'Fantastic clay courts that are properly maintained.',
  'Great community feel and reasonable pricing.',
  'Modern facility with all the amenities you could want.',
  'Perfect courts for lessons and practice sessions.',
  'Excellent pro shop with quality equipment and gear.',
  'Beautiful park setting makes for enjoyable tennis.',
  'Courts are challenging but fair for intermediate players.'
];

const playerNames = [
  'TennisAce', 'CourtKing', 'NetMaster', 'ServeQueen', 'VolleyPro',
  'BaselineBeast', 'TopsSpinner', 'SliceNinja', 'PowerPlayer', 'TouchArtist',
  'GameSetMatch', 'RacketRanger', 'CourtCrusher', 'TennisTrainer', 'MatchPoint',
  'ForehandFury', 'BackhandBoss', 'NetRusher', 'LobMaster', 'DropShotKing'
];

export const mockCourts = generateRandomCourts(62);

export const mockReviews = mockCourts.flatMap(court => 
  Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
    id: `review-${court.id}-${i}`,
    courtId: court.id,
    userName: playerNames[Math.floor(Math.random() * playerNames.length)] + Math.floor(Math.random() * 999),
    rating: Math.floor(Math.random() * 5) + 1,
    comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: Math.floor(Math.random() * 25)
  }))
);
