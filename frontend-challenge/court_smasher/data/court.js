// data/courts.js
export const mockCourts = [
  {
    id: "1",
    name: "Wimbledon Tennis Club",
    location: "London, UK",
    surface: "Grass",
    rating: 4.9,
    reviewCount: 156,
    pricePerHour: 85,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    description: "Premium grass court experience in the heart of London",
    amenities: ["Parking", "Lighting", "Equipment Rental", "Pro Shop"],
    reviews: [
      {
        id: "1",
        author: "John Smith",
        rating: 5,
        comment: "Amazing court quality and great facilities!",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: "2",
    name: "Central Park Tennis Courts",
    location: "New York, NY",
    surface: "Hard",
    rating: 4.6,
    reviewCount: 243,
    pricePerHour: 45,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    description: "Historic courts in the heart of Manhattan",
    amenities: ["Lighting", "Water Fountain", "Restrooms"],
    reviews: []
  },
  {
    id: "3",
    name: "Miami Beach Tennis Center",
    location: "Miami, FL",
    surface: "Clay",
    rating: 4.7,
    reviewCount: 189,
    pricePerHour: 55,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    description: "Beautiful clay courts with ocean views",
    amenities: ["Parking", "Lighting", "Equipment Rental", "Cafe"],
    reviews: []
  },
  {
    id: "4",
    name: "Roland Garros Practice Courts",
    location: "Paris, France",
    surface: "Clay",
    rating: 4.8,
    reviewCount: 312,
    pricePerHour: 65,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=300&fit=crop",
    description: "Experience French Open style clay courts",
    amenities: ["Parking", "Pro Shop", "Equipment Rental"],
    reviews: []
  },
  {
    id: "5",
    name: "Sydney Olympic Tennis Courts",
    location: "Sydney, Australia",
    surface: "Hard",
    rating: 4.5,
    reviewCount: 167,
    pricePerHour: 40,
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop",
    description: "Olympic standard hard courts with modern facilities",
    amenities: ["Parking", "Lighting", "Water Fountain"],
    reviews: []
  },
  {
    id: "6",
    name: "Beverly Hills Country Club",
    location: "Beverly Hills, CA",
    surface: "Hard",
    rating: 4.9,
    reviewCount: 98,
    pricePerHour: 120,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
    description: "Exclusive courts for the discerning player",
    amenities: ["Parking", "Lighting", "Equipment Rental", "Pro Shop", "Spa"],
    reviews: []
  },
  {
    id: "7",
    name: "Tokyo Tennis Garden",
    location: "Tokyo, Japan",
    surface: "Hard",
    rating: 4.4,
    reviewCount: 201,
    pricePerHour: 35,
    image: 'https://plus.unsplash.com/premium_photo-1664303530769-419f1ebda25d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "Modern courts in the bustling city center",
    amenities: ["Lighting", "Equipment Rental", "Vending Machines"],
    reviews: []
  },
  {
    id: "8",
    name: "Barcelona Tennis Club",
    location: "Barcelona, Spain",
    surface: "Clay",
    rating: 4.6,
    reviewCount: 145,
    pricePerHour: 50,
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=300&fit=crop",
    description: "Traditional European clay court experience",
    amenities: ["Parking", "Cafe", "Equipment Rental"],
    reviews: []
  },
  {
    id: "9",
    name: "Melbourne Park Courts",
    location: "Melbourne, Australia",
    surface: "Hard",
    rating: 4.7,
    reviewCount: 278,
    pricePerHour: 48,
    image: "https://images.unsplash.com/photo-1707664635804-5cdd900a754e?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Australian Open style courts available for public play",
    amenities: ["Parking", "Lighting", "Pro Shop"],
    reviews: []
  },
  {
    id: "10",
    name: "Monte Carlo Tennis Club",
    location: "Monaco",
    surface: "Clay",
    rating: 4.8,
    reviewCount: 89,
    pricePerHour: 95,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop",
    description: "Luxury clay courts with Mediterranean views",
    amenities: ["Parking", "Equipment Rental", "Spa", "Restaurant"],
    reviews: []
  }
];

// Generate more courts for pagination testing
const generateMoreCourts = () => {
  const surfaces = ["Hard", "Clay", "Grass"];
  const locations = [
    "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", 
    "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX",
    "Toronto, Canada", "Vancouver, Canada", "London, UK", "Berlin, Germany"
  ];
  
  const additionalCourts = [];
  for (let i = 11; i <= 55; i++) {
    additionalCourts.push({
      id: i.toString(),
      name: `More Court ${i}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      surface: surfaces[Math.floor(Math.random() * surfaces.length)],
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5 to 5.0
      reviewCount: Math.floor(Math.random() * 300) + 10,
      pricePerHour: Math.floor(Math.random() * 80) + 25, // $25-$105
      image: 'https://images.unsplash.com/photo-1707664635804-5cdd900a754e?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: `Quality tennis court with excellent facilities and professional maintenance.`,
      amenities: ["Lighting", "Equipment Rental"],
      reviews: []
    });
  }
  return additionalCourts;
};

export const allCourts = [...mockCourts, ...generateMoreCourts()];

export const searchCourts = (query) => {
  if (!query.trim()) return allCourts;
  
  const lowerQuery = query.toLowerCase();
  return allCourts.filter(court => 
    court.name.toLowerCase().includes(lowerQuery) ||
    court.location.toLowerCase().includes(lowerQuery) ||
    court.surface.toLowerCase().includes(lowerQuery)
  );
};

export const getCourtById = (id) => {
  return allCourts.find(court => court.id === id);
};