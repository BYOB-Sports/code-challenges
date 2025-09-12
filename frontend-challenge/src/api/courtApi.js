// Mock tennis court data with 50+ courts
const generateMockCourts = () => {
  const courtTypes = ['Hard Court', 'Clay Court', 'Grass Court', 'Synthetic Grass', 'Indoor Court'];
  const facilities = ['Lighting', 'Parking', 'Restrooms', 'Water Fountain', 'Seating', 'Pro Shop', 'Cafe', 'Locker Rooms', 'WiFi', 'Air Conditioning', 'Heating', 'Sound System'];
  const locations = [
    'Central Park Tennis Center', 'Riverside Tennis Club', 'Downtown Sports Complex',
    'Westside Tennis Academy', 'Eastside Community Courts', 'Northside Tennis Center',
    'Southside Recreation Center', 'Hillside Tennis Club', 'Valley View Courts',
    'Mountain View Tennis', 'Sunset Tennis Center', 'Sunrise Courts',
    'Golden Gate Tennis Club', 'Bay Area Tennis Center', 'Coastal Tennis Club',
    'Forest Hills Tennis', 'Oakwood Tennis Center', 'Pine Valley Courts',
    'Cedar Park Tennis', 'Maple Street Courts', 'Elmwood Tennis Club',
    'Rosewood Tennis Center', 'Lily Court Tennis', 'Tulip Tennis Club',
    'Garden District Courts', 'Meadowbrook Tennis', 'Brookside Tennis Center',
    'Riverside Park Courts', 'Lakeside Tennis Club', 'Pondview Tennis',
    'Oceanview Tennis Center', 'Seaside Courts', 'Harbor Tennis Club',
    'Marina Tennis Center', 'Portside Courts', 'Dockside Tennis',
    'Uptown Tennis Club', 'Midtown Courts', 'Downtown Tennis Center',
    'Historic District Courts', 'Old Town Tennis', 'Heritage Tennis Club',
    'Victory Tennis Center', 'Championship Courts', 'Elite Tennis Club',
    'Premier Tennis Center', 'Royal Tennis Club', 'Crown Courts',
    'Diamond Tennis Center', 'Emerald Courts', 'Sapphire Tennis Club',
    'Crystal Tennis Center', 'Pearl Courts', 'Ruby Tennis Club',
    'Gold Tennis Center', 'Silver Courts', 'Bronze Tennis Club',
    'Platinum Tennis Center', 'Titanium Courts', 'Steel Tennis Club'
  ];

  const generateRandomReviews = (courtId) => {
    const reviewCount = Math.floor(Math.random() * 15) + 5; // 5-20 reviews
    const reviews = [];
    
    for (let i = 0; i < reviewCount; i++) {
      const ratings = [1, 2, 3, 4, 5];
      const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
      
      const reviewTexts = [
        "Great court conditions, well maintained!",
        "Excellent lighting for evening play.",
        "Court surface is in perfect condition.",
        "Friendly staff and clean facilities.",
        "Amazing location with beautiful views.",
        "Court was a bit slippery after rain.",
        "Good value for the price.",
        "Convenient parking and easy access.",
        "Court needs some maintenance work.",
        "Love playing here regularly!",
        "Great for both beginners and advanced players.",
        "Clean restrooms and good amenities.",
        "Court surface could be better.",
        "Excellent pro shop with quality equipment.",
        "Beautiful setting, highly recommended!",
        "Court was busy but well organized.",
        "Good lighting for night matches.",
        "Court condition was average.",
        "Amazing tennis community here!",
        "Court needs resurfacing soon.",
        "Perfect for tournament play.",
        "Great coaching staff available.",
        "Court surface is very fast.",
        "Excellent value for money.",
        "Beautiful court with great atmosphere.",
        "Court maintenance could be better.",
        "Love the indoor option for winter.",
        "Great location near the city center.",
        "Court lighting is perfect for evening games.",
        "Clean and well-organized facility."
      ];
      
      const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
      
      reviews.push({
        id: `${courtId}-review-${i}`,
        rating: randomRating,
        text: randomText,
        author: `Player${Math.floor(Math.random() * 1000)}`,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
    
    return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return locations.map((location, index) => {
    const courtType = courtTypes[Math.floor(Math.random() * courtTypes.length)];
    const availableFacilities = facilities
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6) + 4); // 4-9 facilities
    
    const reviews = generateRandomReviews(index + 1);
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    return {
      id: (index + 1).toString(),
      name: location,
      type: courtType,
      address: `${Math.floor(Math.random() * 9999) + 100} ${['Main St', 'Oak Ave', 'Pine St', 'Elm Dr', 'Cedar Ln', 'Maple Way', 'First St', 'Second Ave', 'Park Blvd', 'Court St'][Math.floor(Math.random() * 10)]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'][Math.floor(Math.random() * 20)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA', 'TX', 'FL', 'TX', 'OH', 'NC', 'CA', 'IN', 'WA', 'CO', 'DC'][Math.floor(Math.random() * 20)]} ${Math.floor(Math.random() * 90000) + 10000}`,
      price: `$${Math.floor(Math.random() * 30) + 10}/hour`,
      facilities: availableFacilities,
      rating: parseFloat(averageRating.toFixed(1)),
      reviewCount: reviews.length,
      image: `https://picsum.photos/400/300?random=${index + 1}`,
      description: `Beautiful ${courtType.toLowerCase()} tennis facility featuring ${availableFacilities.join(', ').toLowerCase()}. Perfect for players of all skill levels with excellent amenities and professional maintenance.`,
      hours: {
        weekdays: '6:00 AM - 10:00 PM',
        weekends: '7:00 AM - 9:00 PM'
      },
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      reviews: reviews
    };
  });
};

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem('tennisCourts')) {
    const courts = generateMockCourts();
    localStorage.setItem('tennisCourts', JSON.stringify(courts));
  }
  
  if (!localStorage.getItem('courtReviews')) {
    localStorage.setItem('courtReviews', JSON.stringify({}));
  }
};

// Fetch all courts
export const fetchCourts = async () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('tennisCourts') || '[]');
};

// Fetch a specific court by ID
export const fetchCourtById = async (courtId) => {
  const courts = await fetchCourts();
  return courts.find(court => court.id === courtId);
};

// Search courts by name or location
export const searchCourts = async (query) => {
  const courts = await fetchCourts();
  if (!query) return courts;
  
  const searchTerm = query.toLowerCase();
  return courts.filter(court => 
    court.name.toLowerCase().includes(searchTerm) ||
    court.address.toLowerCase().includes(searchTerm) ||
    court.type.toLowerCase().includes(searchTerm) ||
    court.facilities.some(facility => facility.toLowerCase().includes(searchTerm))
  );
};

// Add a new review to a court
export const addCourtReview = async (courtId, review) => {
  const courts = await fetchCourts();
  const courtIndex = courts.findIndex(court => court.id === courtId);
  
  if (courtIndex === -1) {
    throw new Error('Court not found');
  }
  
  const newReview = {
    id: `${courtId}-review-${Date.now()}`,
    rating: review.rating,
    text: review.text,
    author: review.author || 'Anonymous',
    date: new Date().toISOString().split('T')[0]
  };
  
  // Add review to court
  courts[courtIndex].reviews.unshift(newReview);
  
  // Recalculate average rating
  const totalRating = courts[courtIndex].reviews.reduce((sum, r) => sum + r.rating, 0);
  courts[courtIndex].rating = parseFloat((totalRating / courts[courtIndex].reviews.length).toFixed(1));
  courts[courtIndex].reviewCount = courts[courtIndex].reviews.length;
  
  // Update localStorage
  localStorage.setItem('tennisCourts', JSON.stringify(courts));
  
  return courts[courtIndex];
};

// Update courts in storage
export const updateCourts = async (courts) => {
  localStorage.setItem('tennisCourts', JSON.stringify(courts));
  return courts;
};
