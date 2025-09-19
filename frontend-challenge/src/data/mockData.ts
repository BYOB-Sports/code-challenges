/**
 * Mock Data for Tennis Court Reviewer App
 * 
 * This file contains all mock data used throughout the application.
 * It includes tennis courts, reviews, and other sample data for development and testing.
 * 
 * Data Structure:
 * - Courts: 52 tennis courts with comprehensive details
 * - Reviews: Sample reviews for demonstration
 * - Tags: Various court features and amenities
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Tennis Court data structure
 */
export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  price: string;
}

/**
 * Review data structure
 */
export interface Review {
  id: string;
  courtId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

// ============================================================================
// MOCK TENNIS COURTS DATA
// ============================================================================

/**
 * Comprehensive list of 52 tennis courts across New York City
 * Includes diverse locations, court types, pricing, and amenities
 * 
 * Court Types:
 * - Outdoor: Hard courts, Clay courts
 * - Indoor: Climate-controlled facilities
 * - Public: Free or low-cost access
 * - Private: Membership-based or premium facilities
 * 
 * Features:
 * - Lighting for evening play
 * - Parking availability
 * - Locker rooms and amenities
 * - Lessons and coaching
 * - Tournament-ready facilities
 */
export const mockCourts: TennisCourt[] = [
  // Manhattan Courts
  {
    id: '1',
    name: 'Central Park Tennis Center',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.5,
    reviewCount: 127,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted'],
    price: '$25/hour',
  },
  {
    id: '2',
    name: 'Manhattan Indoor Courts',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.2,
    reviewCount: 89,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned'],
    price: '$45/hour',
  },
  {
    id: '3',
    name: 'Brooklyn Clay Courts',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.7,
    reviewCount: 203,
    tags: ['Outdoor', 'Clay', 'Public', 'Tournament Ready'],
    price: '$30/hour',
  },
  {
    id: '4',
    name: 'Queens Tennis Academy',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.3,
    reviewCount: 156,
    tags: ['Indoor', 'Hard Court', 'Membership Required', 'Lessons Available'],
    price: 'Membership Required',
  },
  {
    id: '5',
    name: 'Riverside Park Courts',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.1,
    reviewCount: 98,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$20/hour',
  },
  {
    id: '6',
    name: 'Bronx Tennis Complex',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.4,
    reviewCount: 134,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$28/hour',
  },
  {
    id: '7',
    name: 'Staten Island Courts',
    location: 'Staten Island, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.0,
    reviewCount: 67,
    tags: ['Outdoor', 'Hard Court', 'Public'],
    price: '$22/hour',
  },
  {
    id: '8',
    name: 'West Side Tennis Club',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.8,
    reviewCount: 245,
    tags: ['Outdoor', 'Clay', 'Private', 'Tournament Ready', 'Locker Rooms'],
    price: '$65/hour',
  },
  {
    id: '9',
    name: 'East Village Courts',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.9,
    reviewCount: 89,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$18/hour',
  },
  {
    id: '10',
    name: 'Hudson River Park Courts',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.2,
    reviewCount: 112,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted', 'Parking'],
    price: '$32/hour',
  },
  {
    id: '11',
    name: 'Prospect Park Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.3,
    reviewCount: 178,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Beginner Friendly'],
    price: '$26/hour',
  },
  {
    id: '12',
    name: 'Flushing Meadows Courts',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.6,
    reviewCount: 198,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Tournament Ready', 'Lighted'],
    price: '$35/hour',
  },
  {
    id: '13',
    name: 'Greenpoint Tennis Club',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.1,
    reviewCount: 145,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Locker Rooms'],
    price: '$55/hour',
  },
  {
    id: '14',
    name: 'Astoria Park Courts',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.0,
    reviewCount: 123,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$24/hour',
  },
  {
    id: '15',
    name: 'Park Slope Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.4,
    reviewCount: 134,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted'],
    price: '$22/hour',
  },
  {
    id: '16',
    name: 'Chelsea Piers Tennis',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.7,
    reviewCount: 234,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Locker Rooms', 'Lessons Available'],
    price: '$75/hour',
  },
  {
    id: '17',
    name: 'Forest Hills Tennis Club',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.5,
    reviewCount: 189,
    tags: ['Outdoor', 'Clay', 'Private', 'Tournament Ready', 'Parking'],
    price: '$60/hour',
  },
  {
    id: '18',
    name: 'Battery Park Courts',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.1,
    reviewCount: 156,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted'],
    price: '$30/hour',
  },
  {
    id: '19',
    name: 'Sunset Park Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 3.8,
    reviewCount: 98,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$20/hour',
  },
  {
    id: '20',
    name: 'Pelham Bay Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.2,
    reviewCount: 134,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$28/hour',
  },
  {
    id: '21',
    name: 'Randall\'s Island Courts',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.3,
    reviewCount: 167,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Tournament Ready', 'Lighted'],
    price: '$35/hour',
  },
  {
    id: '22',
    name: 'Coney Island Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 3.9,
    reviewCount: 112,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$22/hour',
  },
  {
    id: '23',
    name: 'Jamaica Bay Courts',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.0,
    reviewCount: 89,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted'],
    price: '$26/hour',
  },
  {
    id: '24',
    name: 'Van Cortlandt Park Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.1,
    reviewCount: 145,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Parking', 'Beginner Friendly'],
    price: '$25/hour',
  },
  {
    id: '25',
    name: 'Marine Park Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.2,
    reviewCount: 123,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$28/hour',
  },
  {
    id: '26',
    name: 'Alley Pond Tennis',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 3.9,
    reviewCount: 78,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$23/hour',
  },
  {
    id: '27',
    name: 'Crotona Park Courts',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.7,
    reviewCount: 95,
    tags: ['Outdoor', 'Hard Court', 'Public'],
    price: '$20/hour',
  },
  {
    id: '28',
    name: 'Fort Greene Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.0,
    reviewCount: 134,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Beginner Friendly'],
    price: '$27/hour',
  },
  {
    id: '29',
    name: 'Kissena Park Courts',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.1,
    reviewCount: 156,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Tournament Ready'],
    price: '$30/hour',
  },
  {
    id: '30',
    name: 'Orchard Beach Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.8,
    reviewCount: 87,
    tags: ['Outdoor', 'Clay', 'Public', 'Beginner Friendly'],
    price: '$24/hour',
  },
  {
    id: '31',
    name: 'Red Hook Tennis Club',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.4,
    reviewCount: 178,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Lessons Available'],
    price: '$52/hour',
  },
  {
    id: '32',
    name: 'Fresh Meadows Tennis',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.2,
    reviewCount: 145,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$29/hour',
  },
  {
    id: '33',
    name: 'Soundview Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.9,
    reviewCount: 112,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$21/hour',
  },
  {
    id: '34',
    name: 'Dyker Beach Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.0,
    reviewCount: 134,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$26/hour',
  },
  {
    id: '35',
    name: 'Bayside Tennis Club',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.5,
    reviewCount: 198,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Locker Rooms', 'Lessons Available'],
    price: '$58/hour',
  },
  {
    id: '36',
    name: 'Pelham Tennis Center',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.3,
    reviewCount: 167,
    tags: ['Outdoor', 'Clay', 'Public', 'Tournament Ready', 'Lighted'],
    price: '$32/hour',
  },
  {
    id: '37',
    name: 'Sheepshead Bay Courts',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 3.8,
    reviewCount: 98,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$22/hour',
  },
  {
    id: '38',
    name: 'Flushing Tennis Center',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.4,
    reviewCount: 189,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Lessons Available'],
    price: '$55/hour',
  },
  {
    id: '39',
    name: 'Throgs Neck Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.9,
    reviewCount: 123,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$27/hour',
  },
  {
    id: '40',
    name: 'Canarsie Tennis Club',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.1,
    reviewCount: 145,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted', 'Beginner Friendly'],
    price: '$25/hour',
  },
  {
    id: '41',
    name: 'College Point Tennis',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.0,
    reviewCount: 134,
    tags: ['Outdoor', 'Clay', 'Public', 'Tournament Ready'],
    price: '$28/hour',
  },
  {
    id: '42',
    name: 'Castle Hill Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.7,
    reviewCount: 89,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$19/hour',
  },
  {
    id: '43',
    name: 'Bensonhurst Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.2,
    reviewCount: 156,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$29/hour',
  },
  {
    id: '44',
    name: 'Whitestone Tennis Club',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.3,
    reviewCount: 178,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Locker Rooms'],
    price: '$50/hour',
  },
  {
    id: '45',
    name: 'Co-op City Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 4.1,
    reviewCount: 145,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted', 'Parking'],
    price: '$26/hour',
  },
  {
    id: '46',
    name: 'Bay Ridge Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.0,
    reviewCount: 134,
    tags: ['Outdoor', 'Clay', 'Public', 'Beginner Friendly'],
    price: '$24/hour',
  },
  {
    id: '47',
    name: 'Corona Tennis Center',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.4,
    reviewCount: 189,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Lessons Available', 'Locker Rooms'],
    price: '$62/hour',
  },
  {
    id: '48',
    name: 'Parkchester Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.8,
    reviewCount: 112,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Lighted'],
    price: '$23/hour',
  },
  {
    id: '49',
    name: 'Flatbush Tennis Club',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.2,
    reviewCount: 167,
    tags: ['Outdoor', 'Clay', 'Public', 'Tournament Ready', 'Lighted', 'Parking'],
    price: '$31/hour',
  },
  {
    id: '50',
    name: 'Jamaica Tennis Academy',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.5,
    reviewCount: 203,
    tags: ['Indoor', 'Hard Court', 'Private', 'Air Conditioned', 'Lessons Available', 'Locker Rooms', 'Advanced'],
    price: '$68/hour',
  },
  {
    id: '51',
    name: 'Mott Haven Tennis',
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    rating: 3.9,
    reviewCount: 123,
    tags: ['Outdoor', 'Hard Court', 'Public', 'Beginner Friendly'],
    price: '$21/hour',
  },
  {
    id: '52',
    name: 'Crown Heights Tennis',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    rating: 4.1,
    reviewCount: 145,
    tags: ['Outdoor', 'Clay', 'Public', 'Lighted', 'Parking'],
    price: '$27/hour',
  }
];

// ============================================================================
// MOCK REVIEWS DATA
// ============================================================================

/**
 * Sample reviews for demonstration purposes
 * Includes various ratings, comments, and user interactions
 * 
 * Review Features:
 * - Star ratings (1-5)
 * - Written comments
 * - User names and dates
 * - Helpful votes
 * - Court-specific reviews
 */
export const mockReviews: Review[] = [
  {
    id: '1',
    courtId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing courts! The lighting is perfect for evening games. Staff is very friendly and helpful.',
    date: '2024-01-15',
    helpful: 12
  },
  {
    id: '2',
    courtId: '1',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great location and well-maintained courts. Can get busy during peak hours.',
    date: '2024-01-10',
    helpful: 8
  },
  {
    id: '3',
    courtId: '2',
    userName: 'Emily Rodriguez',
    rating: 5,
    comment: 'Premium facility with excellent amenities. Worth the price for serious players.',
    date: '2024-01-12',
    helpful: 15
  },
  {
    id: '4',
    courtId: '3',
    userName: 'David Kim',
    rating: 4,
    comment: 'Love the clay courts here. Great for improving your game and the staff is knowledgeable.',
    date: '2024-01-08',
    helpful: 6
  },
  {
    id: '5',
    courtId: '4',
    userName: 'Lisa Wang',
    rating: 3,
    comment: 'Good facilities but membership is quite expensive. Courts are well-maintained though.',
    date: '2024-01-05',
    helpful: 4
  },
  {
    id: '6',
    courtId: '5',
    userName: 'James Wilson',
    rating: 4,
    comment: 'Perfect for beginners. The courts are clean and the atmosphere is welcoming.',
    date: '2024-01-03',
    helpful: 9
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all unique tags from all courts
 * Useful for filter options and tag management
 */
export const getAllTags = (): string[] => {
  const allTags = mockCourts.flatMap(court => court.tags);
  return [...new Set(allTags)].sort();
};

/**
 * Get courts by specific tag
 * @param tag - The tag to filter by
 * @returns Array of courts that have the specified tag
 */
export const getCourtsByTag = (tag: string): TennisCourt[] => {
  return mockCourts.filter(court => court.tags.includes(tag));
};

/**
 * Get reviews for a specific court
 * @param courtId - The ID of the court
 * @returns Array of reviews for the specified court
 */
export const getReviewsByCourtId = (courtId: string): Review[] => {
  return mockReviews.filter(review => review.courtId === courtId);
};

/**
 * Get average rating for a court
 * @param courtId - The ID of the court
 * @returns Average rating (0-5) or 0 if no reviews
 */
export const getAverageRating = (courtId: string): number => {
  const courtReviews = getReviewsByCourtId(courtId);
  if (courtReviews.length === 0) return 0;
  
  const totalRating = courtReviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / courtReviews.length;
};