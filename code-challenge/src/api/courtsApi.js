// Mock data for tennis courts
const mockCourts = [
  {
    id: 1,
    name: "Central Park Tennis Center",
    location: "Central Park, New York, NY",
    surface: "Hard Court",
    price: "$25/hour",
    rating: 4.2,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Pro Shop", "Restrooms"],
    description: "Beautiful courts in the heart of Central Park with excellent facilities and professional staff.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Brooklyn Bridge Park Courts",
    location: "Brooklyn Bridge Park, Brooklyn, NY",
    surface: "Clay Court",
    price: "$20/hour",
    rating: 4.5,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Water Fountain", "Restrooms"],
    description: "Scenic clay courts with stunning views of the Manhattan skyline and Brooklyn Bridge.",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Queens Tennis Academy",
    location: "Flushing Meadows, Queens, NY",
    surface: "Hard Court",
    price: "$30/hour",
    rating: 4.7,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Pro Shop", "Restrooms", "Locker Rooms", "Café"],
    description: "Professional-grade courts with top-notch facilities and coaching services available.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Riverside Park Courts",
    location: "Riverside Park, Manhattan, NY",
    surface: "Hard Court",
    price: "$18/hour",
    rating: 3.9,
    reviewCount: 0,
    amenities: ["Lighting", "Restrooms"],
    description: "Affordable courts along the Hudson River with basic amenities and good value.",
    image: "https://images.unsplash.com/photo-1595435934249-3b2b5b5b5b5b?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Prospect Park Tennis Center",
    location: "Prospect Park, Brooklyn, NY",
    surface: "Clay Court",
    price: "$22/hour",
    rating: 4.3,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Pro Shop", "Restrooms", "Water Fountain"],
    description: "Well-maintained clay courts in the beautiful Prospect Park setting.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Astoria Park Courts",
    location: "Astoria Park, Queens, NY",
    surface: "Hard Court",
    price: "$15/hour",
    rating: 3.8,
    reviewCount: 0,
    amenities: ["Lighting", "Restrooms"],
    description: "Budget-friendly courts with basic facilities, perfect for casual play.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Central Park Tennis Center",
    location: "Central Park, New York, NY",
    surface: "Hard Court",
    price: "$25/hour",
    rating: 4.2,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Pro Shop", "Restrooms"],
    description: "Beautiful courts in the heart of Central Park with excellent facilities and professional staff.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Brooklyn Bridge Park Courts",
    location: "Brooklyn Bridge Park, Brooklyn, NY",
    surface: "Clay Court",
    price: "$20/hour",
    rating: 4.5,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Water Fountain", "Restrooms"],
    description: "Scenic clay courts with stunning views of the Manhattan skyline and Brooklyn Bridge.",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Queens Tennis Academy",
    location: "Flushing Meadows, Queens, NY",
    surface: "Hard Court",
    price: "$30/hour",
    rating: 4.7,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Pro Shop", "Restrooms", "Locker Rooms", "Café"],
    description: "Professional-grade courts with top-notch facilities and coaching services available.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Riverside Park Courts",
    location: "Riverside Park, Manhattan, NY",
    surface: "Hard Court",
    price: "$18/hour",
    rating: 3.9,
    reviewCount: 0,
    amenities: ["Lighting", "Restrooms"],
    description: "Affordable courts along the Hudson River with basic amenities and good value.",
    image: "https://images.unsplash.com/photo-1595435934249-3b2b5b5b5b5b?w=400&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Prospect Park Tennis Center",
    location: "Prospect Park, Brooklyn, NY",
    surface: "Clay Court",
    price: "$22/hour",
    rating: 4.3,
    reviewCount: 0,
    amenities: ["Lighting", "Parking", "Pro Shop", "Restrooms", "Water Fountain"],
    description: "Well-maintained clay courts in the beautiful Prospect Park setting.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
  },
  {
    id: 12,
    name: "Astoria Park Courts",
    location: "Astoria Park, Queens, NY",
    surface: "Hard Court",
    price: "$15/hour",
    rating: 3.8,
    reviewCount: 0,
    amenities: ["Lighting", "Restrooms"],
    description: "Budget-friendly courts with basic facilities, perfect for casual play.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop"
  }
];

// Mock reviews data
const mockReviews = [];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all courts
export const fetchCourts = async () => {
  await delay(500); // Simulate network delay
  return [...mockCourts];
};

// Fetch a specific court by ID
export const fetchCourtById = async (id) => {
  await delay(300);
  const court = mockCourts.find(c => c.id === parseInt(id));
  if (!court) {
    throw new Error('Court not found');
  }
  return court;
};

// Fetch reviews for a specific court
export const fetchCourtReviews = async (courtId) => {
  await delay(300);
  return mockReviews.filter(review => review.courtId === parseInt(courtId));
};

// Submit a new review
export const submitReview = async (courtId, reviewData) => {
  await delay(500);
  
  const newReview = {
    id: mockReviews.length + 1,
    courtId: parseInt(courtId),
    author: reviewData.author || "Anonymous",
    rating: parseInt(reviewData.rating),
    comment: reviewData.comment,
    date: new Date().toISOString().split('T')[0]
  };
  
  mockReviews.push(newReview);
  
  // Update court rating
  const court = mockCourts.find(c => c.id === parseInt(courtId));
  if (court) {
    const courtReviews = mockReviews.filter(r => r.courtId === parseInt(courtId));
    const newAverageRating = courtReviews.reduce((sum, review) => sum + review.rating, 0) / courtReviews.length;
    court.rating = Math.round(newAverageRating * 10) / 10;
    court.reviewCount = courtReviews.length;
  }
  
  return newReview;
};

// Search courts by name or location
export const searchCourts = async (query) => {
  await delay(300);
  if (!query || query.trim() === '') {
    return [...mockCourts];
  }
  
  const searchTerm = query.toLowerCase();
  return mockCourts.filter(court => 
    court.name.toLowerCase().includes(searchTerm) ||
    court.location.toLowerCase().includes(searchTerm) ||
    court.surface.toLowerCase().includes(searchTerm)
  );
};
