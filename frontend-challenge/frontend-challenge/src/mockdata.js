// Static mock data for tennis courts - 25 courts total
import tennis1 from './assests/tennis1.jpg';
import tennis2 from './assests/tennis2.jpg';
import tennis3 from './assests/tennis3.jpeg';
import tennis4 from './assests/tennis4.jpeg';
import tennis5 from './assests/tennis5.jpeg';
import tennis6 from './assests/tennis6.jpeg';
import tennis7 from './assests/tennis7.webp';
import tennis8 from './assests/tennis8.webp';
import tennis9 from './assests/tennis10.webp';
import tennis10 from './assests/tennis11.jpg';
import tennis12 from './assests/tennis12.webp';

const tennisCourtsMockData = [
  {
    id: 1,
    name: 'Wimbledon Recreation Center',
    surface: 'Grass Court',
    rating: 4.8,
    reviewCount: 156,
    price: 85,
    city: 'New York',
    address: '1247 Tennis St',
    phone: '(555) 123-4567',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Locker Rooms', 'Free Parking', 'Restaurant'],
    image: tennis2,
    distance: '2.3 mi',
    courts: 8,
    isIndoor: false,
    hasProShop: true,
    established: 1985,
    reviews: [
      {
        id: 1,
        user: 'Alex123',
        rating: 5,
        comment: 'Fantastic courts with excellent lighting for evening matches!',
        date: '3/15/2024',
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        user: 'Jordan456',
        rating: 4,
        comment: 'Love the grass surface here, feels like playing at Wimbledon.',
        date: '3/10/2024',
        helpful: 8,
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: 'Roland Garros Club',
    surface: 'Clay Court',
    rating: 4.7,
    reviewCount: 203,
    price: 72,
    city: 'Los Angeles',
    address: '2156 Court Ave',
    phone: '(555) 234-5678',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Night Lighting', 'Private Coaching', 'Equipment Rental', 'Cafe', 'WiFi'],
    image: tennis3,
    distance: '1.8 mi',
    courts: 6,
    isIndoor: false,
    hasProShop: true,
    established: 1992,
    reviews: [
      {
        id: 1,
        user: 'Taylor789',
        rating: 5,
        comment: 'Staff is incredibly friendly and helpful with reservations.',
        date: '3/12/2024',
        helpful: 15,
        verified: true
      },
      {
        id: 2,
        user: 'Casey321',
        rating: 4,
        comment: 'Amazing clay courts, perfect for improving technique.',
        date: '3/8/2024',
        helpful: 9,
        verified: false
      }
    ]
  },
  {
    id: 3,
    name: 'US Open Courts',
    surface: 'Hard Court',
    rating: 4.9,
    reviewCount: 287,
    price: 95,
    city: 'Chicago',
    address: '3847 Racket Blvd',
    phone: '(555) 345-6789',
    hours: '5:00 AM - 11:00 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Tournament Hosting', 'Fitness Center', 'Sauna'],
    image: tennis4,
    distance: '0.9 mi',
    courts: 12,
    isIndoor: true,
    hasProShop: true,
    established: 1978,
    reviews: [
      {
        id: 1,
        user: 'Morgan567',
        rating: 5,
        comment: 'Courts are well-maintained but can get crowded on weekends.',
        date: '3/14/2024',
        helpful: 18,
        verified: true
      },
      {
        id: 2,
        user: 'Riley888',
        rating: 5,
        comment: 'Professional tournament-quality courts with amazing facilities.',
        date: '3/13/2024',
        helpful: 22,
        verified: true
      }
    ]
  },
  {
    id: 4,
    name: 'Australian Open Venue',
    surface: 'Hard Court',
    rating: 4.6,
    reviewCount: 142,
    price: 68,
    city: 'Houston',
    address: '4523 Serve Way',
    phone: '(555) 456-7890',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Free Parking', 'Group Lessons', 'Ball Machine', 'Shower Facilities'],
    image: tennis5,
    distance: '3.2 mi',
    courts: 5,
    isIndoor: false,
    hasProShop: false,
    established: 1988,
    reviews: [
      {
        id: 1,
        user: 'Jamie890',
        rating: 4,
        comment: 'Amazing facilities, the pro shop has everything you need.',
        date: '3/11/2024',
        helpful: 6,
        verified: true
      }
    ]
  },
  {
    id: 5,
    name: 'Central Park Tennis',
    surface: 'Indoor Hard',
    rating: 4.5,
    reviewCount: 178,
    price: 58,
    city: 'Phoenix',
    address: '5672 Net Dr',
    phone: '(555) 567-8901',
    hours: '24/7',
    amenities: ['Night Lighting', 'WiFi', 'Clubhouse', 'Kids Programs'],
    image: tennis6,
    distance: '1.5 mi',
    courts: 4,
    isIndoor: true,
    hasProShop: false,
    established: 1995,
    reviews: [
      {
        id: 1,
        user: 'Riley234',
        rating: 5,
        comment: 'Perfect for beginners, very welcoming atmosphere.',
        date: '3/9/2024',
        helpful: 11,
        verified: true
      }
    ]
  },
  {
    id: 6,
    name: 'Beverly Hills Club',
    surface: 'Grass Court',
    rating: 4.8,
    reviewCount: 94,
    price: 120,
    city: 'Philadelphia',
    address: '6789 Match Lane',
    phone: '(555) 678-9012',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Valet Parking', 'Restaurant', 'Massage Therapy', 'Ladies Lounge'],
    image: tennis7,
    distance: '4.1 mi',
    courts: 3,
    isIndoor: false,
    hasProShop: true,
    established: 1972,
    reviews: [
      {
        id: 1,
        user: 'Avery345',
        rating: 5,
        comment: 'Great value for money, highly recommended!',
        date: '3/13/2024',
        helpful: 7,
        verified: false
      }
    ]
  },
  {
    id: 7,
    name: 'Miami Beach Courts',
    surface: 'Clay Court',
    rating: 4.4,
    reviewCount: 167,
    price: 62,
    city: 'San Antonio',
    address: '7234 Volley Rd',
    phone: '(555) 789-0123',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Free Parking', 'Pool', 'Air Conditioning', 'Equipment Rental'],
    image: tennis8,
    distance: '2.7 mi',
    courts: 7,
    isIndoor: false,
    hasProShop: true,
    established: 1990,
    reviews: [
      {
        id: 1,
        user: 'Sam456',
        rating: 4,
        comment: 'Beautiful setting, courts are always in pristine condition.',
        date: '3/7/2024',
        helpful: 13,
        verified: true
      }
    ]
  },
  {
    id: 8,
    name: 'Golden Gate Tennis',
    surface: 'Hard Court',
    rating: 4.7,
    reviewCount: 221,
    price: 75,
    city: 'San Diego',
    address: '8345 Ace Ct',
    phone: '(555) 890-1234',
    hours: '5:30 AM - 10:30 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Tennis Camps', 'First Aid Station'],
    image: tennis10,
    distance: '1.2 mi',
    courts: 9,
    isIndoor: true,
    hasProShop: true,
    established: 1983,
    reviews: [
      {
        id: 1,
        user: 'Drew567',
        rating: 5,
        comment: 'The coaching here is top-notch, really improved my game.',
        date: '3/6/2024',
        helpful: 16,
        verified: true
      }
    ]
  },
  {
    id: 9,
    name: 'Manhattan Athletic Club',
    surface: 'Indoor Hard',
    rating: 4.6,
    reviewCount: 189,
    price: 88,
    city: 'Dallas',
    address: '9456 Baseline Ave',
    phone: '(555) 901-2345',
    hours: '6:30 AM - 9:30 PM',
    amenities: ['Fitness Center', 'Sauna', 'Locker Rooms', 'Private Coaching'],
    image: tennis9,
    distance: '3.8 mi',
    courts: 6,
    isIndoor: true,
    hasProShop: true,
    established: 1987,
    reviews: [
      {
        id: 1,
        user: 'Blake678',
        rating: 4,
        comment: 'Clean facilities and seamless online booking system.',
        date: '3/5/2024',
        helpful: 9,
        verified: true
      }
    ]
  },
  {
    id: 10,
    name: 'Brooklyn Heights Courts',
    surface: 'Outdoor Hard',
    rating: 4.3,
    reviewCount: 132,
    price: 45,
    city: 'San Jose',
    address: '1567 Deuce St',
    phone: '(555) 012-3456',
    hours: '8:00 AM - 8:00 PM',
    amenities: ['Free Parking', 'Group Lessons', 'Kids Programs', 'Spectator Seating'],
    image: tennis12,
    distance: '2.1 mi',
    courts: 4,
    isIndoor: false,
    hasProShop: false,
    established: 1998,
    reviews: [
      {
        id: 1,
        user: 'Cameron789',
        rating: 4,
        comment: 'Courts could use some resurfacing but overall great experience.',
        date: '3/4/2024',
        helpful: 5,
        verified: false
      }
    ]
  }
];
//   {
//     id: 11,
//     name: 'Queens Tennis Center',
//     surface: 'Hard Court',
//     rating: 4.5,
//     reviewCount: 145,
//     price: 52,
//     city: 'Austin',
//     address: '2678 Tennis St',
//     phone: '(555) 123-9876',
//     hours: '6:00 AM - 10:00 PM',
//     amenities: ['Night Lighting', 'Pro Shop', 'Ball Machine', 'WiFi'],
//     image: 'https://picsum.photos/400/300?random=211',
//     distance: '1.7 mi',
//     courts: 5,
//     isIndoor: false,
//     hasProShop: true,
//     established: 1991,
//     reviews: [
//       {
//         id: 1,
//         user: 'Dakota890',
//         rating: 4,
//         comment: 'Love the courts here for year-round play!',
//         date: '3/3/2024',
//         helpful: 8,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 12,
//     name: 'Bronx Recreation',
//     surface: 'Clay Court',
//     rating: 4.2,
//     reviewCount: 98,
//     price: 38,
//     city: 'Jacksonville',
//     address: '3789 Court Ave',
//     phone: '(555) 234-9876',
//     hours: '7:00 AM - 9:00 PM',
//     amenities: ['Free Parking', 'Equipment Rental', 'Group Lessons'],
//     image: 'https://picsum.photos/400/300?random=212',
//     distance: '4.3 mi',
//     courts: 3,
//     isIndoor: false,
//     hasProShop: false,
//     established: 1994,
//     reviews: [
//       {
//         id: 1,
//         user: 'Emerson123',
//         rating: 4,
//         comment: 'Excellent tournament facilities, well-organized events.',
//         date: '3/2/2024',
//         helpful: 6,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 13,
//     name: 'Staten Island Club',
//     surface: 'Grass Court',
//     rating: 4.7,
//     reviewCount: 176,
//     price: 78,
//     city: 'Fort Worth',
//     address: '4890 Racket Blvd',
//     phone: '(555) 345-9876',
//     hours: '5:00 AM - 11:00 PM',
//     amenities: ['Night Lighting', 'Restaurant', 'WiFi', 'Clubhouse'],
//     image: 'https://picsum.photos/400/300?random=213',
//     distance: '2.9 mi',
//     courts: 8,
//     isIndoor: false,
//     hasProShop: true,
//     established: 1980,
//     reviews: [
//       {
//         id: 1,
//         user: 'Finley234',
//         rating: 5,
//         comment: 'Great community feel, met so many fellow tennis enthusiasts.',
//         date: '3/1/2024',
//         helpful: 14,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 14,
//     name: 'Long Island Tennis',
//     surface: 'Hard Court',
//     rating: 4.4,
//     reviewCount: 203,
//     price: 65,
//     city: 'Columbus',
//     address: '5901 Serve Way',
//     phone: '(555) 456-9876',
//     hours: '6:00 AM - 10:00 PM',
//     amenities: ['Ball Machine', 'Pro Shop', 'Private Coaching', 'Locker Rooms'],
//     image: 'https://picsum.photos/400/300?random=214',
//     distance: '1.4 mi',
//     courts: 7,
//     isIndoor: true,
//     hasProShop: true,
//     established: 1986,
//     reviews: [
//       {
//         id: 1,
//         user: 'Harper345',
//         rating: 4,
//         comment: 'The ball machines are state-of-the-art, perfect for practice.',
//         date: '2/28/2024',
//         helpful: 10,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 15,
//     name: 'Westchester Courts',
//     surface: 'Clay Court',
//     rating: 4.6,
//     reviewCount: 167,
//     price: 71,
//     city: 'Charlotte',
//     address: '6012 Net Dr',
//     phone: '(555) 567-9876',
//     hours: '24/7',
//     amenities: ['Night Lighting', 'Clubhouse', 'Sauna', 'Free Parking'],
//     image: 'https://picsum.photos/400/300?random=215',
//     distance: '3.1 mi',
//     courts: 6,
//     isIndoor: false,
//     hasProShop: true,
//     established: 1989,
//     reviews: [
//       {
//         id: 1,
//         user: 'Kendall456',
//         rating: 5,
//         comment: 'Parking is easy and the location is very convenient.',
//         date: '2/27/2024',
//         helpful: 12,
//         verified: false
//       }
//     ]
//   },
//   {
//     id: 16,
//     name: 'Connecticut Club',
//     surface: 'Indoor Hard',
//     rating: 4.3,
//     reviewCount: 89,
//     price: 55,
//     city: 'San Francisco',
//     address: '7123 Match Point Dr',
//     phone: '(555) 678-9876',
//     hours: '6:00 AM - 10:00 PM',
//     amenities: ['WiFi', 'Equipment Rental', 'Kids Programs'],
//     image: 'https://picsum.photos/400/300?random=216',
//     distance: '2.8 mi',
//     courts: 4,
//     isIndoor: true,
//     hasProShop: false,
//     established: 1993,
//     reviews: [
//       {
//         id: 1,
//         user: 'Logan567',
//         rating: 4,
//         comment: 'Great place for kids to learn tennis fundamentals.',
//         date: '2/26/2024',
//         helpful: 7,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 17,
//     name: 'Jersey Shore Tennis',
//     surface: 'Outdoor Hard',
//     rating: 4.1,
//     reviewCount: 134,
//     price: 42,
//     city: 'Indianapolis',
//     address: '8234 Volley Vista',
//     phone: '(555) 789-9876',
//     hours: '7:00 AM - 9:00 PM',
//     amenities: ['Free Parking', 'Spectator Seating', 'First Aid Station'],
//     image: 'https://picsum.photos/400/300?random=217',
//     distance: '5.2 mi',
//     courts: 5,
//     isIndoor: false,
//     hasProShop: false,
//     established: 1996,
//     reviews: [
//       {
//         id: 1,
//         user: 'Parker678',
//         rating: 4,
//         comment: 'Nice outdoor courts with ocean breeze, very refreshing.',
//         date: '2/25/2024',
//         helpful: 9,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 18,
//     name: 'Philadelphia Courts',
//     surface: 'Clay Court',
//     rating: 4.4,
//     reviewCount: 188,
//     price: 63,
//     city: 'Seattle',
//     address: '9345 Tennis Plaza',
//     phone: '(555) 890-9876',
//     hours: '6:00 AM - 10:00 PM',
//     amenities: ['Night Lighting', 'Pro Shop', 'Restaurant', 'Valet Parking'],
//     image: 'https://picsum.photos/400/300?random=218',
//     distance: '1.9 mi',
//     courts: 6,
//     isIndoor: false,
//     hasProShop: true,
//     established: 1982,
//     reviews: [
//       {
//         id: 1,
//         user: 'Quinn789',
//         rating: 4,
//         comment: 'Love the clay courts here, great for practicing slides.',
//         date: '2/24/2024',
//         helpful: 11,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 19,
//     name: 'Boston Common Tennis',
//     surface: 'Hard Court',
//     rating: 4.6,
//     reviewCount: 156,
//     price: 67,
//     city: 'Denver',
//     address: '1456 Court Square',
//     phone: '(555) 901-9876',
//     hours: '5:00 AM - 11:00 PM',
//     amenities: ['Night Lighting', 'Fitness Center', 'Locker Rooms', 'Equipment Rental'],
//     image: 'https://picsum.photos/400/300?random=219',
//     distance: '2.4 mi',
//     courts: 8,
//     isIndoor: true,
//     hasProShop: true,
//     established: 1975,
//     reviews: [
//       {
//         id: 1,
//         user: 'Reese890',
//         rating: 5,
//         comment: 'Historic courts with modern amenities, perfect combination.',
//         date: '2/23/2024',
//         helpful: 14,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 20,
//     name: 'Chicago Lake Courts',
//     surface: 'Outdoor Hard',
//     rating: 4.2,
//     reviewCount: 173,
//     price: 49,
//     city: 'Washington DC',
//     address: '2567 Lakeside Dr',
//     phone: '(555) 012-9876',
//     hours: '7:00 AM - 9:00 PM',
//     amenities: ['Free Parking', 'Group Lessons', 'Kids Programs', 'Spectator Seating'],
//     image: 'https://picsum.photos/400/300?random=220',
//     distance: '3.7 mi',
//     courts: 5,
//     isIndoor: false,
//     hasProShop: false,
//     established: 1999,
//     reviews: [
//       {
//         id: 1,
//         user: 'Sage123',
//         rating: 4,
//         comment: 'Beautiful lakeside location, courts are well-maintained.',
//         date: '2/22/2024',
//         helpful: 8,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 21,
//     name: 'Denver Mountain Club',
//     surface: 'Indoor Hard',
//     rating: 4.7,
//     reviewCount: 145,
//     price: 82,
//     city: 'Boston',
//     address: '3678 Alpine Way',
//     phone: '(555) 123-8765',
//     hours: '6:00 AM - 10:00 PM',
//     amenities: ['Night Lighting', 'Pro Shop', 'Sauna', 'Mountain Views'],
//     image: 'https://picsum.photos/400/300?random=221',
//     distance: '4.2 mi',
//     courts: 7,
//     isIndoor: true,
//     hasProShop: true,
//     established: 1984,
//     reviews: [
//       {
//         id: 1,
//         user: 'Skyler456',
//         rating: 5,
//         comment: 'Amazing mountain views while playing, truly unique experience.',
//         date: '2/21/2024',
//         helpful: 16,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 22,
//     name: 'Phoenix Desert Courts',
//     surface: 'Hard Court',
//     rating: 4.3,
//     reviewCount: 164,
//     price: 54,
//     city: 'Nashville',
//     address: '4789 Desert Bloom Rd',
//     phone: '(555) 234-8765',
//     hours: '5:30 AM - 10:30 PM',
//     amenities: ['Air Conditioning', 'Pool', 'Equipment Rental', 'Cafe'],
//     image: 'https://picsum.photos/400/300?random=222',
//     distance: '2.6 mi',
//     courts: 6,
//     isIndoor: false,
//     hasProShop: false,
//     established: 1997,
//     reviews: [
//       {
//         id: 1,
//         user: 'Tatum789',
//         rating: 4,
//         comment: 'Great desert setting, courts stay cool even in summer.',
//         date: '2/20/2024',
//         helpful: 9,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 23,
//     name: 'Las Vegas Strip Tennis',
//     surface: 'Clay Court',
//     rating: 4.8,
//     reviewCount: 198,
//     price: 95,
//     city: 'Baltimore',
//     address: '5890 Neon Lights Blvd',
//     phone: '(555) 345-8765',
//     hours: '24/7',
//     amenities: ['Night Lighting', 'Restaurant', 'Valet Parking', 'Entertainment'],
//     image: 'https://picsum.photos/400/300?random=223',
//     distance: '1.3 mi',
//     courts: 4,
//     isIndoor: false,
//     hasProShop: true,
//     established: 1989,
//     reviews: [
//       {
//         id: 1,
//         user: 'Winter890',
//         rating: 5,
//         comment: 'Luxurious courts with Vegas flair, unforgettable experience.',
//         date: '2/19/2024',
//         helpful: 18,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 24,
//     name: 'Seattle Rain Courts',
//     surface: 'Indoor Hard',
//     rating: 4.5,
//     reviewCount: 187,
//     price: 69,
//     city: 'Portland',
//     address: '6901 Drizzle Ave',
//     phone: '(555) 456-8765',
//     hours: '6:00 AM - 10:00 PM',
//     amenities: ['Indoor Courts', 'WiFi', 'Coffee Shop', 'Bike Storage'],
//     image: 'https://picsum.photos/400/300?random=224',
//     distance: '3.4 mi',
//     courts: 8,
//     isIndoor: true,
//     hasProShop: true,
//     established: 1991,
//     reviews: [
//       {
//         id: 1,
//         user: 'Angel123',
//         rating: 4,
//         comment: 'Perfect for rainy days, great indoor facilities.',
//         date: '2/18/2024',
//         helpful: 12,
//         verified: true
//       }
//     ]
//   },
//   {
//     id: 25,
//     name: 'Portland Eco Courts',
//     surface: 'Outdoor Hard',
//     rating: 4.4,
//     reviewCount: 142,
//     price: 47,
//     city: 'Las Vegas',
//     address: '7012 Green Way',
//     phone: '(555) 567-8765',
//     hours: '7:00 AM - 9:00 PM',
//     amenities: ['Solar Power', 'Recycled Materials', 'Organic Cafe', 'Bike Racks'],
//     image: 'https://picsum.photos/400/300?random=225',
//     distance: '2.8 mi',
//     courts: 5,
//     isIndoor: false,
//     hasProShop: false,
//     established: 2001,
//     reviews: [
//       {
//         id: 1,
//         user: 'Ari456',
//         rating: 4,
//         comment: 'Love the eco-friendly approach, courts are sustainable and well-kept.',
//         date: '2/17/2024',
//         helpful: 10,
//         verified: true
//       }
//     ]
//   }
// ];

export default tennisCourtsMockData;