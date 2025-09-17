export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  surface: 'Hard' | 'Clay' | 'Grass' | 'Synthetic';
  indoor: boolean;
  lights: boolean;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  amenities: string[];
  phone: string;
  hours: string;
  reviews: Review[];
}

// Reliable image URLs using Lorem Picsum
const getTennisImage = (id: number) => `https://picsum.photos/400/300?random=${id}`;

// Simple, reliable tennis court data
export const tennisCourts: TennisCourt[] = [
  {
    id: "1",
    name: "Central Park Tennis Center",
    location: "123 Tennis Ave",
    city: "New York",
    state: "NY",
    surface: "Hard",
    indoor: false,
    lights: true,
    pricePerHour: 45,
    rating: 4.8,
    reviewCount: 127,
    image: getTennisImage(1),
    description: "Premier tennis facility in the heart of the city with 12 outdoor courts and professional lighting.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Water Fountains", "Restrooms"],
    phone: "(555) 123-4567",
    hours: "6:00 AM - 10:00 PM",
    reviews: [
      { id: "1", userName: "Alex Johnson", rating: 5, comment: "Great court with excellent lighting!", date: "2024-09-15" },
      { id: "2", userName: "Sarah Wilson", rating: 4, comment: "Well-maintained surface, highly recommend.", date: "2024-09-14" },
      { id: "3", userName: "Mike Chen", rating: 5, comment: "Perfect for evening games with friends.", date: "2024-09-13" }
    ]
  },
  {
    id: "2",
    name: "Riverside Tennis Club",
    location: "456 River Rd",
    city: "Los Angeles",
    state: "CA",
    surface: "Clay",
    indoor: false,
    lights: true,
    pricePerHour: 55,
    rating: 4.6,
    reviewCount: 89,
    image: getTennisImage(2),
    description: "Beautiful clay courts with scenic river views. Perfect for serious players.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Restaurant", "Swimming Pool"],
    phone: "(555) 234-5678",
    hours: "7:00 AM - 9:00 PM",
    reviews: [
      { id: "4", userName: "Emma Davis", rating: 4, comment: "Love the clay surface!", date: "2024-09-12" },
      { id: "5", userName: "David Brown", rating: 5, comment: "Great location and facilities.", date: "2024-09-11" }
    ]
  },
  {
    id: "3",
    name: "Mountain View Tennis Academy",
    location: "789 Mountain St",
    city: "Denver",
    state: "CO",
    surface: "Hard",
    indoor: true,
    lights: true,
    pricePerHour: 65,
    rating: 4.9,
    reviewCount: 203,
    image: getTennisImage(3),
    description: "State-of-the-art indoor facility with climate control and professional coaching.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Café", "Fitness Center", "Coaching"],
    phone: "(555) 345-6789",
    hours: "5:00 AM - 11:00 PM",
    reviews: [
      { id: "6", userName: "Lisa Garcia", rating: 5, comment: "Excellent indoor facility!", date: "2024-09-10" },
      { id: "7", userName: "Tom Anderson", rating: 5, comment: "Great for year-round play.", date: "2024-09-09" }
    ]
  },
  {
    id: "4",
    name: "Beachside Tennis Courts",
    location: "321 Ocean Blvd",
    city: "Miami",
    state: "FL",
    surface: "Hard",
    indoor: false,
    lights: true,
    pricePerHour: 50,
    rating: 4.7,
    reviewCount: 156,
    image: getTennisImage(4),
    description: "Oceanfront tennis courts with stunning beach views and sea breeze.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Beach Access", "Restaurant"],
    phone: "(555) 456-7890",
    hours: "6:00 AM - 10:00 PM",
    reviews: [
      { id: "8", userName: "Maria Rodriguez", rating: 4, comment: "Beautiful ocean views!", date: "2024-09-08" },
      { id: "9", userName: "James Taylor", rating: 5, comment: "Perfect for morning games.", date: "2024-09-07" }
    ]
  },
  {
    id: "5",
    name: "Forest Hills Tennis Center",
    location: "654 Forest Ave",
    city: "Seattle",
    state: "WA",
    surface: "Synthetic",
    indoor: false,
    lights: true,
    pricePerHour: 40,
    rating: 4.5,
    reviewCount: 98,
    image: getTennisImage(5),
    description: "Community tennis center with synthetic courts perfect for all weather conditions.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Playground", "Picnic Area"],
    phone: "(555) 567-8901",
    hours: "6:30 AM - 9:30 PM",
    reviews: [
      { id: "10", userName: "Anna Martinez", rating: 4, comment: "Great community facility.", date: "2024-09-06" },
      { id: "11", userName: "Chris Lee", rating: 5, comment: "Good value for money.", date: "2024-09-05" }
    ]
  },
  {
    id: "6",
    name: "Downtown Athletic Club",
    location: "987 Business St",
    city: "Chicago",
    state: "IL",
    surface: "Hard",
    indoor: true,
    lights: true,
    pricePerHour: 70,
    rating: 4.8,
    reviewCount: 145,
    image: getTennisImage(6),
    description: "Premium indoor tennis facility with full-service amenities and professional staff.",
    amenities: ["Pro Shop", "Locker Rooms", "Valet Parking", "Spa", "Restaurant", "Bar"],
    phone: "(555) 678-9012",
    hours: "5:00 AM - 12:00 AM",
    reviews: [
      { id: "12", userName: "Jennifer White", rating: 5, comment: "Luxury tennis experience!", date: "2024-09-04" },
      { id: "13", userName: "Robert Jones", rating: 4, comment: "Great facilities and service.", date: "2024-09-03" }
    ]
  },
  {
    id: "7",
    name: "Sunset Tennis Courts",
    location: "147 Sunset Blvd",
    city: "Phoenix",
    state: "AZ",
    surface: "Hard",
    indoor: false,
    lights: true,
    pricePerHour: 35,
    rating: 4.4,
    reviewCount: 76,
    image: getTennisImage(7),
    description: "Affordable outdoor courts with excellent lighting for evening play.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Water Fountains"],
    phone: "(555) 789-0123",
    hours: "6:00 AM - 10:00 PM",
    reviews: [
      { id: "14", userName: "Amanda Clark", rating: 4, comment: "Good value for the price.", date: "2024-09-02" },
      { id: "15", userName: "Daniel Lewis", rating: 4, comment: "Nice evening lighting.", date: "2024-09-01" }
    ]
  },
  {
    id: "8",
    name: "Golden Gate Tennis Club",
    location: "258 Bridge St",
    city: "San Francisco",
    state: "CA",
    surface: "Clay",
    indoor: false,
    lights: true,
    pricePerHour: 60,
    rating: 4.7,
    reviewCount: 134,
    image: getTennisImage(8),
    description: "Historic tennis club with clay courts and panoramic city views.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Restaurant", "Bar", "Coaching"],
    phone: "(555) 890-1234",
    hours: "7:00 AM - 9:00 PM",
    reviews: [
      { id: "16", userName: "Michelle Walker", rating: 5, comment: "Beautiful historic club!", date: "2024-08-31" },
      { id: "17", userName: "Kevin Hall", rating: 4, comment: "Great clay courts.", date: "2024-08-30" }
    ]
  },
  {
    id: "9",
    name: "Lakeside Tennis Center",
    location: "369 Lake Dr",
    city: "Minneapolis",
    state: "MN",
    surface: "Hard",
    indoor: true,
    lights: true,
    pricePerHour: 55,
    rating: 4.6,
    reviewCount: 112,
    image: getTennisImage(9),
    description: "Indoor facility with climate control, perfect for year-round play.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Café", "Fitness Center"],
    phone: "(555) 901-2345",
    hours: "5:30 AM - 10:30 PM",
    reviews: [
      { id: "18", userName: "Rachel Green", rating: 4, comment: "Great for winter play.", date: "2024-08-29" },
      { id: "19", userName: "Steven Adams", rating: 5, comment: "Excellent indoor facility.", date: "2024-08-28" }
    ]
  },
  {
    id: "10",
    name: "Desert Tennis Oasis",
    location: "741 Palm Ave",
    city: "Las Vegas",
    state: "NV",
    surface: "Hard",
    indoor: false,
    lights: true,
    pricePerHour: 45,
    rating: 4.5,
    reviewCount: 87,
    image: getTennisImage(10),
    description: "Desert-themed tennis facility with palm trees and resort-style amenities.",
    amenities: ["Pro Shop", "Locker Rooms", "Parking", "Pool", "Restaurant", "Spa"],
    phone: "(555) 012-3456",
    hours: "6:00 AM - 11:00 PM",
    reviews: [
      { id: "20", userName: "Nicole King", rating: 4, comment: "Resort-style experience!", date: "2024-08-27" },
      { id: "21", userName: "Alex Johnson", rating: 5, comment: "Beautiful desert setting.", date: "2024-08-26" }
    ]
  }
];

// Generate more courts to reach 50+
const generateMoreCourts = (): TennisCourt[] => {
  const cities = [
    { city: "Boston", state: "MA" }, { city: "Austin", state: "TX" }, { city: "Portland", state: "OR" },
    { city: "Nashville", state: "TN" }, { city: "Atlanta", state: "GA" }, { city: "Dallas", state: "TX" },
    { city: "Houston", state: "TX" }, { city: "San Diego", state: "CA" }, { city: "Tampa", state: "FL" },
    { city: "Orlando", state: "FL" }, { city: "Charlotte", state: "NC" }, { city: "Raleigh", state: "NC" },
    { city: "Richmond", state: "VA" }, { city: "Baltimore", state: "MD" }, { city: "Pittsburgh", state: "PA" },
    { city: "Cleveland", state: "OH" }, { city: "Cincinnati", state: "OH" }, { city: "Detroit", state: "MI" },
    { city: "Milwaukee", state: "WI" }, { city: "Kansas City", state: "MO" }, { city: "St. Louis", state: "MO" },
    { city: "Denver", state: "CO" }, { city: "Salt Lake City", state: "UT" }, { city: "Portland", state: "ME" },
    { city: "Burlington", state: "VT" }, { city: "Concord", state: "NH" }, { city: "Providence", state: "RI" },
    { city: "Hartford", state: "CT" }, { city: "Albany", state: "NY" }, { city: "Trenton", state: "NJ" },
    { city: "Dover", state: "DE" }, { city: "Annapolis", state: "MD" }, { city: "Charleston", state: "SC" },
    { city: "Columbia", state: "SC" }, { city: "Jackson", state: "MS" }, { city: "Montgomery", state: "AL" },
    { city: "Tallahassee", state: "FL" }, { city: "Baton Rouge", state: "LA" }, { city: "Little Rock", state: "AR" },
    { city: "Oklahoma City", state: "OK" }, { city: "Tulsa", state: "OK" }, { city: "Wichita", state: "KS" },
    { city: "Omaha", state: "NE" }, { city: "Des Moines", state: "IA" }, { city: "Fargo", state: "ND" },
    { city: "Bismarck", state: "ND" }, { city: "Pierre", state: "SD" }
  ];

  const courtNames = [
    "Elite Tennis Center", "Premier Courts", "Championship Tennis", "Ace Tennis Club",
    "Grand Slam Courts", "Victory Tennis", "Royal Tennis Club", "Crown Courts",
    "Diamond Tennis Center", "Platinum Courts", "Gold Tennis Club", "Silver Courts",
    "Bronze Tennis Center", "Copper Courts", "Iron Tennis Club", "Steel Courts",
    "Crystal Tennis Center", "Pearl Courts", "Ruby Tennis Club", "Sapphire Courts",
    "Emerald Tennis Center", "Topaz Courts", "Amethyst Tennis Club", "Garnet Courts",
    "Opal Tennis Center", "Jade Courts", "Coral Tennis Club", "Ivory Courts",
    "Marble Tennis Center", "Granite Courts", "Quartz Tennis Club", "Limestone Courts"
  ];

  const surfaces: ('Hard' | 'Clay' | 'Grass' | 'Synthetic')[] = ['Hard', 'Clay', 'Grass', 'Synthetic'];

  const additionalCourts: TennisCourt[] = [];
  
  for (let i = 11; i <= 60; i++) {
    const cityData = cities[Math.floor(Math.random() * cities.length)];
    const courtName = courtNames[Math.floor(Math.random() * courtNames.length)];
    const surface = surfaces[Math.floor(Math.random() * surfaces.length)];
    const indoor = Math.random() > 0.6;
    const pricePerHour = Math.floor(Math.random() * 50) + 25;
    const rating = 3.5 + Math.random() * 1.5;
    const reviewCount = Math.floor(Math.random() * 200) + 10;
    
    additionalCourts.push({
      id: i.toString(),
      name: `${courtName} ${i}`,
      location: `${Math.floor(Math.random() * 9999) + 1} Tennis St`,
      city: cityData.city,
      state: cityData.state,
      surface,
      indoor,
      lights: true,
      pricePerHour,
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      image: getTennisImage(i),
      description: `Professional tennis facility with ${surface.toLowerCase()} courts and modern amenities.`,
      amenities: ["Pro Shop", "Locker Rooms", "Parking", "Water Fountains", "Restrooms"],
      phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      hours: indoor ? "5:00 AM - 11:00 PM" : "6:00 AM - 10:00 PM",
      reviews: [
        {
          id: `${i}-1`,
          userName: `User ${i}`,
          rating: Math.floor(Math.random() * 2) + 4,
          comment: "Great court with excellent facilities!",
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ]
    });
  }
  
  return additionalCourts;
};

export const allTennisCourts = [...tennisCourts, ...generateMoreCourts()];