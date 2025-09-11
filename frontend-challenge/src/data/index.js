// Mock data for >50 tennis courts

const images = [
  "src/data/image1.png",
  "src/data/image2.png",
  "src/data/image3.png",
  "src/data/image4.png"
];

export const courts = [
  {
    id: 1,
    name: "Central Park Tennis Court",
    location: "New York, NY",
    rating: 4.5,
    reviews: [
      { user: "Alice", comment: "Great surface!", rating: 5 },
      { user: "Bob", comment: "Busy on weekends.", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 2,
    name: "Golden Gate Tennis Center",
    location: "San Francisco, CA",
    rating: 4.2,
    reviews: [
      { user: "Charlie", comment: "Nice view!", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 3,
    name: "Wimbledon Club Miami",
    location: "Miami, FL",
    rating: 4.8,
    reviews: [
      { user: "David", comment: "Professional quality courts", rating: 5 },
      { user: "Emma", comment: "Excellent maintenance", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 4,
    name: "Beverly Hills Tennis Club",
    location: "Beverly Hills, CA",
    rating: 4.6,
    reviews: [
      { user: "Frank", comment: "Luxury facilities", rating: 5 },
      { user: "Grace", comment: "A bit expensive but worth it", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 5,
    name: "Austin City Tennis Complex",
    location: "Austin, TX",
    rating: 4.3,
    reviews: [
      { user: "Henry", comment: "Good value for money", rating: 4 },
      { user: "Ivy", comment: "Clean and well-lit", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 6,
    name: "Chicago Lakefront Courts",
    location: "Chicago, IL",
    rating: 4.1,
    reviews: [
      { user: "Jack", comment: "Beautiful lake views", rating: 4 },
      { user: "Kate", comment: "Can get windy", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 7,
    name: "Denver Mountain View Tennis",
    location: "Denver, CO",
    rating: 4.4,
    reviews: [
      { user: "Liam", comment: "Great altitude training", rating: 4 },
      { user: "Mia", comment: "Stunning mountain backdrop", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 8,
    name: "Seattle Rain or Shine Courts",
    location: "Seattle, WA",
    rating: 4.0,
    reviews: [
      { user: "Noah", comment: "Indoor courts are perfect", rating: 4 },
      { user: "Olivia", comment: "Good covered facilities", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 9,
    name: "Phoenix Desert Tennis Club",
    location: "Phoenix, AZ",
    rating: 4.7,
    reviews: [
      { user: "Paul", comment: "Year-round perfect weather", rating: 5 },
      { user: "Quinn", comment: "Top-notch facilities", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 10,
    name: "Boston Common Tennis Courts",
    location: "Boston, MA",
    rating: 3.9,
    reviews: [
      { user: "Rachel", comment: "Historic charm but needs updates", rating: 4 },
      { user: "Sam", comment: "Great location in the city", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 11,
    name: "Las Vegas Strip Tennis Center",
    location: "Las Vegas, NV",
    rating: 4.5,
    reviews: [
      { user: "Tom", comment: "24/7 availability is amazing", rating: 5 },
      { user: "Uma", comment: "Well-maintained courts", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 12,
    name: "Portland Rose City Courts",
    location: "Portland, OR",
    rating: 4.2,
    reviews: [
      { user: "Victor", comment: "Eco-friendly facilities", rating: 4 },
      { user: "Wendy", comment: "Nice community atmosphere", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 13,
    name: "Nashville Music City Tennis",
    location: "Nashville, TN",
    rating: 4.3,
    reviews: [
      { user: "Xander", comment: "Fun social events", rating: 4 },
      { user: "Yara", comment: "Good coaching programs", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 14,
    name: "Atlanta Peachtree Courts",
    location: "Atlanta, GA",
    rating: 4.1,
    reviews: [
      { user: "Zoe", comment: "Nice clay courts", rating: 4 },
      { user: "Aaron", comment: "Professional tournaments here", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 15,
    name: "San Diego Coastal Tennis",
    location: "San Diego, CA",
    rating: 4.6,
    reviews: [
      { user: "Beth", comment: "Perfect weather year-round", rating: 5 },
      { user: "Carl", comment: "Ocean breeze keeps it cool", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 16,
    name: "Philadelphia Liberty Courts",
    location: "Philadelphia, PA",
    rating: 4.0,
    reviews: [
      { user: "Diana", comment: "Good public courts", rating: 4 },
      { user: "Eric", comment: "Affordable rates", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 17,
    name: "Tampa Bay Tennis Complex",
    location: "Tampa, FL",
    rating: 4.4,
    reviews: [
      { user: "Fiona", comment: "Great junior programs", rating: 4 },
      { user: "George", comment: "Modern facilities", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 18,
    name: "Salt Lake City Mountain Courts",
    location: "Salt Lake City, UT",
    rating: 4.2,
    reviews: [
      { user: "Hannah", comment: "Clean mountain air", rating: 4 },
      { user: "Ian", comment: "Well-organized leagues", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 19,
    name: "Charlotte Queen City Tennis",
    location: "Charlotte, NC",
    rating: 4.3,
    reviews: [
      { user: "Jade", comment: "Friendly staff", rating: 4 },
      { user: "Kyle", comment: "Good variety of court surfaces", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 20,
    name: "Minneapolis Lakes Tennis",
    location: "Minneapolis, MN",
    rating: 3.8,
    reviews: [
      { user: "Luna", comment: "Beautiful lake setting", rating: 4 },
      { user: "Max", comment: "Short season but great courts", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 21,
    name: "Kansas City Fountain Courts",
    location: "Kansas City, MO",
    rating: 4.1,
    reviews: [
      { user: "Nina", comment: "Good community center", rating: 4 },
      { user: "Oscar", comment: "Reasonable membership fees", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 22,
    name: "Columbus Buckeye Tennis",
    location: "Columbus, OH",
    rating: 4.0,
    reviews: [
      { user: "Penny", comment: "University quality courts", rating: 4 },
      { user: "Quentin", comment: "Good student discounts", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 23,
    name: "San Antonio River Walk Tennis",
    location: "San Antonio, TX",
    rating: 4.2,
    reviews: [
      { user: "Rosa", comment: "Beautiful riverside location", rating: 4 },
      { user: "Steve", comment: "Good pro shop", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 24,
    name: "Indianapolis Speedway Courts",
    location: "Indianapolis, IN",
    rating: 3.9,
    reviews: [
      { user: "Tina", comment: "Fast courts like the speedway!", rating: 4 },
      { user: "Urban", comment: "Good parking availability", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 25,
    name: "Jacksonville Beach Tennis",
    location: "Jacksonville, FL",
    rating: 4.3,
    reviews: [
      { user: "Vera", comment: "Beach courts are unique", rating: 4 },
      { user: "Will", comment: "Sand gets everywhere but fun", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 26,
    name: "Sacramento State Capitol Courts",
    location: "Sacramento, CA",
    rating: 4.1,
    reviews: [
      { user: "Xara", comment: "Government employees get discounts", rating: 4 },
      { user: "York", comment: "Well-maintained public courts", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 27,
    name: "Louisville Derby Tennis Club",
    location: "Louisville, KY",
    rating: 4.4,
    reviews: [
      { user: "Zara", comment: "Classy southern hospitality", rating: 5 },
      { user: "Adam", comment: "Mint juleps at tournaments", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 28,
    name: "Memphis Blues Tennis Center",
    location: "Memphis, TN",
    rating: 4.0,
    reviews: [
      { user: "Bella", comment: "Soulful tennis atmosphere", rating: 4 },
      { user: "Chris", comment: "Good barbecue nearby", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 29,
    name: "Baltimore Harbor Courts",
    location: "Baltimore, MD",
    rating: 4.2,
    reviews: [
      { user: "Delia", comment: "Harbor views are spectacular", rating: 5 },
      { user: "Eddie", comment: "Crab cakes in the clubhouse", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 30,
    name: "Milwaukee Brewery District Tennis",
    location: "Milwaukee, WI",
    rating: 3.8,
    reviews: [
      { user: "Faith", comment: "Post-game beers are tradition", rating: 4 },
      { user: "Gary", comment: "Cheese curds at concession", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 31,
    name: "Albuquerque Desert Sun Courts",
    location: "Albuquerque, NM",
    rating: 4.3,
    reviews: [
      { user: "Helen", comment: "Stunning desert sunsets", rating: 5 },
      { user: "Ivan", comment: "High altitude takes getting used to", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 32,
    name: "Tucson Cactus Tennis Club",
    location: "Tucson, AZ",
    rating: 4.5,
    reviews: [
      { user: "Jill", comment: "Beautiful desert landscaping", rating: 5 },
      { user: "Kevin", comment: "Watch out for the javelinas", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 33,
    name: "Fresno Central Valley Courts",
    location: "Fresno, CA",
    rating: 3.9,
    reviews: [
      { user: "Lisa", comment: "Good value for the area", rating: 4 },
      { user: "Mike", comment: "Hot summers but playable", rating: 3 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 34,
    name: "Mesa Saguaro Tennis Center",
    location: "Mesa, AZ",
    rating: 4.4,
    reviews: [
      { user: "Nancy", comment: "Senior-friendly facilities", rating: 5 },
      { user: "Owen", comment: "Great winter tennis destination", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 35,
    name: "Virginia Beach Oceanfront Courts",
    location: "Virginia Beach, VA",
    rating: 4.2,
    reviews: [
      { user: "Pam", comment: "Ocean breeze keeps it cool", rating: 4 },
      { user: "Quinn", comment: "Sand can be an issue", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 36,
    name: "Colorado Springs Olympic Courts",
    location: "Colorado Springs, CO",
    rating: 4.6,
    reviews: [
      { user: "Rita", comment: "Olympic training facility", rating: 5 },
      { user: "Sean", comment: "Altitude training benefits", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 37,
    name: "Omaha Corn Husker Tennis",
    location: "Omaha, NE",
    rating: 4.0,
    reviews: [
      { user: "Tara", comment: "Friendly midwest hospitality", rating: 4 },
      { user: "Ulrich", comment: "Good steaks after matches", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 38,
    name: "Raleigh Research Triangle Courts",
    location: "Raleigh, NC",
    rating: 4.3,
    reviews: [
      { user: "Vicky", comment: "High-tech court surfaces", rating: 4 },
      { user: "Walter", comment: "University connections", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 39,
    name: "Long Beach Harbor Tennis",
    location: "Long Beach, CA",
    rating: 4.1,
    reviews: [
      { user: "Xenia", comment: "Container ships in background", rating: 4 },
      { user: "Yusuf", comment: "Diverse playing community", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 40,
    name: "Bakersfield Oil Country Courts",
    location: "Bakersfield, CA",
    rating: 3.7,
    reviews: [
      { user: "Zelda", comment: "Basic but functional courts", rating: 3 },
      { user: "Andre", comment: "Good for beginners", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 41,
    name: "Tampa Gasparilla Tennis Club",
    location: "Tampa, FL",
    rating: 4.5,
    reviews: [
      { user: "Bianca", comment: "Pirate-themed tournaments are fun", rating: 5 },
      { user: "Carlos", comment: "Great social atmosphere", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 42,
    name: "Wichita Prairie Wind Courts",
    location: "Wichita, KS",
    rating: 3.8,
    reviews: [
      { user: "Donna", comment: "Windy conditions challenge you", rating: 4 },
      { user: "Edgar", comment: "Wide open spaces", rating: 3 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 43,
    name: "New Orleans French Quarter Tennis",
    location: "New Orleans, LA",
    rating: 4.2,
    reviews: [
      { user: "Felicia", comment: "Jazz music during breaks", rating: 4 },
      { user: "Gilbert", comment: "Beignets at the snack bar", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 44,
    name: "Honolulu Diamond Head Courts",
    location: "Honolulu, HI",
    rating: 4.8,
    reviews: [
      { user: "Ingrid", comment: "Paradise tennis setting", rating: 5 },
      { user: "James", comment: "Trade winds perfect for play", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 45,
    name: "Anchorage Midnight Sun Tennis",
    location: "Anchorage, AK",
    rating: 4.0,
    reviews: [
      { user: "Karen", comment: "24-hour daylight tennis in summer", rating: 4 },
      { user: "Larry", comment: "Short season but memorable", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 46,
    name: "Boise Foothills Tennis Club",
    location: "Boise, ID",
    rating: 4.3,
    reviews: [
      { user: "Maria", comment: "Mountain views everywhere", rating: 5 },
      { user: "Nathan", comment: "Clean facilities", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 47,
    name: "Little Rock River City Courts",
    location: "Little Rock, AR",
    rating: 3.9,
    reviews: [
      { user: "Olive", comment: "Riverside location is peaceful", rating: 4 },
      { user: "Peter", comment: "Good community programs", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 48,
    name: "Charleston Plantation Tennis",
    location: "Charleston, SC",
    rating: 4.4,
    reviews: [
      { user: "Queen", comment: "Southern charm at its finest", rating: 5 },
      { user: "Robert", comment: "Historic architecture beautiful", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 49,
    name: "Hartford Constitution Courts",
    location: "Hartford, CT",
    rating: 4.1,
    reviews: [
      { user: "Sarah", comment: "Insurance company sponsorships", rating: 4 },
      { user: "Thomas", comment: "Well-funded facilities", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 50,
    name: "Providence Ocean State Tennis",
    location: "Providence, RI",
    rating: 4.0,
    reviews: [
      { user: "Ursula", comment: "Small but well-maintained", rating: 4 },
      { user: "Vincent", comment: "Good coaching staff", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 51,
    name: "Burlington Green Mountain Courts",
    location: "Burlington, VT",
    rating: 4.2,
    reviews: [
      { user: "Wendy", comment: "Eco-friendly operations", rating: 4 },
      { user: "Xavier", comment: "Maple syrup at tournaments", rating: 5 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  },
  {
    id: 52,
    name: "Billings Big Sky Tennis Center",
    location: "Billings, MT",
    rating: 4.3,
    reviews: [
      { user: "Yvonne", comment: "Endless sky views", rating: 5 },
      { user: "Zachary", comment: "Rugged western atmosphere", rating: 4 }
    ],
    image: images[Math.floor(Math.random() * images.length)],
    numCourts: Math.floor(Math.random() * 10) + 1,
    lights: true,
    backboard: true
  }
];
