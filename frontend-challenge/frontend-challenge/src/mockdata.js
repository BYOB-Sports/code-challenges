import tennis1 from './assets/tennis1.jpg';
import tennis2 from './assets/tennis2.jpg';
import tennis3 from './assets/tennis3.jpeg';
import tennis4 from './assets/tennis4.jpeg';
import tennis5 from './assets/tennis5.jpeg';
import tennis6 from './assets/tennis6.jpeg';
import tennis7 from './assets/tennis7.webp';
import tennis8 from './assets/tennis8.webp';
import tennis9 from './assets/tennis12.webp';
import tennis10 from './assets/tennis10.webp';
import tennis11 from './assets/tennis11.jpg';


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
    image: tennis1 ,
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
    image: tennis2 || 'https://picsum.photos/400/300?random=202',
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
    image: tennis3 || 'https://picsum.photos/400/300?random=203',
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
    image: tennis4 || 'https://picsum.photos/400/300?random=204',
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
    image: tennis5 || 'https://picsum.photos/400/300?random=205',
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
    image: tennis6 || 'https://picsum.photos/400/300?random=206',
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
    image: tennis7 || 'https://picsum.photos/400/300?random=207',
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
    image: tennis8 || 'https://picsum.photos/400/300?random=208',
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
    image: tennis9 || 'https://picsum.photos/400/300?random=209',
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
    image: tennis10 || 'https://picsum.photos/400/300?random=210',
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
  },
  // Continue with remaining 45 courts...
  {
    id: 11,
    name: 'Queens Tennis Center',
    surface: 'Hard Court',
    rating: 4.5,
    reviewCount: 145,
    price: 52,
    city: 'Austin',
    address: '2678 Tennis St',
    phone: '(555) 123-9876',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Ball Machine', 'WiFi'],
    image: tennis11,
    distance: '1.7 mi',
    courts: 5,
    isIndoor: false,
    hasProShop: true,
    established: 1991,
    reviews: [
      {
        id: 1,
        user: 'Dakota890',
        rating: 4,
        comment: 'Love the courts here for year-round play!',
        date: '3/3/2024',
        helpful: 8,
        verified: true
      }
    ]
  },
  {
    id: 12,
    name: 'Bronx Recreation Center',
    surface: 'Clay Court',
    rating: 4.2,
    reviewCount: 98,
    price: 38,
    city: 'Jacksonville',
    address: '3789 Court Ave',
    phone: '(555) 234-9876',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Free Parking', 'Equipment Rental', 'Group Lessons'],
    image: tennis3,
    distance: '4.3 mi',
    courts: 3,
    isIndoor: false,
    hasProShop: false,
    established: 1994,
    reviews: [
      {
        id: 1,
        user: 'Emerson123',
        rating: 4,
        comment: 'Excellent tournament facilities, well-organized events.',
        date: '3/2/2024',
        helpful: 6,
        verified: true
      }
    ]
  },
  {
    id: 13,
    name: 'Staten Island Tennis Club',
    surface: 'Grass Court',
    rating: 4.7,
    reviewCount: 176,
    price: 78,
    city: 'Fort Worth',
    address: '4890 Racket Blvd',
    phone: '(555) 345-9876',
    hours: '5:00 AM - 11:00 PM',
    amenities: ['Night Lighting', 'Restaurant', 'WiFi', 'Clubhouse'],
    image: tennis4,
    distance: '2.9 mi',
    courts: 8,
    isIndoor: false,
    hasProShop: true,
    established: 1980,
    reviews: [
      {
        id: 1,
        user: 'Finley234',
        rating: 5,
        comment: 'Great community feel, met so many fellow tennis enthusiasts.',
        date: '3/1/2024',
        helpful: 14,
        verified: true
      }
    ]
  },
  {
    id: 14,
    name: 'Long Island Tennis Academy',
    surface: 'Hard Court',
    rating: 4.4,
    reviewCount: 203,
    price: 65,
    city: 'Columbus',
    address: '5901 Serve Way',
    phone: '(555) 456-9876',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Ball Machine', 'Pro Shop', 'Private Coaching', 'Locker Rooms'],
    image: tennis5,
    distance: '1.4 mi',
    courts: 7,
    isIndoor: true,
    hasProShop: true,
    established: 1986,
    reviews: [
      {
        id: 1,
        user: 'Harper345',
        rating: 4,
        comment: 'The ball machines are state-of-the-art, perfect for practice.',
        date: '2/28/2024',
        helpful: 10,
        verified: true
      }
    ]
  },
  {
    id: 15,
    name: 'Westchester Elite Courts',
    surface: 'Clay Court',
    rating: 4.6,
    reviewCount: 167,
    price: 71,
    city: 'Charlotte',
    address: '6012 Net Dr',
    phone: '(555) 567-9876',
    hours: '24/7',
    amenities: ['Night Lighting', 'Clubhouse', 'Sauna', 'Free Parking'],
    image: tennis1,
    distance: '3.1 mi',
    courts: 6,
    isIndoor: false,
    hasProShop: true,
    established: 1989,
    reviews: [
      {
        id: 1,
        user: 'Kendall456',
        rating: 5,
        comment: 'Parking is easy and the location is very convenient.',
        date: '2/27/2024',
        helpful: 12,
        verified: false
      }
    ]
  },
  {
    id: 16,
    name: 'Connecticut Country Club',
    surface: 'Indoor Hard',
    rating: 4.3,
    reviewCount: 89,
    price: 55,
    city: 'San Francisco',
    address: '7123 Match Point Dr',
    phone: '(555) 678-9876',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['WiFi', 'Equipment Rental', 'Kids Programs'],
    image: tennis2,
    distance: '2.8 mi',
    courts: 4,
    isIndoor: true,
    hasProShop: false,
    established: 1993,
    reviews: [
      {
        id: 1,
        user: 'Logan567',
        rating: 4,
        comment: 'Great place for kids to learn tennis fundamentals.',
        date: '2/26/2024',
        helpful: 7,
        verified: true
      }
    ]
  },
  {
    id: 17,
    name: 'Jersey Shore Tennis Resort',
    surface: 'Outdoor Hard',
    rating: 4.1,
    reviewCount: 134,
    price: 42,
    city: 'Indianapolis',
    address: '8234 Volley Vista',
    phone: '(555) 789-9876',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Free Parking', 'Spectator Seating', 'First Aid Station'],
    image: tennis3,
    distance: '5.2 mi',
    courts: 5,
    isIndoor: false,
    hasProShop: false,
    established: 1996,
    reviews: [
      {
        id: 1,
        user: 'Parker678',
        rating: 4,
        comment: 'Nice outdoor courts with ocean breeze, very refreshing.',
        date: '2/25/2024',
        helpful: 9,
        verified: true
      }
    ]
  },
  {
    id: 18,
    name: 'Philadelphia Tennis Plaza',
    surface: 'Clay Court',
    rating: 4.4,
    reviewCount: 188,
    price: 63,
    city: 'Seattle',
    address: '9345 Tennis Plaza',
    phone: '(555) 890-9876',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Restaurant', 'Valet Parking'],
    image: tennis4,
    distance: '1.9 mi',
    courts: 6,
    isIndoor: false,
    hasProShop: true,
    established: 1982,
    reviews: [
      {
        id: 1,
        user: 'Quinn789',
        rating: 4,
        comment: 'Love the clay courts here, great for practicing slides.',
        date: '2/24/2024',
        helpful: 11,
        verified: true
      }
    ]
  },
  {
    id: 19,
    name: 'Boston Common Tennis Center',
    surface: 'Hard Court',
    rating: 4.6,
    reviewCount: 156,
    price: 67,
    city: 'Denver',
    address: '1456 Court Square',
    phone: '(555) 901-9876',
    hours: '5:00 AM - 11:00 PM',
    amenities: ['Night Lighting', 'Fitness Center', 'Locker Rooms', 'Equipment Rental'],
    image: tennis5,
    distance: '2.4 mi',
    courts: 8,
    isIndoor: true,
    hasProShop: true,
    established: 1975,
    reviews: [
      {
        id: 1,
        user: 'Reese890',
        rating: 5,
        comment: 'Historic courts with modern amenities, perfect combination.',
        date: '2/23/2024',
        helpful: 14,
        verified: true
      }
    ]
  },
  {
    id: 20,
    name: 'Chicago Lakefront Courts',
    surface: 'Outdoor Hard',
    rating: 4.2,
    reviewCount: 173,
    price: 49,
    city: 'Washington DC',
    address: '2567 Lakeside Dr',
    phone: '(555) 012-9876',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Free Parking', 'Group Lessons', 'Kids Programs', 'Spectator Seating'],
    image:   tennis11,
    distance: '3.7 mi',
    courts: 5,
    isIndoor: false,
    hasProShop: false,
    established: 1999,
    reviews: [
      {
        id: 1,
        user: 'Sage123',
        rating: 4,
        comment: 'Beautiful lakeside location, courts are well-maintained.',
        date: '2/22/2024',
        helpful: 8,
        verified: true
      }
    ]
  },
  // Continue with courts 21-55...
  {
    id: 21,
    name: 'Denver Mountain Tennis Club',
    surface: 'Indoor Hard',
    rating: 4.7,
    reviewCount: 145,
    price: 82,
    city: 'Boston',
    address: '3678 Alpine Way',
    phone: '(555) 123-8765',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Sauna', 'Mountain Views'],
    image: tennis2,
    distance: '4.2 mi',
    courts: 7,
    isIndoor: true,
    hasProShop: true,
    established: 1984,
    reviews: [
      {
        id: 1,
        user: 'Skyler456',
        rating: 5,
        comment: 'Amazing mountain views while playing, truly unique experience.',
        date: '2/21/2024',
        helpful: 16,
        verified: true
      }
    ]
  },
  {
    id: 22,
    name: 'Phoenix Desert Tennis Resort',
    surface: 'Hard Court',
    rating: 4.3,
    reviewCount: 164,
    price: 54,
    city: 'Nashville',
    address: '4789 Desert Bloom Rd',
    phone: '(555) 234-8765',
    hours: '5:30 AM - 10:30 PM',
    amenities: ['Air Conditioning', 'Pool', 'Equipment Rental', 'Cafe'],
    image:  tennis3,
    distance: '2.6 mi',
    courts: 6,
    isIndoor: false,
    hasProShop: false,
    established: 1997,
    reviews: [
      {
        id: 1,
        user: 'Tatum789',
        rating: 4,
        comment: 'Great desert setting, courts stay cool even in summer.',
        date: '2/20/2024',
        helpful: 9,
        verified: true
      }
    ]
  },
  {
    id: 23,
    name: 'Las Vegas Strip Tennis Club',
    surface: 'Clay Court',
    rating: 4.8,
    reviewCount: 198,
    price: 95,
    city: 'Baltimore',
    address: '5890 Neon Lights Blvd',
    phone: '(555) 345-8765',
    hours: '24/7',
    amenities: ['Night Lighting', 'Restaurant', 'Valet Parking', 'Entertainment'],
    image: tennis4,
    distance: '1.3 mi',
    courts: 4,
    isIndoor: false,
    hasProShop: true,
    established: 1989,
    reviews: [
      {
        id: 1,
        user: 'Winter890',
        rating: 5,
        comment: 'Luxurious courts with Vegas flair, unforgettable experience.',
        date: '2/19/2024',
        helpful: 18,
        verified: true
      }
    ]
  },
  {
    id: 24,
    name: 'Seattle Rain Tennis Center',
    surface: 'Indoor Hard',
    rating: 4.5,
    reviewCount: 187,
    price: 69,
    city: 'Portland',
    address: '6901 Drizzle Ave',
    phone: '(555) 456-8765',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Indoor Courts', 'WiFi', 'Coffee Shop', 'Bike Storage'],
    image: tennis5 || 'https://picsum.photos/400/300?random=224',
    distance: '3.4 mi',
    courts: 8,
    isIndoor: true,
    hasProShop: true,
    established: 1991,
    reviews: [
      {
        id: 1,
        user: 'Angel123',
        rating: 4,
        comment: 'Perfect for rainy days, great indoor facilities.',
        date: '2/18/2024',
        helpful: 12,
        verified: true
      }
    ]
  },
  {
    id: 25,
    name: 'Portland Eco Tennis Courts',
    surface: 'Outdoor Hard',
    rating: 4.4,
    reviewCount: 142,
    price: 47,
    city: 'Las Vegas',
    address: '7012 Green Way',
    phone: '(555) 567-8765',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Solar Power', 'Recycled Materials', 'Organic Cafe', 'Bike Racks'],
    image:  tennis6,
    distance: '2.8 mi',
    courts: 5,
    isIndoor: false,
    hasProShop: false,
    established: 2001,
    reviews: [
      {
        id: 1,
        user: 'Ari456',
        rating: 4,
        comment: 'Love the eco-friendly approach, courts are sustainable and well-kept.',
        date: '2/17/2024',
        helpful: 10,
        verified: true
      }
    ]
  },
 
  {
    id: 26,
    name: 'Atlanta Peach Tennis Club',
    surface: 'Clay Court',
    rating: 4.3,
    reviewCount: 124,
    price: 56,
    city: 'Atlanta',
    address: '2890 Peach Tree Rd',
    phone: '(555) 111-2222',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Night Lighting', 'Pro Shop', 'Restaurant'],
    image: tennis7 ,
    distance: '1.9 mi',
    courts: 6,
    isIndoor: false,
    hasProShop: true,
    established: 1988,
    reviews: [
      {
        id: 1,
        user: 'Peach123',
        rating: 4,
        comment: 'Southern hospitality at its finest, great clay courts.',
        date: '2/16/2024',
        helpful: 7,
        verified: true
      }
    ]
  },
  {
    id: 27,
    name: 'Orlando Magic Tennis Center',
    surface: 'Hard Court',
    rating: 4.5,
    reviewCount: 201,
    price: 61,
    city: 'Orlando',
    address: '3456 Magic Kingdom Dr',
    phone: '(555) 222-3333',
    hours: '5:00 AM - 11:00 PM',
    amenities: ['Family Programs', 'Kids Camps', 'Equipment Rental'],
    image: tennis8,
    distance: '2.2 mi',
    courts: 8,
    isIndoor: true,
    hasProShop: true,
    established: 1995,
    reviews: [
      {
        id: 1,
        user: 'Magic789',
        rating: 5,
        comment: 'Family-friendly facility with excellent kids programs.',
        date: '2/15/2024',
        helpful: 13,
        verified: true
      }
    ]
  },
  {
    id: 28,
    name: 'Tampa Bay Tennis Complex',
    surface: 'Outdoor Hard',
    rating: 4.2,
    reviewCount: 156,
    city: 'Tampa',
    address: '4567 Bay Area Blvd',
    phone: '(555) 333-4444',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Free Parking', 'Spectator Seating', 'Tournaments'],
    image:  tennis9,
    distance: '3.5 mi',
    courts: 10,
    isIndoor: false,
    hasProShop: false,
    established: 2000,
    reviews: [
      {
        id: 1,
        user: 'BayPlayer',
        rating: 4,
        comment: 'Large complex with many courts, great for tournaments.',
        date: '2/14/2024',
        helpful: 9,
        verified: true
      }
    ]
  },
  {
    id: 29,
    name: 'Jacksonville Beach Tennis',
    surface: 'Clay Court',
    rating: 4.4,
    reviewCount: 178,
    price: 59,
    city: 'Jacksonville',
    address: '5678 Beach Front Ave',
    phone: '(555) 444-5555',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Ocean Views', 'Beach Access', 'Cafe'],
    image:  tennis10,
    distance: '1.8 mi',
    courts: 4,
    isIndoor: false,
    hasProShop: true,
    established: 1993,
    reviews: [
      {
        id: 1,
        user: 'BeachTennis',
        rating: 5,
        comment: 'Playing tennis with ocean views is simply amazing!',
        date: '2/13/2024',
        helpful: 15,
        verified: true
      }
    ]
  },
  {
    id: 30,
    name: 'Charlotte Queen City Courts',
    surface: 'Indoor Hard',
    rating: 4.6,
    reviewCount: 143,
    price: 73,
    city: 'Charlotte',
    address: '6789 Queen City Dr',
    phone: '(555) 555-6666',
    hours: '5:30 AM - 10:30 PM',
    amenities: ['Climate Control', 'Pro Shop', 'Fitness Center'],
    image: tennis11,
    distance: '2.7 mi',
    courts: 6,
    isIndoor: true,
    hasProShop: true,
    established: 1987,
    reviews: [
      {
        id: 1,
        user: 'QueenPlayer',
        rating: 4,
        comment: 'Excellent climate control, perfect for year-round play.',
        date: '2/12/2024',
        helpful: 8,
        verified: true
      }
    ]
  },
  {
    id: 31,
    name: 'Raleigh Research Tennis Lab',
    surface: 'Hard Court',
    rating: 4.7,
    reviewCount: 189,
    price: 77,
    city: 'Raleigh',
    address: '7890 Research Triangle',
    phone: '(555) 666-7777',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Video Analysis', 'Performance Tracking', 'Tech Integration'],
    image:  tennis1,
    distance: '1.6 mi',
    courts: 5,
    isIndoor: true,
    hasProShop: true,
    established: 2005,
    reviews: [
      {
        id: 1,
        user: 'TechTennis',
        rating: 5,
        comment: 'Love the high-tech approach to tennis training.',
        date: '2/11/2024',
        helpful: 12,
        verified: true
      }
    ]
  },
  {
    id: 32,
    name: 'Nashville Music City Tennis',
    surface: 'Grass Court',
    rating: 4.8,
    reviewCount: 167,
    price: 84,
    city: 'Nashville',
    address: '8901 Music Row',
    phone: '(555) 777-8888',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['Live Music Events', 'Restaurant', 'Bar'],
    image:  tennis4  ,
    distance: '2.3 mi',
    courts: 4,
    isIndoor: false,
    hasProShop: true,
    established: 1992,
    reviews: [
      {
        id: 1,
        user: 'MusicLover',
        rating: 5,
        comment: 'Unique venue with live music during events!',
        date: '2/10/2024',
        helpful: 18,
        verified: true
      }
    ]
  },
  {
    id: 33,
    name: 'Memphis Blues Tennis Club',
    surface: 'Clay Court',
    rating: 4.1,
    reviewCount: 134,
    price: 44,
    city: 'Memphis',
    address: '9012 Beale Street Courts',
    phone: '(555) 888-9999',
    hours: '8:00 AM - 8:00 PM',
    amenities: ['Historic Setting', 'Blues Music', 'Local Culture'],
    image: tennis4,
    distance: '4.1 mi',
    courts: 3,
    isIndoor: false,
    hasProShop: false,
    established: 1985,
    reviews: [
      {
        id: 1,
        user: 'BluesPlayer',
        rating: 4,
        comment: 'Great cultural atmosphere, courts have character.',
        date: '2/9/2024',
        helpful: 6,
        verified: true
      }
    ]
  },
  {
    id: 34,
    name: 'New Orleans Jazz Courts',
    surface: 'Outdoor Hard',
    rating: 4.3,
    reviewCount: 198,
    price: 52,
    city: 'New Orleans',
    address: '1234 French Quarter Courts',
    phone: '(555) 999-0000',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Jazz Atmosphere', 'Creole Cafe', 'Historic District'],
    image:  tennis1,
    distance: '1.4 mi',
    courts: 5,
    isIndoor: false,
    hasProShop: true,
    established: 1978,
    reviews: [
      {
        id: 1,
        user: 'JazzFan',
        rating: 4,
        comment: 'Love the jazz music and creole food after matches.',
        date: '2/8/2024',
        helpful: 11,
        verified: true
      }
    ]
  },
  {
    id: 35,
    name: 'Birmingham Steel Tennis',
    surface: 'Indoor Hard',
    rating: 4.4,
    reviewCount: 156,
    price: 58,
    city: 'Birmingham',
    address: '2345 Steel City Ave',
    phone: '(555) 000-1111',
    hours: '5:00 AM - 11:00 PM',
    amenities: ['Industrial Design', 'Strength Training', 'Recovery Center'],
    image:  tennis6,
    distance: '3.2 mi',
    courts: 7,
    isIndoor: true,
    hasProShop: true,
    established: 1996,
    reviews: [
      {
        id: 1,
        user: 'SteelPlayer',
        rating: 4,
        comment: 'Tough, no-nonsense facility with great training.',
        date: '2/7/2024',
        helpful: 9,
        verified: true
      }
    ]
  },
  {
    id: 36,
    name: 'Louisville Derby Tennis Track',
    surface: 'Grass Court',
    rating: 4.6,
    reviewCount: 203,
    price: 76,
    city: 'Louisville',
    address: '3456 Derby Lane',
    phone: '(555) 111-2222',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Equestrian Theme', 'Mint Juleps', 'Derby Events'],
    image: tennis7     ,
    distance: '2.8 mi',
    courts: 6,
    isIndoor: false,
    hasProShop: true,
    established: 1989,
    reviews: [
      {
        id: 1,
        user: 'DerbyFan',
        rating: 5,
        comment: 'Feels like playing at a horse track, very unique!',
        date: '2/6/2024',
        helpful: 14,
        verified: true
      }
    ]
  },
  {
    id: 37,
    name: 'Cincinnati River Tennis',
    surface: 'Clay Court',
    rating: 4.2,
    reviewCount: 145,
    price: 54,
    city: 'Cincinnati',
    address: '4567 Riverfront Dr',
    phone: '(555) 222-3333',
    hours: '7:00 AM - 9:00 PM',
    amenities: ['River Views', 'Boat Access', 'Waterfront Dining'],
    image: tennis8,
    distance: '1.9 mi',
    courts: 4,
    isIndoor: false,
    hasProShop: false,
    established: 1994,
    reviews: [
      {
        id: 1,
        user: 'RiverPlayer',
        rating: 4,
        comment: 'Beautiful river views while playing tennis.',
        date: '2/5/2024',
        helpful: 8,
        verified: true
      }
    ]
  },
  {
    id: 38,
    name: 'Cleveland Lake Tennis Center',
    surface: 'Hard Court',
    rating: 4.5,
    reviewCount: 167,
    price: 63,
    city: 'Cleveland',
    address: '5678 Lake Erie Shores',
    phone: '(555) 333-4444',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Lake Views', 'Sailing Club', 'Nautical Theme'],
    image: tennis9,
    distance: '2.5 mi',
    courts: 8,
    isIndoor: true,
    hasProShop: true,
    established: 1991,
    reviews: [
      {
        id: 1,
        user: 'LakePlayer',
        rating: 4,
        comment: 'Great lake views and nautical atmosphere.',
        date: '2/4/2024',
        helpful: 10,
        verified: true
      }
    ]
  },
  {
    id: 39,
    name: 'Detroit Motor Tennis Speedway',
    surface: 'Outdoor Hard',
    rating: 4.7,
    reviewCount: 234,
    price: 69,
    city: 'Detroit',
    address: '6789 Motor City Blvd',
    phone: '(555) 444-5555',
    hours: '5:30 AM - 10:30 PM',
    amenities: ['Racing Theme', 'Speed Training', 'Automotive Museum'],
    image: tennis2,
    distance: '1.7 mi',
    courts: 9,
    isIndoor: false,
    hasProShop: true,
    established: 1986,
    reviews: [
      {
        id: 1,
        user: 'SpeedPlayer',
        rating: 5,
        comment: 'Fast-paced training with automotive inspiration!',
        date: '2/3/2024',
        helpful: 16,
        verified: true
      }
    ]
  },
  {
    id: 40,
    name: 'Indianapolis 500 Tennis Circuit',
    surface: 'Indoor Hard',
    rating: 4.8,
    reviewCount: 189,
    price: 81,
    city: 'Indianapolis',
    address: '7890 Speedway Circle',
    phone: '(555) 555-6666',
    hours: '24/7',
    amenities: ['Indy 500 Theme', 'Racing Simulators', 'Victory Lane Lounge'],
    image:  tennis11,
    distance: '3.1 mi',
    courts: 5,
    isIndoor: true,
    hasProShop: true,
    established: 1995,
    reviews: [
      {
        id: 1,
        user: 'IndyFan',
        rating: 5,
        comment: 'Feels like being at the Indy 500, amazing atmosphere!',
        date: '2/2/2024',
        helpful: 19,
        verified: true
      }
    ]
  },
  
];

export default tennisCourtsMockData;
