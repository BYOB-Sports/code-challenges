import type { Review } from '@/types';

// Helper function to generate realistic dates within the past year
const generateRandomDate = (): string => {
  const now = new Date();
  const pastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const randomTime = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  const dateString = new Date(randomTime).toISOString().split('T')[0];
  return dateString || new Date().toISOString().split('T')[0];
};

// Realistic user names for diversity
const userNames = [
  'Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Thompson', 'Jessica Park',
  'Alex Williams', 'Maria Gonzalez', 'John Smith', 'Lisa Wang', 'Robert Davis',
  'Amanda Lee', 'Kevin Brown', 'Rachel Green', 'Chris Taylor', 'Jennifer Kim',
  'Michael Anderson', 'Sophia Martinez', 'Daniel Wilson', 'Ashley Jones', 'Ryan Miller',
  'Victoria Zhang', 'Brandon White', 'Emma Thompson', 'Jason Lee', 'Olivia Harris',
  'Steven Garcia', 'Madison Clark', 'Tyler Johnson', 'Chloe Martin', 'Adam Wilson'
];

// Review templates for different sentiments and lengths
const positiveReviews = [
  'Absolutely fantastic courts! The grass is perfectly maintained and the facilities are world-class. Staff is incredibly professional and the booking system works seamlessly. Worth every penny!',
  'Amazing experience playing here. The court surface is excellent and the amenities are top-notch. Great coaching staff available too.',
  'Love this place! Clean facilities, well-maintained courts, and great lighting for evening play. Highly recommend!',
  'Outstanding tennis facility with beautiful courts and excellent service. The pro shop has everything you need.',
  'Perfect courts for serious tennis players. Great surface, professional atmosphere, and convenient location.',
  'Excellent facility with modern amenities. The courts are always in great condition and the staff is very helpful.',
  'Great place to play! Courts are well-maintained and the booking system is easy to use.',
  'Beautiful facility with top-quality courts. Really enjoyed my time here.',
  'Fantastic tennis center! Clean, well-organized, and great value for money.',
  'Perfect for both casual and competitive play. Highly recommend to all tennis enthusiasts!'
];

const neutralReviews = [
  'Decent courts, nothing spectacular but gets the job done. Good for regular play and practice sessions.',
  'Good facility overall. Courts are in acceptable condition, though some could use minor improvements.',
  'Average tennis facility. Courts are playable and staff is friendly enough. Fair pricing for the area.',
  'Solid choice for tennis. Not the fanciest facility but reliable and well-located.',
  'Good courts for the price point. Some minor maintenance issues but generally satisfactory.',
  'Acceptable facility with basic amenities. Courts are in decent shape most of the time.',
  'Fair tennis facility. Nothing outstanding but does the job for regular players.',
  'Good enough for casual play. Courts could use some upgrades but overall decent experience.'
];

const negativeReviews = [
  'Courts need significant maintenance. Several cracks and uneven surfaces make play challenging. Staff seems overwhelmed.',
  'Disappointing experience. Courts are poorly maintained and facilities are dated. Expected better for the price.',
  'Not worth the money. Courts are in poor condition and booking system is frustrating to use.',
  'Below average facility. Courts have drainage issues and equipment rental is limited.',
  'Poor maintenance and outdated facilities. Would not recommend to serious tennis players.',
  'Courts are in rough shape and customer service is lacking. Better options available nearby.',
  'Overpriced for what you get. Courts need major improvements and amenities are minimal.'
];

// Generate reviews for specific courts
export const mockReviews: Review[] = [
  // Reviews for Wimbledon Tennis Club (ID: 1) - Premium facility
  {
    id: 'r1-1',
    courtId: '1',
    userId: 'u1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely incredible experience playing on these legendary grass courts! The surface is immaculate and the traditional atmosphere is unmatched. Staff treated us like royalty and every detail was perfect. Expensive but worth every penny for a once-in-a-lifetime tennis experience.',
    date: generateRandomDate(),
    helpfulVotes: 24
  },
  {
    id: 'r1-2',
    courtId: '1',
    userId: 'u2',
    userName: 'David Thompson',
    rating: 5,
    comment: 'Playing here was a dream come true! The grass courts are maintained to perfection and the facilities are world-class. Pro shop has amazing selection and the restaurant is excellent too.',
    date: generateRandomDate(),
    helpfulVotes: 18
  },
  {
    id: 'r1-3',
    courtId: '1',
    userId: 'u3',
    userName: 'Emily Rodriguez',
    rating: 4,
    comment: 'Amazing facility but very expensive. The courts are beautiful and playing here is definitely a special experience. Booking can be challenging during peak season.',
    date: generateRandomDate(),
    helpfulVotes: 12
  },
  {
    id: 'r1-4',
    courtId: '1',
    userId: 'u4',
    userName: 'Mike Chen',
    rating: 5,
    comment: 'Phenomenal courts and service. Every detail is perfect from the moment you arrive. The grass surface is unlike anything else - truly championship quality.',
    date: generateRandomDate(),
    helpfulVotes: 15
  },
  {
    id: 'r1-5',
    courtId: '1',
    userId: 'u5',
    userName: 'Jessica Park',
    rating: 5,
    comment: 'Bucket list experience! The history and prestige of this place is incredible. Courts are maintained to the highest standards possible.',
    date: generateRandomDate(),
    helpfulVotes: 9
  },

  // Reviews for Roland Garros Tennis Academy (ID: 2) - Premium clay courts
  {
    id: 'r2-1',
    courtId: '2',
    userId: 'u6',
    userName: 'Alex Williams',
    rating: 5,
    comment: 'Perfect clay courts! The red clay surface is authentic and plays beautifully. Professional coaching staff and excellent training facilities. This is where champions are made!',
    date: generateRandomDate(),
    helpfulVotes: 31
  },
  {
    id: 'r2-2',
    courtId: '2',
    userId: 'u7',
    userName: 'Maria Gonzalez',
    rating: 5,
    comment: 'Incredible clay courts with professional-level maintenance. The coaching programs are outstanding and the facilities are top-notch.',
    date: generateRandomDate(),
    helpfulVotes: 22
  },
  {
    id: 'r2-3',
    courtId: '2',
    userId: 'u8',
    userName: 'John Smith',
    rating: 4,
    comment: 'Excellent clay courts but can get quite busy during peak times. The surface quality is exceptional and worth the premium price.',
    date: generateRandomDate(),
    helpfulVotes: 16
  },
  {
    id: 'r2-4',
    courtId: '2',
    userId: 'u9',
    userName: 'Lisa Wang',
    rating: 5,
    comment: 'Best clay court experience in Paris! The surface is perfectly prepared and the atmosphere is very professional. Highly recommend for serious players.',
    date: generateRandomDate(),
    helpfulVotes: 19
  },

  // Reviews for Mountain View Tennis Resort (ID: 3) - Luxury mountain resort
  {
    id: 'r3-1',
    courtId: '3',
    userId: 'u10',
    userName: 'Robert Davis',
    rating: 5,
    comment: 'Stunning mountain views and absolutely perfect courts! The high altitude took some getting used to but the experience was unforgettable. Luxury amenities throughout.',
    date: generateRandomDate(),
    helpfulVotes: 28
  },
  {
    id: 'r3-2',
    courtId: '3',
    userId: 'u11',
    userName: 'Amanda Lee',
    rating: 4,
    comment: 'Beautiful resort with excellent tennis facilities. The views are incredible but the price is quite high. Perfect for a special tennis vacation.',
    date: generateRandomDate(),
    helpfulVotes: 14
  },
  {
    id: 'r3-3',
    courtId: '3',
    userId: 'u12',
    userName: 'Kevin Brown',
    rating: 5,
    comment: 'Exceptional tennis resort! The courts are pristine and playing tennis with mountain views is amazing. All the amenities you could want.',
    date: generateRandomDate(),
    helpfulVotes: 21
  },

  // Reviews for Central Park Tennis Center (ID: 6) - Mid-range NYC facility
  {
    id: 'r6-1',
    courtId: '6',
    userId: 'u13',
    userName: 'Rachel Green',
    rating: 4,
    comment: 'Great location in the heart of Manhattan! Courts are well-maintained and the Central Park views are amazing. Can get crowded but booking system works well.',
    date: generateRandomDate(),
    helpfulVotes: 33
  },
  {
    id: 'r6-2',
    courtId: '6',
    userId: 'u14',
    userName: 'Chris Taylor',
    rating: 4,
    comment: 'Love playing here! The courts are in good condition and the location can\'t be beat. Parking can be challenging but worth it for the experience.',
    date: generateRandomDate(),
    helpfulVotes: 17
  },
  {
    id: 'r6-3',
    courtId: '6',
    userId: 'u15',
    userName: 'Jennifer Kim',
    rating: 5,
    comment: 'Fantastic tennis facility right in Central Park! Courts are excellent and the atmosphere is perfect for both casual and competitive play.',
    date: generateRandomDate(),
    helpfulVotes: 25
  },
  {
    id: 'r6-4',
    courtId: '6',
    userId: 'u16',
    userName: 'Michael Anderson',
    rating: 4,
    comment: 'Good courts with a prime location. Sometimes busy but generally well-organized. Great option for NYC tennis.',
    date: generateRandomDate(),
    helpfulVotes: 11
  },
  {
    id: 'r6-5',
    courtId: '6',
    userId: 'u17',
    userName: 'Sophia Martinez',
    rating: 3,
    comment: 'Decent courts but can be quite crowded, especially on weekends. Location is great but expect to pay premium NYC prices.',
    date: generateRandomDate(),
    helpfulVotes: 8
  },

  // Reviews for Sunset Clay Courts (ID: 7) - Mid-range clay courts
  {
    id: 'r7-1',
    courtId: '7',
    userId: 'u18',
    userName: 'Daniel Wilson',
    rating: 4,
    comment: 'Beautiful clay courts with amazing sunset views! The surface is well-maintained and playing here in the evening is magical. Great value for San Diego.',
    date: generateRandomDate(),
    helpfulVotes: 19
  },
  {
    id: 'r7-2',
    courtId: '7',
    userId: 'u19',
    userName: 'Ashley Jones',
    rating: 4,
    comment: 'Love the clay surface and the views are incredible! Courts are generally in good condition though occasionally need some maintenance.',
    date: generateRandomDate(),
    helpfulVotes: 13
  },
  {
    id: 'r7-3',
    courtId: '7',
    userId: 'u20',
    userName: 'Ryan Miller',
    rating: 5,
    comment: 'Perfect spot for evening tennis! The sunset views are breathtaking and the clay courts play really well. Highly recommend for romantic tennis dates!',
    date: generateRandomDate(),
    helpfulVotes: 22
  },
  {
    id: 'r7-4',
    courtId: '7',
    userId: 'u21',
    userName: 'Victoria Zhang',
    rating: 3,
    comment: 'Nice courts with great views but clay maintenance could be better. Some areas get pretty dusty and lines need repainting.',
    date: generateRandomDate(),
    helpfulVotes: 7
  }
];

// Generate additional reviews for other courts
const generateReviewsForCourt = (
  courtId: string,
  numReviews: number,
  avgRating: number
): Review[] => {
  const reviews: Review[] = [];

  for (let i = 0; i < numReviews; i++) {
    const rating = Math.max(1, Math.min(5, Math.round(avgRating + (Math.random() - 0.5) * 2)));
    let comment = '';

    if (rating >= 4) {
      comment = positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
    } else if (rating === 3) {
      comment = neutralReviews[Math.floor(Math.random() * neutralReviews.length)];
    } else {
      comment = negativeReviews[Math.floor(Math.random() * negativeReviews.length)];
    }

    const randomUserName = userNames[Math.floor(Math.random() * userNames.length)] || 'Anonymous User';

    reviews.push({
      id: `r${courtId}-${i + 100}`,
      courtId,
      userId: `u${Math.floor(Math.random() * 100) + 100}`,
      userName: randomUserName,
      rating,
      comment,
      date: generateRandomDate(),
      helpfulVotes: Math.floor(Math.random() * 30)
    });
  }

  return reviews;
};

// Generate additional reviews for more courts
const additionalReviews: Review[] = [
  ...generateReviewsForCourt('4', 8, 4.6), // Miami Beach Tennis Club
  ...generateReviewsForCourt('5', 7, 4.4), // Elite Indoor Tennis Complex
];

export const allReviews = [...mockReviews, ...additionalReviews];
export default allReviews;