import { Court } from '../types';

export const courts: Court[] = [
  {
    id: 1,
    name: "Wimbledon Tennis Club",
    location: "London, UK",
    image: "https://picsum.photos/300/200?random=1",
    averageRating: 4.8,
    reviews: [
      { id: 1, user: "John Smith", rating: 5, text: "Amazing grass courts, perfect for professional play!" },
      { id: 2, user: "Emma Wilson", rating: 4, text: "Great facilities but quite expensive." }
    ]
  },
  {
    id: 2,
    name: "Central Park Tennis Center",
    location: "New York, NY",
    image: "https://picsum.photos/300/200?random=2",
    averageRating: 4.5,
    reviews: [
      { id: 3, user: "Mike Johnson", rating: 5, text: "Beautiful courts in the heart of Manhattan!" },
      { id: 4, user: "Sarah Davis", rating: 4, text: "Good courts but can get crowded on weekends." }
    ]
  },
  {
    id: 3,
    name: "Roland Garros Tennis Academy",
    location: "Paris, France",
    image: "https://picsum.photos/300/200?random=3",
    averageRating: 4.9,
    reviews: [
      { id: 5, user: "Pierre Dubois", rating: 5, text: "The clay courts are exceptional, just like the French Open!" },
      { id: 6, user: "Maria Garcia", rating: 5, text: "Perfect surface for clay court training." }
    ]
  },
  {
    id: 4,
    name: "Australian Open Tennis Courts",
    location: "Melbourne, Australia",
    image: "https://picsum.photos/300/200?random=4",
    averageRating: 4.7,
    reviews: [
      { id: 7, user: "James Wilson", rating: 5, text: "Hard courts in excellent condition!" },
      { id: 8, user: "Lisa Chen", rating: 4, text: "Great facilities, well maintained." }
    ]
  },
  {
    id: 5,
    name: "Beverly Hills Tennis Club",
    location: "Beverly Hills, CA",
    image: "https://picsum.photos/300/200?random=5",
    averageRating: 4.6,
    reviews: [
      { id: 9, user: "Robert Taylor", rating: 5, text: "Luxury tennis experience with top-notch service!" },
      { id: 10, user: "Jennifer Brown", rating: 4, text: "Beautiful courts but membership is pricey." }
    ]
  },
  {
    id: 6,
    name: "Miami Beach Tennis Center",
    location: "Miami, FL",
    image: "https://picsum.photos/300/200?random=6",
    averageRating: 4.3,
    reviews: [
      { id: 11, user: "Carlos Rodriguez", rating: 4, text: "Great ocean views while playing!" },
      { id: 12, user: "Amanda White", rating: 4, text: "Nice courts, good for beginners." }
    ]
  },
  {
    id: 7,
    name: "Tokyo Tennis Garden",
    location: "Tokyo, Japan",
    image: "https://picsum.photos/300/200?random=7",
    averageRating: 4.4,
    reviews: [
      { id: 13, user: "Hiroshi Tanaka", rating: 4, text: "Modern facilities with excellent lighting." },
      { id: 14, user: "Yuki Sato", rating: 5, text: "Very clean and well-organized courts." }
    ]
  },
  {
    id: 8,
    name: "Barcelona Tennis Club",
    location: "Barcelona, Spain",
    image: "https://picsum.photos/300/200?random=8",
    averageRating: 4.5,
    reviews: [
      { id: 15, user: "Pablo Martinez", rating: 5, text: "Fantastic clay courts with great atmosphere!" },
      { id: 16, user: "Isabella Lopez", rating: 4, text: "Good courts but parking can be difficult." }
    ]
  },
  {
    id: 9,
    name: "Sydney Harbour Tennis Courts",
    location: "Sydney, Australia",
    image: "https://picsum.photos/300/200?random=9",
    averageRating: 4.6,
    reviews: [
      { id: 17, user: "David Anderson", rating: 5, text: "Stunning harbour views from the courts!" },
      { id: 18, user: "Sophie Miller", rating: 4, text: "Great location and well-maintained courts." }
    ]
  },
  {
    id: 10,
    name: "Monte Carlo Country Club",
    location: "Monaco",
    image: "https://picsum.photos/300/200?random=10",
    averageRating: 4.8,
    reviews: [
      { id: 19, user: "Alexandre Dubois", rating: 5, text: "Exclusive club with world-class facilities!" },
      { id: 20, user: "Victoria Smith", rating: 5, text: "Perfect courts for high-level play." }
    ]
  },
  {
    id: 11,
    name: "Chicago Lakefront Tennis",
    location: "Chicago, IL",
    image: "https://picsum.photos/300/200?random=11",
    averageRating: 4.2,
    reviews: [
      { id: 21, user: "Michael O'Connor", rating: 4, text: "Nice courts with lake views." },
      { id: 22, user: "Rachel Green", rating: 4, text: "Good facilities, reasonable prices." }
    ]
  },
  {
    id: 12,
    name: "Rio Tennis Academy",
    location: "Rio de Janeiro, Brazil",
    image: "https://picsum.photos/300/200?random=12",
    averageRating: 4.4,
    reviews: [
      { id: 23, user: "Bruno Silva", rating: 5, text: "Great training facilities with professional coaches!" },
      { id: 24, user: "Ana Santos", rating: 4, text: "Good courts but can get very hot in summer." }
    ]
  },
  {
    id: 13,
    name: "Vancouver Tennis Club",
    location: "Vancouver, Canada",
    image: "https://picsum.photos/300/200?random=13",
    averageRating: 4.3,
    reviews: [
      { id: 25, user: "Kevin Thompson", rating: 4, text: "Beautiful mountain backdrop while playing." },
      { id: 26, user: "Emily Johnson", rating: 4, text: "Well-maintained courts, friendly staff." }
    ]
  },
  {
    id: 14,
    name: "Dubai Tennis Stadium",
    location: "Dubai, UAE",
    image: "https://picsum.photos/300/200?random=14",
    averageRating: 4.7,
    reviews: [
      { id: 27, user: "Ahmed Al-Rashid", rating: 5, text: "State-of-the-art facilities with air conditioning!" },
      { id: 28, user: "Fatima Hassan", rating: 4, text: "Excellent courts but quite expensive." }
    ]
  },
  {
    id: 15,
    name: "Singapore Tennis Hub",
    location: "Singapore",
    image: "https://picsum.photos/300/200?random=15",
    averageRating: 4.5,
    reviews: [
      { id: 29, user: "Wei Lin", rating: 5, text: "Modern facilities with great coaching programs!" },
      { id: 30, user: "Priya Sharma", rating: 4, text: "Clean courts, good equipment rental." }
    ]
  },
  {
    id: 16,
    name: "Cape Town Tennis Club",
    location: "Cape Town, South Africa",
    image: "https://picsum.photos/300/200?random=16",
    averageRating: 4.4,
    reviews: [
      { id: 31, user: "Johan van der Merwe", rating: 4, text: "Great courts with Table Mountain views!" },
      { id: 32, user: "Nomsa Mthembu", rating: 5, text: "Excellent facilities and welcoming atmosphere." }
    ]
  },
  {
    id: 17,
    name: "Stockholm Tennis Center",
    location: "Stockholm, Sweden",
    image: "https://picsum.photos/300/200?random=17",
    averageRating: 4.3,
    reviews: [
      { id: 33, user: "Lars Andersson", rating: 4, text: "Good indoor courts for winter play." },
      { id: 34, user: "Astrid Nilsson", rating: 4, text: "Clean facilities, reasonable membership fees." }
    ]
  },
  {
    id: 18,
    name: "Buenos Aires Tennis Academy",
    location: "Buenos Aires, Argentina",
    image: "https://picsum.photos/300/200?random=18",
    averageRating: 4.6,
    reviews: [
      { id: 35, user: "Diego Fernandez", rating: 5, text: "Excellent clay courts, perfect for South American style!" },
      { id: 36, user: "Lucia Morales", rating: 4, text: "Great coaching staff and facilities." }
    ]
  },
  {
    id: 19,
    name: "Mumbai Tennis Club",
    location: "Mumbai, India",
    image: "https://picsum.photos/300/200?random=19",
    averageRating: 4.1,
    reviews: [
      { id: 37, user: "Raj Patel", rating: 4, text: "Historic club with character and tradition." },
      { id: 38, user: "Priya Gupta", rating: 4, text: "Good courts but facilities could use updating." }
    ]
  },
  {
    id: 20,
    name: "Seoul Tennis Park",
    location: "Seoul, South Korea",
    image: "https://picsum.photos/300/200?random=20",
    averageRating: 4.5,
    reviews: [
      { id: 39, user: "Kim Min-jun", rating: 5, text: "Modern courts with excellent technology integration!" },
      { id: 40, user: "Park So-young", rating: 4, text: "Great facilities, very organized tournaments." }
    ]
  },
  {
    id: 21,
    name: "Phoenix Desert Tennis",
    location: "Phoenix, AZ",
    image: "https://picsum.photos/300/200?random=21",
    averageRating: 4.2,
    reviews: [
      { id: 41, user: "Jake Martinez", rating: 4, text: "Great desert views, courts well-maintained." },
      { id: 42, user: "Linda Rodriguez", rating: 4, text: "Good for winter tennis, too hot in summer." }
    ]
  },
  {
    id: 22,
    name: "Edinburgh Tennis Club",
    location: "Edinburgh, Scotland",
    image: "https://picsum.photos/300/200?random=22",
    averageRating: 4.3,
    reviews: [
      { id: 43, user: "William MacLeod", rating: 4, text: "Traditional club with great history." },
      { id: 44, user: "Fiona Campbell", rating: 4, text: "Good courts, friendly members." }
    ]
  },
  {
    id: 23,
    name: "Athens Tennis Academy",
    location: "Athens, Greece",
    image: "https://picsum.photos/300/200?random=23",
    averageRating: 4.4,
    reviews: [
      { id: 45, user: "Nikos Papadopoulos", rating: 5, text: "Beautiful courts with ancient city views!" },
      { id: 46, user: "Maria Konstantinou", rating: 4, text: "Good facilities, great for beginners." }
    ]
  },
  {
    id: 24,
    name: "Oslo Tennis Center",
    location: "Oslo, Norway",
    image: "https://picsum.photos/300/200?random=24",
    averageRating: 4.5,
    reviews: [
      { id: 47, user: "Erik Hansen", rating: 5, text: "Excellent indoor facilities for year-round play!" },
      { id: 48, user: "Ingrid Larsen", rating: 4, text: "Clean courts, good equipment." }
    ]
  },
  {
    id: 25,
    name: "Mexico City Tennis Club",
    location: "Mexico City, Mexico",
    image: "https://picsum.photos/300/200?random=25",
    averageRating: 4.3,
    reviews: [
      { id: 49, user: "Carlos Hernandez", rating: 4, text: "Good altitude training for tennis players." },
      { id: 50, user: "Sofia Ramirez", rating: 4, text: "Nice courts, good coaching programs." }
    ]
  },
  {
    id: 26,
    name: "Helsinki Tennis Park",
    location: "Helsinki, Finland",
    image: "https://picsum.photos/300/200?random=26",
    averageRating: 4.4,
    reviews: [
      { id: 51, user: "Mika Virtanen", rating: 4, text: "Great summer courts, beautiful Finnish nature around." },
      { id: 52, user: "Aino Koskinen", rating: 5, text: "Excellent facilities and very clean." }
    ]
  },
  {
    id: 27,
    name: "Prague Tennis Academy",
    location: "Prague, Czech Republic",
    image: "https://picsum.photos/300/200?random=27",
    averageRating: 4.6,
    reviews: [
      { id: 53, user: "Pavel Novak", rating: 5, text: "Historic courts with modern amenities!" },
      { id: 54, user: "Tereza Svoboda", rating: 4, text: "Great coaching staff, reasonable prices." }
    ]
  },
  {
    id: 28,
    name: "Vienna Tennis Club",
    location: "Vienna, Austria",
    image: "https://picsum.photos/300/200?random=28",
    averageRating: 4.5,
    reviews: [
      { id: 55, user: "Franz Mueller", rating: 5, text: "Elegant courts in beautiful Vienna setting!" },
      { id: 56, user: "Anna Weber", rating: 4, text: "Traditional club with excellent service." }
    ]
  },
  {
    id: 29,
    name: "Brussels Tennis Center",
    location: "Brussels, Belgium",
    image: "https://picsum.photos/300/200?random=29",
    averageRating: 4.2,
    reviews: [
      { id: 57, user: "Jean Dupont", rating: 4, text: "Good courts in the heart of Europe." },
      { id: 58, user: "Marie Leroy", rating: 4, text: "Nice facilities, multilingual staff." }
    ]
  },
  {
    id: 30,
    name: "Amsterdam Tennis Park",
    location: "Amsterdam, Netherlands",
    image: "https://picsum.photos/300/200?random=30",
    averageRating: 4.4,
    reviews: [
      { id: 59, user: "Pieter van Dijk", rating: 4, text: "Great courts near the canals!" },
      { id: 60, user: "Emma de Vries", rating: 5, text: "Excellent facilities and friendly atmosphere." }
    ]
  },
  {
    id: 31,
    name: "Zurich Tennis Club",
    location: "Zurich, Switzerland",
    image: "https://picsum.photos/300/200?random=31",
    averageRating: 4.7,
    reviews: [
      { id: 61, user: "Hans Zimmermann", rating: 5, text: "Premium courts with Alpine views!" },
      { id: 62, user: "Claudia Meier", rating: 4, text: "Expensive but worth it for the quality." }
    ]
  },
  {
    id: 32,
    name: "Copenhagen Tennis Academy",
    location: "Copenhagen, Denmark",
    image: "https://picsum.photos/300/200?random=32",
    averageRating: 4.5,
    reviews: [
      { id: 63, user: "Niels Andersen", rating: 5, text: "Modern Scandinavian design meets tennis!" },
      { id: 64, user: "Lise Nielsen", rating: 4, text: "Great facilities, eco-friendly approach." }
    ]
  },
  {
    id: 33,
    name: "Warsaw Tennis Center",
    location: "Warsaw, Poland",
    image: "https://picsum.photos/300/200?random=33",
    averageRating: 4.3,
    reviews: [
      { id: 65, user: "Tomasz Kowalski", rating: 4, text: "Good courts with improving facilities." },
      { id: 66, user: "Agnieszka Nowak", rating: 4, text: "Nice place to play, reasonable prices." }
    ]
  },
  {
    id: 34,
    name: "Budapest Tennis Club",
    location: "Budapest, Hungary",
    image: "https://picsum.photos/300/200?random=34",
    averageRating: 4.4,
    reviews: [
      { id: 67, user: "Gabor Nagy", rating: 5, text: "Beautiful courts along the Danube!" },
      { id: 68, user: "Zsuzsanna Toth", rating: 4, text: "Historic club with character." }
    ]
  },
  {
    id: 35,
    name: "Lisbon Tennis Academy",
    location: "Lisbon, Portugal",
    image: "https://picsum.photos/300/200?random=35",
    averageRating: 4.5,
    reviews: [
      { id: 69, user: "João Silva", rating: 5, text: "Fantastic courts with ocean breeze!" },
      { id: 70, user: "Ana Costa", rating: 4, text: "Great location, good coaching programs." }
    ]
  },
  {
    id: 36,
    name: "Dublin Tennis Park",
    location: "Dublin, Ireland",
    image: "https://picsum.photos/300/200?random=36",
    averageRating: 4.2,
    reviews: [
      { id: 71, user: "Liam O'Brien", rating: 4, text: "Good courts when the weather cooperates!" },
      { id: 72, user: "Siobhan Murphy", rating: 4, text: "Friendly club with Irish hospitality." }
    ]
  },
  {
    id: 37,
    name: "Rome Tennis Club",
    location: "Rome, Italy",
    image: "https://picsum.photos/300/200?random=37",
    averageRating: 4.6,
    reviews: [
      { id: 73, user: "Marco Rossi", rating: 5, text: "Playing tennis among ancient ruins - amazing!" },
      { id: 74, user: "Giulia Ferrari", rating: 4, text: "Beautiful courts, great Italian atmosphere." }
    ]
  },
  {
    id: 38,
    name: "Madrid Tennis Academy",
    location: "Madrid, Spain",
    image: "https://picsum.photos/300/200?random=38",
    averageRating: 4.5,
    reviews: [
      { id: 75, user: "Alejandro Garcia", rating: 5, text: "Excellent clay courts in the Spanish capital!" },
      { id: 76, user: "Carmen Lopez", rating: 4, text: "Great facilities, professional coaching." }
    ]
  },
  {
    id: 39,
    name: "Berlin Tennis Center",
    location: "Berlin, Germany",
    image: "https://picsum.photos/300/200?random=39",
    averageRating: 4.4,
    reviews: [
      { id: 77, user: "Klaus Schmidt", rating: 4, text: "Modern courts in historic Berlin." },
      { id: 78, user: "Petra Wagner", rating: 5, text: "Excellent facilities, very organized." }
    ]
  },
  {
    id: 40,
    name: "Istanbul Tennis Club",
    location: "Istanbul, Turkey",
    image: "https://picsum.photos/300/200?random=40",
    averageRating: 4.3,
    reviews: [
      { id: 79, user: "Mehmet Yilmaz", rating: 4, text: "Unique courts bridging Europe and Asia!" },
      { id: 80, user: "Ayse Demir", rating: 4, text: "Good courts with Bosphorus views." }
    ]
  },
  {
    id: 41,
    name: "Tel Aviv Tennis Academy",
    location: "Tel Aviv, Israel",
    image: "https://picsum.photos/300/200?random=41",
    averageRating: 4.4,
    reviews: [
      { id: 81, user: "David Cohen", rating: 5, text: "Great courts near the Mediterranean!" },
      { id: 82, user: "Sarah Levy", rating: 4, text: "Modern facilities, good coaching." }
    ]
  },
  {
    id: 42,
    name: "Cairo Tennis Club",
    location: "Cairo, Egypt",
    image: "https://picsum.photos/300/200?random=42",
    averageRating: 4.1,
    reviews: [
      { id: 83, user: "Ahmed Hassan", rating: 4, text: "Historic club with pyramid views!" },
      { id: 84, user: "Fatma Ali", rating: 4, text: "Good courts, traditional atmosphere." }
    ]
  },
  {
    id: 43,
    name: "Casablanca Tennis Center",
    location: "Casablanca, Morocco",
    image: "https://picsum.photos/300/200?random=43",
    averageRating: 4.2,
    reviews: [
      { id: 85, user: "Omar Benali", rating: 4, text: "Nice courts with Moroccan hospitality." },
      { id: 86, user: "Aicha Mansouri", rating: 4, text: "Good facilities, improving year by year." }
    ]
  },
  {
    id: 44,
    name: "Lagos Tennis Academy",
    location: "Lagos, Nigeria",
    image: "https://picsum.photos/300/200?random=44",
    averageRating: 4.0,
    reviews: [
      { id: 87, user: "Chidi Okafor", rating: 4, text: "Growing tennis scene in West Africa!" },
      { id: 88, user: "Adunni Adebayo", rating: 4, text: "Good courts, enthusiastic community." }
    ]
  },
  {
    id: 45,
    name: "Nairobi Tennis Club",
    location: "Nairobi, Kenya",
    image: "https://picsum.photos/300/200?random=45",
    averageRating: 4.3,
    reviews: [
      { id: 89, user: "James Mwangi", rating: 4, text: "High altitude training at its best!" },
      { id: 90, user: "Grace Wanjiku", rating: 4, text: "Beautiful courts with mountain views." }
    ]
  },
  {
    id: 46,
    name: "Johannesburg Tennis Academy",
    location: "Johannesburg, South Africa",
    image: "https://picsum.photos/300/200?random=46",
    averageRating: 4.4,
    reviews: [
      { id: 91, user: "Pieter Botha", rating: 5, text: "Excellent facilities in the City of Gold!" },
      { id: 92, user: "Thandiwe Mthembu", rating: 4, text: "Great courts, diverse community." }
    ]
  },
  {
    id: 47,
    name: "Perth Tennis Center",
    location: "Perth, Australia",
    image: "https://picsum.photos/300/200?random=47",
    averageRating: 4.5,
    reviews: [
      { id: 93, user: "Ryan Thompson", rating: 5, text: "Perfect weather for year-round tennis!" },
      { id: 94, user: "Kate Wilson", rating: 4, text: "Great courts, friendly staff." }
    ]
  },
  {
    id: 48,
    name: "Auckland Tennis Park",
    location: "Auckland, New Zealand",
    image: "https://picsum.photos/300/200?random=48",
    averageRating: 4.4,
    reviews: [
      { id: 95, user: "Mark Johnson", rating: 4, text: "Beautiful courts with harbor views!" },
      { id: 96, user: "Emma Clarke", rating: 5, text: "Excellent facilities, very well maintained." }
    ]
  },
  {
    id: 49,
    name: "Fiji Tennis Resort",
    location: "Suva, Fiji",
    image: "https://picsum.photos/300/200?random=49",
    averageRating: 4.6,
    reviews: [
      { id: 97, user: "Tevita Ratunabuabua", rating: 5, text: "Paradise tennis courts with ocean views!" },
      { id: 98, user: "Sarah Mitchell", rating: 4, text: "Tropical tennis experience like no other." }
    ]
  },
  {
    id: 50,
    name: "Honolulu Tennis Club",
    location: "Honolulu, Hawaii",
    image: "https://picsum.photos/300/200?random=50",
    averageRating: 4.7,
    reviews: [
      { id: 99, user: "Kai Nakamura", rating: 5, text: "Aloha spirit meets world-class tennis!" },
      { id: 100, user: "Lisa Patel", rating: 5, text: "Perfect courts with Diamond Head views." }
    ]
  },
  {
    id: 51,
    name: "Anchorage Tennis Center",
    location: "Anchorage, Alaska",
    image: "https://picsum.photos/300/200?random=51",
    averageRating: 4.1,
    reviews: [
      { id: 101, user: "Jack Frost", rating: 4, text: "Indoor courts perfect for Alaska winters!" },
      { id: 102, user: "Aurora Borealis", rating: 4, text: "Unique tennis experience in the Last Frontier." }
    ]
  },
  {
    id: 52,
    name: "Reykjavik Tennis Academy",
    location: "Reykjavik, Iceland",
    image: "https://picsum.photos/300/200?random=52",
    averageRating: 4.3,
    reviews: [
      { id: 103, user: "Bjorn Eriksson", rating: 4, text: "Geothermal heated courts - amazing!" },
      { id: 104, user: "Sigrid Olafsdottir", rating: 4, text: "Unique Nordic tennis experience." }
    ]
  }
];
