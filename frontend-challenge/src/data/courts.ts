import type { TennisCourt } from '../types';

export const tennisCourts: TennisCourt[] = [
  {
    id: 1,
    name: "Central Park Tennis Center",
    location: "New York, NY",
    address: "93rd St Transverse, New York, NY 10024",
    surface: "Hard",
    price: "$25/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking"],
    rating: 4.5,
    reviewCount: 127,
    description: "Beautiful courts in the heart of Central Park with excellent lighting and well-maintained surfaces.",
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2024-01-15",
        text: "Amazing location and well-maintained courts. The lighting is perfect for evening games."
      },
      {
        id: 2,
        name: "Mike Chen",
        rating: 4,
        date: "2024-01-10",
        text: "Great courts but can get crowded on weekends. Book in advance!"
      }
    ]
  },
  {
    id: 2,
    name: "Riverside Tennis Club",
    location: "Los Angeles, CA",
    address: "1234 Riverside Dr, Los Angeles, CA 90210",
    surface: "Clay",
    price: "$35/hour",
    hours: "5:30 AM - 11:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Café"],
    rating: 4.8,
    reviewCount: 89,
    description: "Premium clay courts with professional coaching available. Perfect for serious players.",
    reviews: [
      {
        id: 3,
        name: "Emma Rodriguez",
        rating: 5,
        date: "2024-01-12",
        text: "Best clay courts in LA! The coaching staff is incredible."
      }
    ]
  },
  {
    id: 3,
    name: "Golden Gate Tennis Courts",
    location: "San Francisco, CA",
    address: "456 Golden Gate Ave, San Francisco, CA 94102",
    surface: "Hard",
    price: "$30/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking"],
    rating: 4.2,
    reviewCount: 156,
    description: "Scenic courts with views of the Golden Gate Bridge. Popular with locals and tourists.",
    reviews: [
      {
        id: 4,
        name: "David Kim",
        rating: 4,
        date: "2024-01-08",
        text: "Great views and decent courts. Can be windy sometimes."
      }
    ]
  },
  {
    id: 4,
    name: "Miami Beach Tennis Center",
    location: "Miami, FL",
    address: "789 Ocean Dr, Miami Beach, FL 33139",
    surface: "Hard",
    price: "$40/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Beach Access"],
    rating: 4.6,
    reviewCount: 203,
    description: "Oceanfront tennis courts with stunning beach views. Perfect for a tennis vacation.",
    reviews: [
      {
        id: 5,
        name: "Lisa Martinez",
        rating: 5,
        date: "2024-01-14",
        text: "Absolutely stunning location! Playing tennis with ocean views is incredible."
      }
    ]
  },
  {
    id: 5,
    name: "Wimbledon Tennis Academy",
    location: "Chicago, IL",
    address: "321 Wimbledon St, Chicago, IL 60601",
    surface: "Grass",
    price: "$50/hour",
    hours: "7:00 AM - 8:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Locker Rooms", "Café"],
    rating: 4.9,
    reviewCount: 67,
    description: "Authentic grass courts modeled after Wimbledon. Premium experience for serious players.",
    reviews: [
      {
        id: 6,
        name: "James Wilson",
        rating: 5,
        date: "2024-01-11",
        text: "True grass court experience! Worth every penny for the authentic feel."
      }
    ]
  },
  {
    id: 6,
    name: "Austin Tennis Center",
    location: "Austin, TX",
    address: "9876 Austin Blvd, Austin, TX 78701",
    surface: "Hard",
    price: "$22/hour",
    hours: "5:30 AM - 10:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking"],
    rating: 4.3,
    reviewCount: 134,
    description: "Community-focused tennis center with affordable rates and friendly atmosphere.",
    reviews: [
      {
        id: 7,
        name: "Rachel Green",
        rating: 4,
        date: "2024-01-09",
        text: "Great value for money. Courts are well-maintained and staff is friendly."
      }
    ]
  },
  {
    id: 7,
    name: "Seattle Tennis Club",
    location: "Seattle, WA",
    address: "5432 Pine St, Seattle, WA 98101",
    surface: "Clay",
    price: "$38/hour",
    hours: "6:00 AM - 9:30 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Indoor Courts"],
    rating: 4.4,
    reviewCount: 98,
    description: "Indoor and outdoor clay courts perfect for year-round play in Seattle's climate.",
    reviews: [
      {
        id: 8,
        name: "Tom Anderson",
        rating: 4,
        date: "2024-01-13",
        text: "Love the indoor option for rainy days. Clay courts are top quality."
      }
    ]
  },
  {
    id: 8,
    name: "Denver Mountain Tennis",
    location: "Denver, CO",
    address: "1111 Mountain View Dr, Denver, CO 80202",
    surface: "Hard",
    price: "$28/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking"],
    rating: 4.1,
    reviewCount: 76,
    description: "High-altitude tennis with mountain views. Great for training at elevation.",
    reviews: [
      {
        id: 9,
        name: "Jennifer Lee",
        rating: 4,
        date: "2024-01-07",
        text: "Beautiful mountain backdrop! The altitude adds an interesting challenge."
      }
    ]
  },
  {
    id: 9,
    name: "Boston Harbor Tennis",
    location: "Boston, MA",
    address: "2222 Harbor Way, Boston, MA 02101",
    surface: "Hard",
    price: "$32/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Harbor Views"],
    rating: 4.5,
    reviewCount: 145,
    description: "Historic tennis courts with harbor views. Rich tennis tradition in Boston.",
    reviews: [
      {
        id: 10,
        name: "Robert Brown",
        rating: 5,
        date: "2024-01-16",
        text: "Historic courts with amazing harbor views. A true Boston tennis experience."
      }
    ]
  },
  {
    id: 10,
    name: "Phoenix Desert Tennis",
    location: "Phoenix, AZ",
    address: "3333 Desert Rd, Phoenix, AZ 85001",
    surface: "Hard",
    price: "$26/hour",
    hours: "5:00 AM - 11:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Shade Structures"],
    rating: 4.0,
    reviewCount: 112,
    description: "Desert tennis with covered courts and cooling systems for hot Arizona summers.",
    reviews: [
      {
        id: 11,
        name: "Maria Garcia",
        rating: 4,
        date: "2024-01-05",
        text: "Great for year-round play. The shade structures make summer tennis bearable."
      }
    ]
  },
  {
    id: 11,
    name: "Portland Tennis Gardens",
    location: "Portland, OR",
    address: "4444 Garden St, Portland, OR 97201",
    surface: "Clay",
    price: "$29/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Garden Views"],
    rating: 4.3,
    reviewCount: 87,
    description: "Beautiful garden setting with clay courts. Perfect for a peaceful tennis experience.",
    reviews: [
      {
        id: 12,
        name: "Kevin Park",
        rating: 4,
        date: "2024-01-06",
        text: "Tranquil setting with beautiful gardens. Clay courts are well-maintained."
      }
    ]
  },
  {
    id: 12,
    name: "Nashville Music City Tennis",
    location: "Nashville, TN",
    address: "5555 Music Row, Nashville, TN 37201",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:30 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking"],
    rating: 4.2,
    reviewCount: 93,
    description: "Music-themed tennis center with great community atmosphere and reasonable rates.",
    reviews: [
      {
        id: 13,
        name: "Amanda Taylor",
        rating: 4,
        date: "2024-01-04",
        text: "Fun atmosphere and great community. Courts are in good condition."
      }
    ]
  },
  {
    id: 13,
    name: "Las Vegas Strip Tennis",
    location: "Las Vegas, NV",
    address: "6666 Strip Blvd, Las Vegas, NV 89101",
    surface: "Hard",
    price: "$45/hour",
    hours: "24/7",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Night Play"],
    rating: 4.4,
    reviewCount: 178,
    description: "24/7 tennis on the Vegas Strip. Perfect for night owls and tourists.",
    reviews: [
      {
        id: 14,
        name: "Carlos Mendez",
        rating: 4,
        date: "2024-01-03",
        text: "Playing tennis at 2 AM on the Strip is an experience! Courts are well-lit."
      }
    ]
  },
  {
    id: 14,
    name: "Atlanta Peach Tennis",
    location: "Atlanta, GA",
    address: "7777 Peach St, Atlanta, GA 30301",
    surface: "Clay",
    price: "$31/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Southern Hospitality"],
    rating: 4.6,
    reviewCount: 124,
    description: "Southern charm meets tennis excellence. Known for friendly service and great courts.",
    reviews: [
      {
        id: 15,
        name: "Patricia Johnson",
        rating: 5,
        date: "2024-01-02",
        text: "The staff is incredibly friendly and the clay courts are perfect. True Southern hospitality!"
      }
    ]
  },
  {
    id: 15,
    name: "Minneapolis Winter Tennis",
    location: "Minneapolis, MN",
    address: "8888 Winter Ave, Minneapolis, MN 55401",
    surface: "Hard",
    price: "$27/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Indoor Courts", "Heating"],
    rating: 4.1,
    reviewCount: 89,
    description: "Year-round tennis with indoor courts and heating for Minnesota winters.",
    reviews: [
      {
        id: 16,
        name: "Michael Olson",
        rating: 4,
        date: "2024-01-01",
        text: "Indoor courts are a lifesaver in winter. Well-heated and comfortable."
      }
    ]
  },
  {
    id: 16,
    name: "Orlando Magic Tennis",
    location: "Orlando, FL",
    address: "9999 Magic Way, Orlando, FL 32801",
    surface: "Hard",
    price: "$33/hour",
    hours: "6:00 AM - 11:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Theme Park Views"],
    rating: 4.3,
    reviewCount: 156,
    description: "Tennis with a magical twist. Courts near theme parks with family-friendly atmosphere.",
    reviews: [
      {
        id: 17,
        name: "Susan Davis",
        rating: 4,
        date: "2023-12-30",
        text: "Great for families visiting Orlando. Kids love the theme park views while parents play."
      }
    ]
  },
  {
    id: 17,
    name: "Detroit Motor City Tennis",
    location: "Detroit, MI",
    address: "1010 Motor Ave, Detroit, MI 48201",
    surface: "Hard",
    price: "$23/hour",
    hours: "6:30 AM - 9:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking"],
    rating: 4.0,
    reviewCount: 78,
    description: "Industrial city tennis with affordable rates and strong community support.",
    reviews: [
      {
        id: 18,
        name: "William Jackson",
        rating: 4,
        date: "2023-12-29",
        text: "Great value and strong community. Courts are well-maintained for the price."
      }
    ]
  },
  {
    id: 18,
    name: "Salt Lake City Mountain Tennis",
    location: "Salt Lake City, UT",
    address: "2020 Mountain Dr, Salt Lake City, UT 84101",
    surface: "Clay",
    price: "$30/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Mountain Views"],
    rating: 4.4,
    reviewCount: 95,
    description: "Mountain tennis with stunning views and clean mountain air.",
    reviews: [
      {
        id: 19,
        name: "Jennifer White",
        rating: 4,
        date: "2023-12-28",
        text: "Breathtaking mountain views while playing. Clay courts are excellent quality."
      }
    ]
  },
  {
    id: 19,
    name: "Kansas City BBQ Tennis",
    location: "Kansas City, MO",
    address: "3030 BBQ Blvd, Kansas City, MO 64101",
    surface: "Hard",
    price: "$25/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "BBQ Restaurant"],
    rating: 4.2,
    reviewCount: 103,
    description: "Tennis and BBQ - the perfect combination. Great courts with amazing food nearby.",
    reviews: [
      {
        id: 20,
        name: "Robert Smith",
        rating: 4,
        date: "2023-12-27",
        text: "Play tennis then enjoy the best BBQ in KC. Perfect combination!"
      }
    ]
  },
  {
    id: 20,
    name: "New Orleans Jazz Tennis",
    location: "New Orleans, LA",
    address: "4040 Jazz St, New Orleans, LA 70112",
    surface: "Clay",
    price: "$34/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Live Music"],
    rating: 4.5,
    reviewCount: 118,
    description: "Tennis with a jazz soundtrack. Unique atmosphere in the heart of New Orleans.",
    reviews: [
      {
        id: 21,
        name: "Marie Dubois",
        rating: 5,
        date: "2023-12-26",
        text: "Playing tennis to live jazz music is magical. Truly unique experience!"
      }
    ]
  },
  {
    id: 21,
    name: "Milwaukee Brewers Tennis",
    location: "Milwaukee, WI",
    address: "5050 Brewer Way, Milwaukee, WI 53201",
    surface: "Hard",
    price: "$26/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Beer Garden"],
    rating: 4.1,
    reviewCount: 84,
    description: "Tennis and craft beer - Wisconsin style. Great courts with local brewery nearby.",
    reviews: [
      {
        id: 22,
        name: "Thomas Miller",
        rating: 4,
        date: "2023-12-25",
        text: "Great courts and even better beer selection. Perfect Wisconsin experience."
      }
    ]
  },
  {
    id: 22,
    name: "Cleveland Rock Tennis",
    location: "Cleveland, OH",
    address: "6060 Rock Ave, Cleveland, OH 44101",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:00 AM - 9:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Rock Museum"],
    rating: 4.0,
    reviewCount: 91,
    description: "Rock and roll tennis in the Rock and Roll Hall of Fame city.",
    reviews: [
      {
        id: 23,
        name: "Lisa Anderson",
        rating: 4,
        date: "2023-12-24",
        text: "Cool rock-themed courts. Great atmosphere and well-maintained surfaces."
      }
    ]
  },
  {
    id: 23,
    name: "Tampa Bay Tennis",
    location: "Tampa, FL",
    address: "7070 Bay Blvd, Tampa, FL 33601",
    surface: "Hard",
    price: "$28/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Bay Views"],
    rating: 4.2,
    reviewCount: 101,
    description: "Bayfront tennis with beautiful water views and year-round perfect weather.",
    reviews: [
      {
        id: 24,
        name: "David Rodriguez",
        rating: 4,
        date: "2023-12-23",
        text: "Beautiful bay views while playing. Courts are in excellent condition."
      }
    ]
  },
  {
    id: 24,
    name: "Pittsburgh Steel Tennis",
    location: "Pittsburgh, PA",
    address: "8080 Steel St, Pittsburgh, PA 15201",
    surface: "Hard",
    price: "$25/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Steel Museum"],
    rating: 4.1,
    reviewCount: 76,
    description: "Industrial heritage meets modern tennis. Strong community tennis program.",
    reviews: [
      {
        id: 25,
        name: "Mark Thompson",
        rating: 4,
        date: "2023-12-22",
        text: "Great community feel and well-maintained courts. Good value for money."
      }
    ]
  },
  {
    id: 25,
    name: "Cincinnati Queen City Tennis",
    location: "Cincinnati, OH",
    address: "9090 Queen St, Cincinnati, OH 45201",
    surface: "Clay",
    price: "$29/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Historic District"],
    rating: 4.2,
    reviewCount: 88,
    description: "Historic tennis in the Queen City with beautiful clay courts.",
    reviews: [
      {
        id: 26,
        name: "Sarah Wilson",
        rating: 4,
        date: "2023-12-21",
        text: "Historic charm with modern facilities. Clay courts are top quality."
      }
    ]
  },
  {
    id: 26,
    name: "St. Louis Gateway Tennis",
    location: "St. Louis, MO",
    address: "1111 Gateway Blvd, St. Louis, MO 63101",
    surface: "Hard",
    price: "$27/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Gateway Arch Views"],
    rating: 4.3,
    reviewCount: 105,
    description: "Tennis with views of the Gateway Arch. Iconic St. Louis tennis experience.",
    reviews: [
      {
        id: 27,
        name: "John Davis",
        rating: 4,
        date: "2023-12-20",
        text: "Playing tennis with the Arch in view is incredible. Great courts too."
      }
    ]
  },
  {
    id: 27,
    name: "Charlotte Queen City Tennis",
    location: "Charlotte, NC",
    address: "2222 Queen St, Charlotte, NC 28201",
    surface: "Hard",
    price: "$26/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Skyline Views"],
    rating: 4.2,
    reviewCount: 97,
    description: "Modern tennis with Charlotte skyline views. Growing tennis community.",
    reviews: [
      {
        id: 28,
        name: "Michelle Brown",
        rating: 4,
        date: "2023-12-19",
        text: "Beautiful skyline views and well-maintained courts. Great tennis community."
      }
    ]
  },
  {
    id: 28,
    name: "Indianapolis Speedway Tennis",
    location: "Indianapolis, IN",
    address: "3333 Speedway Blvd, Indianapolis, IN 46201",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:30 AM - 9:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Speedway Museum"],
    rating: 4.0,
    reviewCount: 82,
    description: "Fast-paced tennis near the Indianapolis Motor Speedway. Great for competitive players.",
    reviews: [
      {
        id: 29,
        name: "Kevin Johnson",
        rating: 4,
        date: "2023-12-18",
        text: "Great competitive atmosphere. Courts are fast and well-maintained."
      }
    ]
  },
  {
    id: 29,
    name: "Columbus Discovery Tennis",
    location: "Columbus, OH",
    address: "4444 Discovery Dr, Columbus, OH 43201",
    surface: "Clay",
    price: "$28/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Science Museum"],
    rating: 4.1,
    reviewCount: 89,
    description: "Discovery-themed tennis near the science museum. Educational and fun atmosphere.",
    reviews: [
      {
        id: 30,
        name: "Amanda Clark",
        rating: 4,
        date: "2023-12-17",
        text: "Fun theme and great clay courts. Perfect for families with kids."
      }
    ]
  },
  {
    id: 30,
    name: "Memphis Blues Tennis",
    location: "Memphis, TN",
    address: "5555 Blues Ave, Memphis, TN 38101",
    surface: "Hard",
    price: "$25/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Blues Music", "BBQ"],
    rating: 4.3,
    reviewCount: 113,
    description: "Blues music and BBQ tennis. Authentic Memphis experience with great courts.",
    reviews: [
      {
        id: 31,
        name: "Robert King",
        rating: 4,
        date: "2023-12-16",
        text: "Authentic Memphis experience! Great courts, great music, great BBQ."
      }
    ]
  },
  {
    id: 31,
    name: "Louisville Derby Tennis",
    location: "Louisville, KY",
    address: "6666 Derby Dr, Louisville, KY 40201",
    surface: "Clay",
    price: "$27/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Horse Racing Museum"],
    rating: 4.2,
    reviewCount: 94,
    description: "Derby-themed tennis with Kentucky hospitality. Beautiful clay courts.",
    reviews: [
      {
        id: 32,
        name: "Jennifer Taylor",
        rating: 4,
        date: "2023-12-15",
        text: "Southern hospitality at its finest. Clay courts are beautifully maintained."
      }
    ]
  },
  {
    id: 32,
    name: "Richmond Capital Tennis",
    location: "Richmond, VA",
    address: "7777 Capital St, Richmond, VA 23201",
    surface: "Hard",
    price: "$26/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Historic District"],
    rating: 4.1,
    reviewCount: 86,
    description: "Historic capital city tennis with colonial charm and modern facilities.",
    reviews: [
      {
        id: 33,
        name: "Michael Williams",
        rating: 4,
        date: "2023-12-14",
        text: "Historic charm with modern courts. Great tennis community in Richmond."
      }
    ]
  },
  {
    id: 33,
    name: "Birmingham Steel Tennis",
    location: "Birmingham, AL",
    address: "8888 Steel Ave, Birmingham, AL 35201",
    surface: "Hard",
    price: "$23/hour",
    hours: "6:30 AM - 9:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Steel Museum"],
    rating: 4.0,
    reviewCount: 79,
    description: "Industrial heritage tennis with strong community support and affordable rates.",
    reviews: [
      {
        id: 34,
        name: "Patricia Davis",
        rating: 4,
        date: "2023-12-13",
        text: "Great value and strong community. Courts are well-maintained for the price."
      }
    ]
  },
  {
    id: 34,
    name: "Jacksonville River Tennis",
    location: "Jacksonville, FL",
    address: "9999 River Rd, Jacksonville, FL 32201",
    surface: "Hard",
    price: "$29/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "River Views"],
    rating: 4.2,
    reviewCount: 101,
    description: "Riverfront tennis with beautiful water views and year-round perfect weather.",
    reviews: [
      {
        id: 35,
        name: "David Martinez",
        rating: 4,
        date: "2023-12-12",
        text: "Beautiful river views while playing. Courts are in excellent condition."
      }
    ]
  },
  {
    id: 35,
    name: "Oklahoma City Thunder Tennis",
    location: "Oklahoma City, OK",
    address: "1010 Thunder Blvd, Oklahoma City, OK 73101",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "NBA Arena Views"],
    rating: 4.1,
    reviewCount: 87,
    description: "Thunder-themed tennis with NBA arena views. Great for sports fans.",
    reviews: [
      {
        id: 36,
        name: "Lisa Johnson",
        rating: 4,
        date: "2023-12-11",
        text: "Cool NBA theme and great courts. Perfect for basketball and tennis fans."
      }
    ]
  },
  {
    id: 36,
    name: "Nashville Music Row Tennis",
    location: "Nashville, TN",
    address: "2020 Music Row, Nashville, TN 37203",
    surface: "Clay",
    price: "$31/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Recording Studios"],
    rating: 4.4,
    reviewCount: 125,
    description: "Music industry tennis with recording studio views. Unique Nashville experience.",
    reviews: [
      {
        id: 37,
        name: "Amanda Country",
        rating: 4,
        date: "2023-12-10",
        text: "Playing tennis near recording studios is so Nashville! Great clay courts too."
      }
    ]
  },
  {
    id: 37,
    name: "Tucson Desert Tennis",
    location: "Tucson, AZ",
    address: "3030 Desert Way, Tucson, AZ 85701",
    surface: "Hard",
    price: "$25/hour",
    hours: "5:30 AM - 10:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Desert Views", "Shade"],
    rating: 4.0,
    reviewCount: 92,
    description: "Desert tennis with stunning mountain views and covered courts for hot days.",
    reviews: [
      {
        id: 38,
        name: "Carlos Desert",
        rating: 4,
        date: "2023-12-09",
        text: "Beautiful desert setting with great shade structures. Perfect for hot weather."
      }
    ]
  },
  {
    id: 38,
    name: "Albuquerque Balloon Tennis",
    location: "Albuquerque, NM",
    address: "4040 Balloon Fiesta Dr, Albuquerque, NM 87101",
    surface: "Hard",
    price: "$26/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Balloon Views"],
    rating: 4.2,
    reviewCount: 88,
    description: "High-altitude tennis with hot air balloon views. Unique New Mexico experience.",
    reviews: [
      {
        id: 39,
        name: "Maria Sandoval",
        rating: 4,
        date: "2023-12-08",
        text: "Watching hot air balloons while playing tennis is magical. Great courts too."
      }
    ]
  },
  {
    id: 39,
    name: "Omaha Cornhusker Tennis",
    location: "Omaha, NE",
    address: "5050 Cornhusker Ave, Omaha, NE 68101",
    surface: "Hard",
    price: "$23/hour",
    hours: "6:30 AM - 9:30 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "College Sports"],
    rating: 4.0,
    reviewCount: 74,
    description: "College sports-themed tennis with Cornhusker pride and affordable rates.",
    reviews: [
      {
        id: 40,
        name: "Thomas Nebraska",
        rating: 4,
        date: "2023-12-07",
        text: "Great college atmosphere and affordable rates. Courts are well-maintained."
      }
    ]
  },
  {
    id: 40,
    name: "Des Moines Capital Tennis",
    location: "Des Moines, IA",
    address: "6060 Capital Blvd, Des Moines, IA 50301",
    surface: "Hard",
    price: "$22/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "State Capitol Views"],
    rating: 4.1,
    reviewCount: 81,
    description: "Capital city tennis with state capitol views. Great community tennis program.",
    reviews: [
      {
        id: 41,
        name: "Jennifer Iowa",
        rating: 4,
        date: "2023-12-06",
        text: "Beautiful capitol views and great community. Courts are in good condition."
      }
    ]
  },
  {
    id: 41,
    name: "Little Rock River Tennis",
    location: "Little Rock, AR",
    address: "7070 River Dr, Little Rock, AR 72201",
    surface: "Clay",
    price: "$25/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "River Views"],
    rating: 4.2,
    reviewCount: 85,
    description: "Riverfront clay courts with Arkansas hospitality and beautiful water views.",
    reviews: [
      {
        id: 42,
        name: "Robert Arkansas",
        rating: 4,
        date: "2023-12-05",
        text: "Great clay courts with river views. True Arkansas hospitality here."
      }
    ]
  },
  {
    id: 42,
    name: "Boise Mountain Tennis",
    location: "Boise, ID",
    address: "8080 Mountain View Dr, Boise, ID 83701",
    surface: "Hard",
    price: "$27/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Mountain Views"],
    rating: 4.3,
    reviewCount: 93,
    description: "Mountain tennis with stunning views and clean Idaho air.",
    reviews: [
      {
        id: 43,
        name: "Sarah Idaho",
        rating: 4,
        date: "2023-12-04",
        text: "Breathtaking mountain views while playing. Courts are excellent quality."
      }
    ]
  },
  {
    id: 43,
    name: "Cheyenne Frontier Tennis",
    location: "Cheyenne, WY",
    address: "9090 Frontier Way, Cheyenne, WY 82001",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Frontier Museum"],
    rating: 4.0,
    reviewCount: 68,
    description: "Frontier-themed tennis with Wyoming hospitality and wide-open spaces.",
    reviews: [
      {
        id: 44,
        name: "Michael Wyoming",
        rating: 4,
        date: "2023-12-03",
        text: "True frontier spirit with great courts. Wide-open spaces and friendly people."
      }
    ]
  },
  {
    id: 44,
    name: "Billings Big Sky Tennis",
    location: "Billings, MT",
    address: "1111 Big Sky Blvd, Billings, MT 59101",
    surface: "Hard",
    price: "$25/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Big Sky Views"],
    rating: 4.1,
    reviewCount: 72,
    description: "Big Sky tennis with Montana mountain views and wide-open spaces.",
    reviews: [
      {
        id: 45,
        name: "Lisa Montana",
        rating: 4,
        date: "2023-12-02",
        text: "Big Sky views are incredible while playing. Courts are well-maintained."
      }
    ]
  },
  {
    id: 45,
    name: "Fargo North Tennis",
    location: "Fargo, ND",
    address: "2222 North Dr, Fargo, ND 58102",
    surface: "Hard",
    price: "$23/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Indoor Courts"],
    rating: 4.0,
    reviewCount: 65,
    description: "North Dakota tennis with indoor courts for harsh winters.",
    reviews: [
      {
        id: 46,
        name: "John North",
        rating: 4,
        date: "2023-12-01",
        text: "Indoor courts are essential for North Dakota winters. Great facility."
      }
    ]
  },
  {
    id: 46,
    name: "Sioux Falls Falls Tennis",
    location: "Sioux Falls, SD",
    address: "3333 Falls Ave, Sioux Falls, SD 57101",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Falls Views"],
    rating: 4.1,
    reviewCount: 77,
    description: "Tennis with beautiful falls views in South Dakota's largest city.",
    reviews: [
      {
        id: 47,
        name: "Amanda Falls",
        rating: 4,
        date: "2023-11-30",
        text: "Beautiful falls views while playing tennis. Great courts and atmosphere."
      }
    ]
  },
  {
    id: 47,
    name: "Pierre Capital Tennis",
    location: "Pierre, SD",
    address: "4444 Capital St, Pierre, SD 57501",
    surface: "Hard",
    price: "$22/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "State Capitol"],
    rating: 4.0,
    reviewCount: 58,
    description: "Small capital city tennis with South Dakota hospitality.",
    reviews: [
      {
        id: 48,
        name: "Robert Pierre",
        rating: 4,
        date: "2023-11-29",
        text: "Small town charm with great tennis. Very friendly community."
      }
    ]
  },
  {
    id: 48,
    name: "Bismarck Capital Tennis",
    location: "Bismarck, ND",
    address: "5555 Capital Blvd, Bismarck, ND 58501",
    surface: "Hard",
    price: "$23/hour",
    hours: "6:30 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "State Capitol"],
    rating: 4.0,
    reviewCount: 61,
    description: "North Dakota capital tennis with indoor courts for winter play.",
    reviews: [
      {
        id: 49,
        name: "Jennifer Bismarck",
        rating: 4,
        date: "2023-11-28",
        text: "Great indoor courts for North Dakota winters. Well-maintained facility."
      }
    ]
  },
  {
    id: 49,
    name: "Helena Mountain Tennis",
    location: "Helena, MT",
    address: "6666 Mountain Dr, Helena, MT 59601",
    surface: "Hard",
    price: "$24/hour",
    hours: "6:00 AM - 9:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Mountain Views"],
    rating: 4.1,
    reviewCount: 69,
    description: "Montana capital tennis with stunning mountain views.",
    reviews: [
      {
        id: 50,
        name: "Michael Helena",
        rating: 4,
        date: "2023-11-27",
        text: "Beautiful mountain views while playing. Great Montana tennis experience."
      }
    ]
  },
  {
    id: 50,
    name: "Juneau Glacier Tennis",
    location: "Juneau, AK",
    address: "7777 Glacier Way, Juneau, AK 99801",
    surface: "Hard",
    price: "$35/hour",
    hours: "7:00 AM - 8:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Indoor Courts", "Glacier Views"],
    rating: 4.2,
    reviewCount: 45,
    description: "Alaska tennis with glacier views and indoor courts for year-round play.",
    reviews: [
      {
        id: 51,
        name: "Sarah Alaska",
        rating: 4,
        date: "2023-11-26",
        text: "Playing tennis with glacier views is incredible. Indoor courts are essential here."
      }
    ]
  },
  {
    id: 51,
    name: "Anchorage Midnight Sun Tennis",
    location: "Anchorage, AK",
    address: "8888 Sun Dr, Anchorage, AK 99501",
    surface: "Hard",
    price: "$32/hour",
    hours: "6:00 AM - 11:00 PM",
    amenities: ["Lighting", "Restrooms", "Parking", "Indoor Courts", "Midnight Sun"],
    rating: 4.3,
    reviewCount: 78,
    description: "Midnight sun tennis in Alaska's largest city with 24-hour summer play.",
    reviews: [
      {
        id: 52,
        name: "David Anchorage",
        rating: 4,
        date: "2023-11-25",
        text: "Playing tennis at midnight in summer is amazing! Great indoor courts for winter."
      }
    ]
  },
  {
    id: 52,
    name: "Honolulu Paradise Tennis",
    location: "Honolulu, HI",
    address: "9999 Paradise Dr, Honolulu, HI 96801",
    surface: "Hard",
    price: "$45/hour",
    hours: "6:00 AM - 10:00 PM",
    amenities: ["Lighting", "Pro Shop", "Restrooms", "Parking", "Ocean Views", "Beach Access"],
    rating: 4.7,
    reviewCount: 189,
    description: "Paradise tennis with ocean views and perfect Hawaiian weather year-round.",
    reviews: [
      {
        id: 53,
        name: "Lisa Hawaii",
        rating: 5,
        date: "2023-11-24",
        text: "Playing tennis in paradise with ocean views is absolutely perfect!"
      }
    ]
  }
];
