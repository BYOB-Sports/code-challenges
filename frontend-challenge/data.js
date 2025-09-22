// Mock data for tennis courts
const tennisCourtData = {
  courts: [
    {
      id: 1,
      name: "Central Park Tennis Center",
      location: "New York, NY",
      surface: "hard",
      type: "outdoor",
      rating: 4.5,
      reviewCount: 127,
      priceRange: "$25-35/hour",
      amenities: ["Lighting", "Pro Shop", "Parking"],
      description: "Premier outdoor tennis facility in the heart of Manhattan.",
      reviews: [
        { id: 1, author: "Sarah M.", rating: 5, date: "2024-01-15", text: "Amazing courts with great lighting for evening play!" },
        { id: 2, author: "Mike R.", rating: 4, date: "2024-01-10", text: "Well maintained courts, can get busy on weekends." }
      ]
    },
    {
      id: 2,
      name: "Wimbledon Club",
      location: "London, UK",
      surface: "grass",
      type: "outdoor",
      rating: 4.8,
      reviewCount: 89,
      priceRange: "$45-60/hour",
      amenities: ["Clubhouse", "Restaurant", "Locker Rooms"],
      description: "Traditional grass courts in the style of Wimbledon.",
      reviews: [
        { id: 3, author: "James B.", rating: 5, date: "2024-01-12", text: "Authentic grass court experience, absolutely fantastic!" }
      ]
    },
    {
      id: 3,
      name: "Miami Beach Tennis Club",
      location: "Miami, FL",
      surface: "clay",
      type: "outdoor",
      rating: 4.3,
      reviewCount: 156,
      priceRange: "$30-40/hour",
      amenities: ["Ocean View", "Café", "Equipment Rental"],
      description: "Beautiful clay courts with stunning ocean views.",
      reviews: []
    },
    {
      id: 4,
      name: "Indoor Tennis Academy",
      location: "Chicago, IL",
      surface: "hard",
      type: "indoor",
      rating: 4.6,
      reviewCount: 203,
      priceRange: "$35-50/hour",
      amenities: ["Climate Control", "Pro Lessons", "Fitness Center"],
      description: "Year-round indoor tennis with professional coaching.",
      reviews: []
    },
    {
      id: 5,
      name: "Roland Garros Recreation",
      location: "Paris, France",
      surface: "clay",
      type: "outdoor",
      rating: 4.7,
      reviewCount: 98,
      priceRange: "$40-55/hour",
      amenities: ["Historic Venue", "Museum", "Gift Shop"],
      description: "Clay courts inspired by the French Open venue.",
      reviews: []
    }
  ]
};

// Generate additional courts to reach 50+
const locations = [
  "Los Angeles, CA", "Boston, MA", "Seattle, WA", "Austin, TX", "Denver, CO",
  "Atlanta, GA", "Phoenix, AZ", "San Diego, CA", "Portland, OR", "Nashville, TN",
  "Las Vegas, NV", "Orlando, FL", "Charlotte, NC", "Minneapolis, MN", "Detroit, MI",
  "Philadelphia, PA", "Houston, TX", "Dallas, TX", "San Francisco, CA", "Washington, DC",
  "Toronto, Canada", "Vancouver, Canada", "Sydney, Australia", "Melbourne, Australia",
  "Tokyo, Japan", "Barcelona, Spain", "Rome, Italy", "Berlin, Germany", "Amsterdam, Netherlands",
  "Stockholm, Sweden", "Copenhagen, Denmark", "Oslo, Norway", "Helsinki, Finland",
  "Vienna, Austria", "Zurich, Switzerland", "Brussels, Belgium", "Dublin, Ireland",
  "Edinburgh, Scotland", "Cardiff, Wales", "Manchester, UK", "Birmingham, UK",
  "Liverpool, UK", "Glasgow, Scotland", "Belfast, Northern Ireland", "Monaco",
  "Nice, France", "Lyon, France", "Marseille, France", "Bordeaux, France"
];

const courtNames = [
  "Elite Tennis Club", "Grand Slam Courts", "Ace Tennis Center", "Championship Courts",
  "Premier Tennis Academy", "Victory Tennis Club", "Baseline Tennis Center", "Court Masters",
  "Tennis Excellence", "Advantage Tennis Club", "Serve & Volley Courts", "Match Point Tennis",
  "All Court Tennis", "Tennis Professionals", "Court Champions", "Tennis Elite",
  "Racquet Club", "Tennis Paradise", "Court Legends", "Tennis Masters",
  "Deuce Tennis Club", "Love Tennis Center", "Game Set Match", "Tennis Royale",
  "Court Kings", "Tennis Dynasty", "Smash Tennis Club", "Tennis Titans",
  "Court Warriors", "Tennis Legends", "Ace High Tennis", "Court Perfection",
  "Tennis Supreme", "Court Excellence", "Tennis Prestige", "Court Royalty",
  "Tennis Champions", "Court Masters Pro", "Tennis Elite Pro", "Court Legends Pro",
  "Tennis Dynasty Pro", "Court Champions Elite", "Tennis Royale Elite", "Court Kings Elite",
  "Tennis Titans Elite", "Court Warriors Elite", "Tennis Legends Elite", "Ace High Elite"
];

const surfaces = ["hard", "clay", "grass"];
const types = ["outdoor", "indoor"];
const amenitiesList = [
  ["Lighting", "Parking", "Water Fountain"],
  ["Pro Shop", "Locker Rooms", "Showers"],
  ["Restaurant", "Café", "Snack Bar"],
  ["Equipment Rental", "Stringing Service", "Ball Machine"],
  ["Fitness Center", "Spa", "Pool"],
  ["Childcare", "Pro Lessons", "Group Classes"],
  ["Tournament Hosting", "League Play", "Social Events"],
  ["Climate Control", "Viewing Area", "Sound System"]
];

// Generate remaining courts
for (let i = 6; i <= 55; i++) {
  const surface = surfaces[Math.floor(Math.random() * surfaces.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const rating = Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
  const reviewCount = Math.floor(Math.random() * 300) + 20;
  const priceMin = Math.floor(Math.random() * 30) + 20;
  const priceMax = priceMin + Math.floor(Math.random() * 20) + 10;
  
  tennisCourtData.courts.push({
    id: i,
    name: courtNames[i - 6],
    location: locations[i - 6],
    surface: surface,
    type: type,
    rating: rating,
    reviewCount: reviewCount,
    priceRange: `$${priceMin}-${priceMax}/hour`,
    amenities: amenitiesList[Math.floor(Math.random() * amenitiesList.length)],
    description: `Professional ${surface} ${type} tennis facility with modern amenities.`,
    reviews: []
  });
}

// Export data
window.tennisCourtData = tennisCourtData;
