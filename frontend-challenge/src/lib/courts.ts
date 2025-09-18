import type { Court } from './types';

export const courts: Court[] = Array.from({ length: 53 }, (_, i) => {
  const id = i + 1;
  const reviewCount = Math.floor(Math.random() * 15) + 1;
  const reviews = Array.from({ length: reviewCount }, (_, j) => {
    const rating = Math.floor(Math.random() * 3) + 3; // 3 to 5 stars
    return {
      id: `${id}-${j}`,
      author: `Player ${id * 10 + j}`,
      avatar: `https://i.pravatar.cc/40?u=player${id * 10 + j}`,
      rating,
      title: j % 2 === 0 ? `Great courts!` : `Decent place to play`,
      text: `This is a sample review. The facilities were ${rating > 3 ? 'excellent' : 'okay'}. I would ${rating > 3 ? 'definitely' : 'probably'} play here again.`,
      date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(),
    };
  });

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  const courtNames = [
    'Willow Creek Tennis Center', 'Oakmont Racquet Club', 'Maplewood Courts', 'Sunset Hills Tennis', 'Riverbend Sports Complex',
    'Pine Ridge Tennis', 'Eastwood Park Courts', 'Northgate Tennis Center', 'Bayview Racquet Club', 'Liberty Park Tennis',
    'Greenfield Tennis Association', 'Central Park Tennis Courts', 'Lakeside Tennis', 'Highlands Racquet Club', 'Westwood Tennis Center',
    'Fairview Tennis', 'Southside Sports Complex', 'Bridgewater Tennis Club', 'The Racquet Club of Springfield', 'Millennium Park Courts',
    'Crestview Tennis', 'Rose Garden Tennis', 'The Tennis Hub', 'Downtown Tennis Center', 'Uptown Racquet Club',
    'Victory Park Tennis', 'Championship Courts', 'The Tennis Academy', 'Public Courts on Main', 'Community Tennis Center',
    'The Tennis Spot', 'Ace Play Tennis', 'Serve & Volley Club', 'Match Point Center', 'Grand Slam Tennis',
    'Tennis World', 'Pro Level Courts', 'The Tennis Grounds', 'City Sports Tennis', 'The Court Yard',
    'Smashville Tennis', 'Topspin Tennis Center', 'The Baseline Club', 'Crosscourt Tennis', 'Advantage Tennis',
    'The Net Post', 'Rally Point Racquet Club', 'Deuce Tennis Center', 'Love-40 Tennis', 'The Clay Courts',
    'Hardcourt Heaven', 'The Tennis Dome', 'All-Weather Tennis'
  ];
  const courtAddresses = [
    '123 Willow Ln', '456 Oak Ave', '789 Maple Dr', '101 Sunset Blvd', '212 River Rd',
    '333 Pine St', '444 East St', '555 Northgate Way', '666 Bayview Pt', '777 Liberty Ave',
    '888 Greenfield Dr', '999 Central Pkwy', '111 Lakeside Blvd', '222 Highlands Rd', '333 Westwood Ave',
    '444 Fairview Pkwy', '555 Southside Dr', '666 Bridgewater Ln', '777 Springfield Ave', '888 Millennium Blvd',
    '999 Crestview Dr', '100 Rose St', '200 Hub Pkwy', '300 Main St', '400 Uptown Ave',
    '500 Victory Rd', '600 Championship Way', '700 Academy Dr', '800 Public Sq', '900 Community Cir',
    '10 Spot Rd', '20 Ace Ave', '30 Serve St', '40 Match Pt', '50 Grand Slam Way',
    '60 World Dr', '70 Pro Level Ct', '80 Grounds Rd', '90 City Sports Blvd', '100 Yard Ln',
    '110 Smashville Dr', '120 Topspin Ave', '130 Baseline Rd', '140 Crosscourt St', '150 Advantage Way',
    '160 Net Post Pkwy', '170 Rally Point Dr', '180 Deuce Ct', '190 Love-40 Ln', '200 Clay Ct Rd',
    '210 Hardcourt Dr', '220 Dome Pkwy', '230 All-Weather Way'
  ];


  return {
    id: `${id}`,
    name: `${courtNames[i % courtNames.length]}`,
    address: `${id * 100} ${courtAddresses[i % courtAddresses.length]}, Tennisville, USA`,
    images: [`court-${id}-img-1`, `court-${id}-img-2`, `court-${id}-img-3`],
    reviews,
    rating: averageRating,
  };
});

export const getCourts = async ({ page = 1, limit = 10 } = {}): Promise<{courts: Court[], hasMore: boolean}> => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedCourts = courts.slice(start, end);
  const hasMore = end < courts.length;
  return { courts: paginatedCourts, hasMore };
};

export const getAllCourts = async (): Promise<Court[]> => {
  return courts;
};

export const getCourtById = async (id: string): Promise<Court | undefined> => {
  return courts.find(court => court.id === id);
};
