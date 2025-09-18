// Mock data for tennis courts
const generateCourts = () => {
  const courtNames = [
    'Central Park Tennis Center', 'Riverside Tennis Club', 'Sunset Courts', 'Golden Gate Tennis',
    'Marina Tennis Center', 'Hillcrest Courts', 'Oakwood Tennis Club', 'Valley View Courts',
    'Lakeside Tennis Center', 'Mountain View Courts', 'Beachside Tennis', 'Garden District Courts',
    'Downtown Tennis Club', 'University Courts', 'Country Club Tennis', 'Metro Tennis Center',
    'Parkside Courts', 'Highland Tennis Club', 'Riverside Courts', 'Sunnyvale Tennis',
    'Westside Tennis Center', 'Eastbrook Courts', 'Northgate Tennis', 'Southside Courts',
    'Pinecrest Tennis Club', 'Maplewood Courts', 'Cedar Hills Tennis', 'Birchwood Courts',
    'Willowbrook Tennis', 'Elmwood Courts', 'Ashford Tennis Club', 'Oakbrook Courts',
    'Pine Valley Tennis', 'Cedar Creek Courts', 'Maple Ridge Tennis', 'Birch Grove Courts',
    'Willow Creek Tennis', 'Elm Grove Courts', 'Ash Grove Tennis', 'Oak Ridge Courts',
    'Pine Grove Tennis', 'Cedar Valley Courts', 'Maple Hill Tennis', 'Birch Valley Courts',
    'Willow Hill Tennis', 'Elm Valley Courts', 'Ash Valley Tennis', 'Oak Valley Courts',
    'Pine Hill Tennis', 'Cedar Grove Courts', 'Maple Valley Tennis', 'Birch Hill Courts'
  ];

  const locations = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
    'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
    'Portland, OR', 'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD',
    'Milwaukee, WI', 'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Sacramento, CA',
    'Mesa, AZ', 'Kansas City, MO', 'Atlanta, GA', 'Long Beach, CA', 'Colorado Springs, CO',
    'Raleigh, NC', 'Miami, FL', 'Virginia Beach, VA', 'Omaha, NE', 'Oakland, CA',
    'Minneapolis, MN', 'Tulsa, OK', 'Arlington, TX', 'Tampa, FL', 'New Orleans, LA'
  ];

  const facilities = [
    'Indoor Courts', 'Outdoor Courts', 'Lighting', 'Parking', 'Pro Shop', 'Locker Rooms',
    'Restrooms', 'Water Fountains', 'Seating', 'Shade Areas', 'Practice Wall', 'Ball Machine'
  ];

  const surfaces = ['Hard Court', 'Clay Court', 'Grass Court', 'Synthetic Grass', 'Carpet'];

  const courts = [];
  
  for (let i = 0; i < 60; i++) {
    const numReviews = Math.floor(Math.random() * 50) + 5;
    const avgRating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
    
    const courtFacilities = facilities
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6) + 4);

    const courtSurfaces = surfaces
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 1);

    const reviews = [];
    for (let j = 0; j < numReviews; j++) {
      const reviewTexts = [
        'Great courts with excellent lighting!',
        'Well-maintained facilities and friendly staff.',
        'Love the clay courts here, very professional.',
        'Good value for money, courts are in great condition.',
        'Amazing location with beautiful views.',
        'Courts could use some maintenance but overall good.',
        'Excellent pro shop and coaching available.',
        'Perfect for both beginners and advanced players.',
        'Clean facilities and easy parking.',
        'Courts are always booked, need more availability.',
        'Great atmosphere and community feel.',
        'Courts are a bit worn but still playable.',
        'Excellent lighting for evening play.',
        'Love the grass courts, very unique in the area.',
        'Staff is very helpful and knowledgeable.',
        'Courts are well-maintained and clean.',
        'Good variety of court surfaces available.',
        'Great location, easy to get to.',
        'Courts are in excellent condition.',
        'Love playing here, highly recommend!'
      ];

      reviews.push({
        id: `${i}-${j}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        author: `Player${j + 1}`,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }

    courts.push({
      id: i + 1,
      name: courtNames[i],
      location: locations[i],
      address: `${Math.floor(Math.random() * 9999) + 100} ${['Main St', 'Oak Ave', 'Pine Rd', 'Cedar Ln', 'Maple Dr'][Math.floor(Math.random() * 5)]}, ${locations[i]}`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      hours: '6:00 AM - 10:00 PM',
      price: `$${Math.floor(Math.random() * 30) + 15}`,
      rating: parseFloat(avgRating),
      reviewCount: numReviews,
      facilities: courtFacilities,
      surfaces: courtSurfaces,
      description: `A premier tennis facility offering ${courtSurfaces.join(' and ')} courts with ${courtFacilities.slice(0, 3).join(', ')}. Perfect for players of all skill levels.`,
      images: [
        `https://picsum.photos/400/300?random=${i * 3}`,
        `https://picsum.photos/400/300?random=${i * 3 + 1}`,
        `https://picsum.photos/400/300?random=${i * 3 + 2}`
      ],
      reviews: reviews
    });
  }

  return courts;
};

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem('courts')) {
    localStorage.setItem('courts', JSON.stringify(generateCourts()));
  }
  
  if (!localStorage.getItem('userReviews')) {
    localStorage.setItem('userReviews', JSON.stringify({}));
  }
};

// Fetch all courts
export const fetchCourts = async () => {
  initializeStorage();
  const courts = JSON.parse(localStorage.getItem('courts') || '[]');
  
  // Ensure all courts have required properties
  return courts.filter(court => 
    court && 
    court.id && 
    court.name && 
    court.location && 
    court.address
  );
};

// Search courts by name or location
export const searchCourts = async (query) => {
  const courts = await fetchCourts();
  if (!query || !query.trim()) return courts;
  
  const lowercaseQuery = query.toLowerCase().trim();
  return courts.filter(court => {
    if (!court) return false;
    
    return (
      (court.name && typeof court.name === 'string' && court.name.toLowerCase().includes(lowercaseQuery)) ||
      (court.location && typeof court.location === 'string' && court.location.toLowerCase().includes(lowercaseQuery)) ||
      (court.address && typeof court.address === 'string' && court.address.toLowerCase().includes(lowercaseQuery))
    );
  });
};

// Get court by ID
export const getCourtById = async (id) => {
  const courts = await fetchCourts();
  return courts.find(court => court.id === parseInt(id));
};

// Submit a review
export const submitReview = async (courtId, rating, reviewText, author, tags = []) => {
  const courts = await fetchCourts();
  const court = courts.find(c => c.id === parseInt(courtId));
  
  if (!court) {
    throw new Error('Court not found');
  }

  const newReview = {
    id: `${courtId}-${Date.now()}`,
    rating: parseFloat(rating),
    text: reviewText,
    author: author || 'Anonymous',
    date: new Date().toISOString().split('T')[0],
    tags: tags || []
  };

  court.reviews.push(newReview);
  
  // Recalculate average rating
  const totalRating = court.reviews.reduce((sum, review) => sum + review.rating, 0);
  court.rating = parseFloat((totalRating / court.reviews.length).toFixed(1));
  court.reviewCount = court.reviews.length;

  // Update localStorage
  localStorage.setItem('courts', JSON.stringify(courts));
  
  return newReview;
};
