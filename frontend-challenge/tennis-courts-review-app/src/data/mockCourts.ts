export interface CourtReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  description: string;
  reviews: CourtReview[];
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

  const reviewComments = [
    'Excellent courts! Very well maintained and the staff is friendly. Great lighting for evening games.',
    'Good quality courts with decent amenities. Parking can be a bit tight during peak hours.',
    'Love playing here! The courts are always in perfect condition and the location is convenient.',
    'Courts are okay but could use better maintenance. The surface has some wear in certain areas.',
    'Great facility overall. Good value for money and the booking system is easy to use.',
    'Amazing experience! The facilities are top-notch and the staff is very helpful.',
    'Good courts but the lighting could be better. Overall decent place to play tennis.',
    'Fantastic tennis facility with excellent court conditions and friendly atmosphere.',
    'Courts are well-maintained and the location is perfect. Highly recommend this place.',
    'Decent courts with good amenities. The booking process is straightforward and efficient.'
  ];

  const userNames = [
    'Sarah M.', 'Mike Johnson', 'Emma Davis', 'Alex Chen', 'Lisa Wilson',
    'David Brown', 'Maria Garcia', 'John Smith', 'Anna Lee', 'Tom Wilson',
    'Jennifer Kim', 'Robert Taylor', 'Michelle White', 'Kevin Martinez', 'Rachel Green'
  ];

  for (let i = 1; i <= 60; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const name = courtNames[Math.floor(Math.random() * courtNames.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Generate reviews for this court
    const reviews: CourtReview[] = [];
    const reviewCount = Math.floor(Math.random() * 8) + 3; // 3-10 reviews per court
    
    for (let j = 0; j < reviewCount; j++) {
      const reviewRating = Math.floor(Math.random() * 5) + 1;
      const reviewComment = reviewComments[Math.floor(Math.random() * reviewComments.length)];
      const userName = userNames[Math.floor(Math.random() * userNames.length)];
      
      reviews.push({
        id: `review-${i}-${j}`,
        userName,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        helpful: Math.floor(Math.random() * 20)
      });
    }
    
    // Calculate average rating from reviews
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    courts.push({
      id: `court-${i}`,
      name: `${name} ${city}`,
      location: `${Math.floor(Math.random() * 9999) + 1} Tennis Ave`,
      city,
      state: 'CA',
      rating: Math.round(avgRating * 10) / 10,
      description,
      reviews
    });
  }

  return courts.sort((a, b) => b.rating - a.rating);
};

export const mockCourts = generateMockCourts();
