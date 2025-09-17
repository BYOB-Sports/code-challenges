// Mock data for tennis courts with local tennis court images
export const mockCourts = [
  {
    id: 1,
    name: "Central Park Tennis Center",
    location: "New York, NY",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing courts with perfect lighting! The staff is incredibly helpful and the facilities are top-notch. Worth every penny.",
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "Mike Chen",
        rating: 4,
        comment: "Great location and well-maintained courts. Only downside is it can get quite crowded during peak hours. Booking in advance is a must.",
        createdAt: "2024-01-10T14:20:00Z"
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        rating: 3,
        comment: "Courts are decent but the lighting could be better in the evening. Parking is expensive but convenient. Overall okay experience.",
        createdAt: "2024-01-05T18:45:00Z"
      }
    ],
    description: "Premium tennis facility in the heart of Manhattan with 12 courts and professional coaching.",
    amenities: ["Lighting", "Parking", "Pro Shop", "Locker Rooms"],
    price: "$45/hour"
  },
  {
    id: 2,
    name: "Roland Garros Club",
    location: "Paris, France",
    rating: 5,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 4,
        name: "Pierre Dubois",
        rating: 5,
        comment: "Magnifique! The clay courts are absolutely perfect. The restaurant has excellent food and the spa is a great addition after a long match.",
        createdAt: "2024-01-20T16:15:00Z"
      },
      {
        id: 5,
        name: "Anna Schmidt",
        rating: 5,
        comment: "World-class facility with impeccable service. The courts are maintained to professional standards. Worth every euro!",
        createdAt: "2024-01-18T11:30:00Z"
      }
    ],
    description: "Historic clay court facility with 8 courts and world-class amenities.",
    amenities: ["Clay Courts", "Restaurant", "Spa", "Parking"],
    price: "€60/hour"
  },
  {
    id: 3,
    name: "Wimbledon Lawn Tennis",
    location: "London, UK",
    rating: 4,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 6,
        name: "James Wilson",
        rating: 4,
        comment: "Playing on grass courts is a unique experience! The clubhouse has great atmosphere and the bar serves excellent drinks.",
        createdAt: "2024-01-22T19:00:00Z"
      },
      {
        id: 7,
        name: "Charlotte Brown",
        rating: 4,
        comment: "Beautiful traditional setting. The grass is well-maintained but can be slippery when wet. Staff is very professional.",
        createdAt: "2024-01-19T14:45:00Z"
      }
    ],
    description: "Traditional grass court facility with 6 pristine courts.",
    amenities: ["Grass Courts", "Clubhouse", "Bar", "Parking"],
    price: "£80/hour"
  },
  {
    id: 4,
    name: "Melbourne Tennis Academy",
    location: "Melbourne, Australia",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 8,
        name: "David Thompson",
        rating: 5,
        comment: "Excellent coaching staff and modern facilities. The gym is well-equipped and the café has great coffee. Highly recommended!",
        createdAt: "2024-01-25T08:30:00Z"
      },
      {
        id: 9,
        name: "Lisa Wang",
        rating: 3,
        comment: "Good courts but quite expensive. The parking can be challenging during peak times. Staff is friendly though.",
        createdAt: "2024-01-21T17:20:00Z"
      }
    ],
    description: "Modern facility with 16 courts and comprehensive training programs.",
    amenities: ["Hard Courts", "Gym", "Café", "Parking"],
    price: "A$55/hour"
  },
  {
    id: 5,
    name: "Flushing Meadows Courts",
    location: "Queens, NY",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 10,
        name: "Robert Martinez",
        rating: 4,
        comment: "Playing where the pros play is incredible! The courts are in excellent condition and the facilities are world-class.",
        createdAt: "2024-01-23T12:15:00Z"
      },
      {
        id: 11,
        name: "Jennifer Lee",
        rating: 4,
        comment: "Great experience overall. The food court has good options and parking is convenient. Courts are well-maintained.",
        createdAt: "2024-01-20T15:30:00Z"
      }
    ],
    description: "US Open venue with 22 courts and professional-grade facilities.",
    amenities: ["Hard Courts", "Stadium", "Food Court", "Parking"],
    price: "$65/hour"
  },
  {
    id: 6,
    name: "Monte Carlo Tennis Club",
    location: "Monaco",
    rating: 5,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 12,
        name: "Sophie Laurent",
        rating: 5,
        comment: "Absolutely stunning location with breathtaking views! The clay courts are perfect and the valet service is impeccable. Pure luxury.",
        createdAt: "2024-01-24T13:45:00Z"
      },
      {
        id: 13,
        name: "Alexander Petrov",
        rating: 5,
        comment: "Worth every euro! The spa treatments after tennis are divine. Staff goes above and beyond to make your experience memorable.",
        createdAt: "2024-01-21T16:30:00Z"
      }
    ],
    description: "Luxury tennis club with 4 clay courts overlooking the Mediterranean.",
    amenities: ["Clay Courts", "Spa", "Restaurant", "Valet"],
    price: "€120/hour"
  },
  {
    id: 7,
    name: "Indian Wells Tennis Garden",
    location: "California, USA",
    rating: 5,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 14,
        name: "Maria Garcia",
        rating: 5,
        comment: "Incredible facility! Playing on the same courts as the pros is amazing. The stadium atmosphere is electric even during practice.",
        createdAt: "2024-01-26T10:15:00Z"
      },
      {
        id: 15,
        name: "Kevin O'Brien",
        rating: 4,
        comment: "Fantastic courts and great restaurant. Only complaint is the price, but you get what you pay for. World-class experience.",
        createdAt: "2024-01-23T15:20:00Z"
      }
    ],
    description: "World-class facility with 29 courts and tournament-grade amenities.",
    amenities: ["Hard Courts", "Stadium", "Restaurant", "Parking"],
    price: "$75/hour"
  },
  {
    id: 8,
    name: "Madrid Tennis Center",
    location: "Madrid, Spain",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 16,
        name: "Carlos Mendez",
        rating: 4,
        comment: "Great clay courts and excellent coaching staff. The gym is well-equipped and the café has good coffee. Good value for money.",
        createdAt: "2024-01-25T11:30:00Z"
      },
      {
        id: 17,
        name: "Isabella Torres",
        rating: 4,
        comment: "Nice facility with modern amenities. The courts are well-maintained and the staff is friendly. Parking can be tricky though.",
        createdAt: "2024-01-22T14:45:00Z"
      }
    ],
    description: "Modern clay court facility with 12 courts and excellent coaching staff.",
    amenities: ["Clay Courts", "Gym", "Café", "Parking"],
    price: "€45/hour"
  },
  {
    id: 9,
    name: "Tokyo Tennis Club",
    location: "Tokyo, Japan",
    rating: 4,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 18,
        name: "Yuki Tanaka",
        rating: 5,
        comment: "Amazing high-tech facility! The training equipment is state-of-the-art and the courts are perfectly maintained. Staff is very professional.",
        createdAt: "2024-01-27T09:00:00Z"
      },
      {
        id: 19,
        name: "Michael Johnson",
        rating: 3,
        comment: "Good courts but quite expensive. The technology features are impressive but the restaurant could have better options.",
        createdAt: "2024-01-24T18:15:00Z"
      }
    ],
    description: "High-tech facility with 8 courts and advanced training equipment.",
    amenities: ["Hard Courts", "Technology", "Restaurant", "Parking"],
    price: "¥8,000/hour"
  },
  {
    id: 10,
    name: "Dubai Tennis Academy",
    location: "Dubai, UAE",
    rating: 5,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 20,
        name: "Ahmed Al-Rashid",
        rating: 5,
        comment: "Luxury at its finest! The courts are immaculate and the coaching is world-class. The spa treatments are the perfect way to end a session.",
        createdAt: "2024-01-28T16:30:00Z"
      },
      {
        id: 21,
        name: "Sarah Williams",
        rating: 4,
        comment: "Beautiful facility with excellent amenities. The valet service is convenient and the restaurant has great food. Highly recommended!",
        createdAt: "2024-01-25T19:45:00Z"
      }
    ],
    description: "Luxury tennis academy with 6 courts and world-class coaching.",
    amenities: ["Hard Courts", "Spa", "Restaurant", "Valet"],
    price: "AED 300/hour"
  },
  {
    id: 11,
    name: "Barcelona Tennis Club",
    location: "Barcelona, Spain",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 22,
        name: "Elena Rodriguez",
        rating: 4,
        comment: "Beautiful clay courts with traditional Spanish charm. The bar has great atmosphere and the staff is very welcoming. Good value!",
        createdAt: "2024-01-29T12:00:00Z"
      },
      {
        id: 23,
        name: "Thomas Mueller",
        rating: 4,
        comment: "Nice club with good facilities. The courts are well-maintained and the clubhouse has character. Parking is available nearby.",
        createdAt: "2024-01-26T16:30:00Z"
      }
    ],
    description: "Traditional clay court club with 10 courts and rich history.",
    amenities: ["Clay Courts", "Clubhouse", "Bar", "Parking"],
    price: "€40/hour"
  },
  {
    id: 12,
    name: "Miami Tennis Center",
    location: "Miami, FL",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 24,
        name: "Carlos Silva",
        rating: 4,
        comment: "Great tropical setting with ocean views! The courts are well-maintained and the pool area is perfect for cooling off after tennis.",
        createdAt: "2024-01-30T14:15:00Z"
      },
      {
        id: 25,
        name: "Amanda Foster",
        rating: 4,
        comment: "Nice facility with good amenities. The restaurant has decent food and the staff is friendly. Can get quite hot in summer though.",
        createdAt: "2024-01-27T11:45:00Z"
      }
    ],
    description: "Tropical tennis facility with 14 courts and ocean views.",
    amenities: ["Hard Courts", "Pool", "Restaurant", "Parking"],
    price: "$50/hour"
  },
  {
    id: 13,
    name: "Rome Tennis Club",
    location: "Rome, Italy",
    rating: 4,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 26,
        name: "Marco Rossi",
        rating: 4,
        comment: "Bella! The clay courts have that authentic Italian feel. The restaurant serves excellent pasta and the spa is very relaxing.",
        createdAt: "2024-01-31T15:30:00Z"
      },
      {
        id: 27,
        name: "Jennifer Taylor",
        rating: 4,
        comment: "Charming club with historic atmosphere. The courts are well-kept and the staff is professional. Great location in the city.",
        createdAt: "2024-01-28T10:20:00Z"
      }
    ],
    description: "Historic clay court facility with 8 courts and Italian charm.",
    amenities: ["Clay Courts", "Restaurant", "Spa", "Parking"],
    price: "€50/hour"
  },
  {
    id: 14,
    name: "Shanghai Tennis Center",
    location: "Shanghai, China",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 28,
        name: "Wei Zhang",
        rating: 5,
        comment: "Modern facility with excellent equipment! The courts are perfectly maintained and the gym has everything you need. Staff is very helpful.",
        createdAt: "2024-02-01T09:00:00Z"
      },
      {
        id: 29,
        name: "David Kim",
        rating: 3,
        comment: "Good courts but quite expensive for the area. The restaurant has limited options and parking can be challenging. Overall decent.",
        createdAt: "2024-01-29T17:15:00Z"
      }
    ],
    description: "Modern facility with 16 courts and state-of-the-art equipment.",
    amenities: ["Hard Courts", "Gym", "Restaurant", "Parking"],
    price: "¥400/hour"
  },
  {
    id: 15,
    name: "Toronto Tennis Club",
    location: "Toronto, Canada",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 30,
        name: "Michael Brown",
        rating: 4,
        comment: "Great indoor/outdoor facility! Perfect for year-round play. The gym is well-equipped and the café has good coffee. Good value for money.",
        createdAt: "2024-02-02T13:30:00Z"
      },
      {
        id: 31,
        name: "Sarah Johnson",
        rating: 4,
        comment: "Nice club with friendly staff. The courts are well-maintained and the facilities are clean. Parking is convenient and free.",
        createdAt: "2024-01-30T16:45:00Z"
      }
    ],
    description: "Indoor/outdoor facility with 12 courts and year-round play.",
    amenities: ["Indoor Courts", "Gym", "Café", "Parking"],
    price: "C$60/hour"
  },
  {
    id: 16,
    name: "Sydney Tennis Academy",
    location: "Sydney, Australia",
    rating: 4,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 32,
        name: "James Wilson",
        rating: 5,
        comment: "Stunning coastal location! The courts have amazing ocean views and the coaching staff is world-class. Perfect for serious players.",
        createdAt: "2024-02-03T11:00:00Z"
      },
      {
        id: 33,
        name: "Emma Davis",
        rating: 3,
        comment: "Beautiful setting but quite expensive. The courts are good but the café could have better food options. Staff is friendly though.",
        createdAt: "2024-01-31T14:20:00Z"
      }
    ],
    description: "Coastal tennis academy with 8 courts and professional coaching.",
    amenities: ["Hard Courts", "Ocean Views", "Café", "Parking"],
    price: "A$50/hour"
  },
  {
    id: 17,
    name: "Berlin Tennis Club",
    location: "Berlin, Germany",
    rating: 4,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 34,
        name: "Hans Weber",
        rating: 4,
        comment: "Sehr gut! Modern facility with excellent amenities. The gym is well-equipped and the restaurant has good German food. Good value.",
        createdAt: "2024-02-04T16:15:00Z"
      },
      {
        id: 35,
        name: "Lisa Schmidt",
        rating: 4,
        comment: "Nice club with friendly atmosphere. The courts are well-maintained and the staff is professional. Parking is available nearby.",
        createdAt: "2024-02-01T12:30:00Z"
      }
    ],
    description: "Modern facility with 10 courts and excellent amenities.",
    amenities: ["Hard Courts", "Gym", "Restaurant", "Parking"],
    price: "€35/hour"
  },
  {
    id: 18,
    name: "Singapore Tennis Center",
    location: "Singapore",
    rating: 5,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 36,
        name: "Raj Patel",
        rating: 5,
        comment: "Fantastic luxury facility! The courts are immaculate and the valet service is excellent. The restaurant has amazing Asian cuisine.",
        createdAt: "2024-02-05T18:30:00Z"
      },
      {
        id: 37,
        name: "Michelle Tan",
        rating: 5,
        comment: "World-class experience! The spa treatments are divine and the staff goes above and beyond. Worth every Singapore dollar!",
        createdAt: "2024-02-02T15:45:00Z"
      }
    ],
    description: "Tropical tennis center with 6 courts and luxury amenities.",
    amenities: ["Hard Courts", "Spa", "Restaurant", "Valet"],
    price: "S$80/hour"
  },
  {
    id: 19,
    name: "Vancouver Tennis Club",
    location: "Vancouver, Canada",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 38,
        name: "Ryan Murphy",
        rating: 4,
        comment: "Beautiful mountain views! The courts are well-maintained and the café has great coffee. Perfect for morning matches with stunning scenery.",
        createdAt: "2024-02-06T08:15:00Z"
      },
      {
        id: 39,
        name: "Jessica Chen",
        rating: 4,
        comment: "Nice facility with good amenities. The courts are clean and the staff is friendly. Parking can be limited during peak times though.",
        createdAt: "2024-02-03T13:20:00Z"
      }
    ],
    description: "Mountain-view tennis club with 8 courts and natural beauty.",
    amenities: ["Hard Courts", "Mountain Views", "Café", "Parking"],
    price: "C$55/hour"
  },
  {
    id: 20,
    name: "Amsterdam Tennis Academy",
    location: "Amsterdam, Netherlands",
    rating: 4,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 40,
        name: "Pieter van der Berg",
        rating: 4,
        comment: "Geweldig! Traditional clay courts with Dutch charm. The bar has great atmosphere and the staff is very welcoming. Good value for money.",
        createdAt: "2024-02-07T17:00:00Z"
      },
      {
        id: 41,
        name: "Sophie Anderson",
        rating: 4,
        comment: "Nice club with friendly atmosphere. The courts are well-kept and the clubhouse has character. Parking is available nearby.",
        createdAt: "2024-02-04T14:30:00Z"
      }
    ],
    description: "Traditional clay court academy with 6 courts and Dutch charm.",
    amenities: ["Clay Courts", "Clubhouse", "Bar", "Parking"],
    price: "€40/hour"
  },
  {
    id: 21,
    name: "Miami Beach Tennis Club",
    location: "Miami, FL",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 42,
        name: "Carlos Martinez",
        rating: 5,
        comment: "Incredible ocean views while playing! The courts are pristine and the staff is very professional. Perfect for a morning match.",
        createdAt: "2024-02-10T09:15:00Z"
      },
      {
        id: 43,
        name: "Jennifer Lee",
        rating: 4,
        comment: "Beautiful location with well-maintained courts. The beach access is a bonus. Can get windy sometimes but still enjoyable.",
        createdAt: "2024-02-08T16:45:00Z"
      }
    ],
    description: "Oceanfront tennis club with 10 courts and stunning beach views.",
    amenities: ["Ocean Views", "Hard Courts", "Beach Access", "Pro Shop"],
    price: "$60/hour"
  },
  {
    id: 22,
    name: "Boston Tennis Society",
    location: "Boston, MA",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 44,
        name: "Robert Thompson",
        rating: 4,
        comment: "Historic club with excellent facilities. The indoor courts are perfect for winter play. Membership includes great social events.",
        createdAt: "2024-02-12T11:30:00Z"
      },
      {
        id: 45,
        name: "Lisa Chen",
        rating: 5,
        comment: "Outstanding coaching staff and well-organized tournaments. The club has a great community feel and excellent facilities.",
        createdAt: "2024-02-09T19:20:00Z"
      }
    ],
    description: "Historic tennis club with 8 indoor and outdoor courts.",
    amenities: ["Indoor Courts", "Coaching", "Tournaments", "Locker Rooms"],
    price: "$50/hour"
  },
  {
    id: 23,
    name: "Seattle Rain Tennis Center",
    location: "Seattle, WA",
    rating: 4,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 46,
        name: "David Wilson",
        rating: 4,
        comment: "Great indoor facility for year-round play. The courts are well-lit and the climate control is perfect. Good value for money.",
        createdAt: "2024-02-14T13:15:00Z"
      },
      {
        id: 47,
        name: "Maria Garcia",
        rating: 5,
        comment: "Excellent facility with friendly staff. The covered courts mean you can play even in Seattle weather. Highly recommended!",
        createdAt: "2024-02-11T15:30:00Z"
      }
    ],
    description: "Covered tennis facility with 6 courts for year-round play.",
    amenities: ["Covered Courts", "Lighting", "Climate Control", "Café"],
    price: "$45/hour"
  },
  {
    id: 24,
    name: "Austin Tennis Academy",
    location: "Austin, TX",
    rating: 5,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 48,
        name: "James Rodriguez",
        rating: 5,
        comment: "Amazing facility with top-notch coaching. The courts are always in perfect condition and the staff is incredibly helpful.",
        createdAt: "2024-02-16T10:45:00Z"
      },
      {
        id: 49,
        name: "Sarah Kim",
        rating: 4,
        comment: "Great academy with excellent programs for all levels. The pro shop has everything you need and the courts are well-maintained.",
        createdAt: "2024-02-13T17:00:00Z"
      }
    ],
    description: "Premier tennis academy with 12 courts and professional coaching.",
    amenities: ["Hard Courts", "Coaching", "Pro Shop", "Tournaments"],
    price: "$55/hour"
  },
  {
    id: 25,
    name: "Denver Mountain Tennis",
    location: "Denver, CO",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 50,
        name: "Michael Brown",
        rating: 4,
        comment: "Beautiful mountain setting with well-maintained courts. The altitude makes for interesting play. Great views and fresh air.",
        createdAt: "2024-02-18T14:20:00Z"
      },
      {
        id: 51,
        name: "Emily Davis",
        rating: 5,
        comment: "Stunning location with excellent facilities. The mountain views are incredible and the courts are in perfect condition.",
        createdAt: "2024-02-15T11:15:00Z"
      }
    ],
    description: "Mountain tennis club with 8 courts and breathtaking views.",
    amenities: ["Mountain Views", "Hard Courts", "Altitude Training", "Lodge"],
    price: "$50/hour"
  },
  {
    id: 26,
    name: "Portland Tennis Club",
    location: "Portland, OR",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 52,
        name: "Alex Johnson",
        rating: 4,
        comment: "Great club with friendly atmosphere. The courts are well-maintained and the clubhouse has a nice community feel.",
        createdAt: "2024-02-20T16:30:00Z"
      },
      {
        id: 53,
        name: "Rachel Green",
        rating: 5,
        comment: "Excellent facility with great coaching staff. The tournaments are well-organized and the social events are fun.",
        createdAt: "2024-02-17T12:45:00Z"
      }
    ],
    description: "Community tennis club with 6 courts and active social calendar.",
    amenities: ["Hard Courts", "Coaching", "Tournaments", "Social Events"],
    price: "$40/hour"
  },
  {
    id: 27,
    name: "Las Vegas Tennis Center",
    location: "Las Vegas, NV",
    rating: 4,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 54,
        name: "Tony Martinez",
        rating: 4,
        comment: "Great facility with excellent lighting for evening play. The courts are well-maintained and the staff is very professional.",
        createdAt: "2024-02-22T19:00:00Z"
      },
      {
        id: 55,
        name: "Jessica White",
        rating: 5,
        comment: "Perfect for year-round play with climate-controlled courts. The pro shop has great equipment and the coaching is top-notch.",
        createdAt: "2024-02-19T15:15:00Z"
      }
    ],
    description: "Climate-controlled tennis center with 10 courts for year-round play.",
    amenities: ["Climate Control", "Lighting", "Pro Shop", "Coaching"],
    price: "$50/hour"
  },
  {
    id: 28,
    name: "Nashville Music City Tennis",
    location: "Nashville, TN",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 56,
        name: "Billy Johnson",
        rating: 4,
        comment: "Great club with a fun atmosphere. The courts are well-kept and the music-themed events are unique and entertaining.",
        createdAt: "2024-02-24T13:30:00Z"
      },
      {
        id: 57,
        name: "Amanda Taylor",
        rating: 5,
        comment: "Love the music theme and friendly staff. The courts are in excellent condition and the clubhouse has great character.",
        createdAt: "2024-02-21T17:45:00Z"
      }
    ],
    description: "Music-themed tennis club with 8 courts and unique atmosphere.",
    amenities: ["Hard Courts", "Music Events", "Clubhouse", "Bar"],
    price: "$45/hour"
  },
  {
    id: 29,
    name: "Phoenix Desert Tennis",
    location: "Phoenix, AZ",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 58,
        name: "Carlos Rodriguez",
        rating: 4,
        comment: "Great facility with excellent early morning and evening play options. The courts are well-maintained despite the heat.",
        createdAt: "2024-02-26T08:30:00Z"
      },
      {
        id: 59,
        name: "Lisa Martinez",
        rating: 5,
        comment: "Perfect for winter play when it's cold elsewhere. The covered courts provide shade and the facilities are excellent.",
        createdAt: "2024-02-23T16:00:00Z"
      }
    ],
    description: "Desert tennis club with 8 courts and covered play areas.",
    amenities: ["Covered Courts", "Desert Views", "Early Hours", "Pro Shop"],
    price: "$45/hour"
  },
  {
    id: 30,
    name: "Minneapolis Winter Tennis",
    location: "Minneapolis, MN",
    rating: 4,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 60,
        name: "John Anderson",
        rating: 4,
        comment: "Excellent indoor facility for year-round play. The courts are well-lit and the climate control is perfect for Minnesota winters.",
        createdAt: "2024-02-28T14:15:00Z"
      },
      {
        id: 61,
        name: "Susan Wilson",
        rating: 5,
        comment: "Great club with friendly members and excellent coaching. The indoor courts mean you can play even in the coldest weather.",
        createdAt: "2024-02-25T11:30:00Z"
      }
    ],
    description: "Indoor tennis facility with 6 courts for year-round play.",
    amenities: ["Indoor Courts", "Climate Control", "Coaching", "Locker Rooms"],
    price: "$50/hour"
  },
  {
    id: 31,
    name: "Orlando Sunshine Tennis",
    location: "Orlando, FL",
    rating: 4,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 62,
        name: "Mike Disney",
        rating: 4,
        comment: "Great facility with excellent courts. The Florida weather means year-round outdoor play. Good value for money.",
        createdAt: "2024-03-01T15:45:00Z"
      },
      {
        id: 63,
        name: "Sarah Magic",
        rating: 5,
        comment: "Perfect courts with great lighting for evening play. The staff is very friendly and the facilities are well-maintained.",
        createdAt: "2024-02-27T18:30:00Z"
      }
    ],
    description: "Year-round outdoor tennis facility with 8 courts.",
    amenities: ["Outdoor Courts", "Lighting", "Year-round Play", "Pro Shop"],
    price: "$45/hour"
  },
  {
    id: 32,
    name: "San Antonio River Tennis",
    location: "San Antonio, TX",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 64,
        name: "Jose Rivera",
        rating: 4,
        comment: "Beautiful location near the river with well-maintained courts. The Texas heat can be intense but the covered courts help.",
        createdAt: "2024-03-03T10:15:00Z"
      },
      {
        id: 65,
        name: "Maria Santos",
        rating: 5,
        comment: "Excellent facility with great coaching staff. The river views are beautiful and the courts are always in perfect condition.",
        createdAt: "2024-02-29T16:45:00Z"
      }
    ],
    description: "Riverside tennis club with 6 courts and scenic views.",
    amenities: ["River Views", "Covered Courts", "Coaching", "Parking"],
    price: "$40/hour"
  },
  {
    id: 33,
    name: "Kansas City Tennis Club",
    location: "Kansas City, MO",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 66,
        name: "Tom Johnson",
        rating: 4,
        comment: "Great club with friendly atmosphere. The courts are well-maintained and the clubhouse has a nice community feel.",
        createdAt: "2024-03-05T13:20:00Z"
      },
      {
        id: 67,
        name: "Jennifer Smith",
        rating: 5,
        comment: "Excellent facility with great coaching and tournaments. The social events are fun and the members are very welcoming.",
        createdAt: "2024-03-02T19:00:00Z"
      }
    ],
    description: "Community tennis club with 8 courts and active social calendar.",
    amenities: ["Hard Courts", "Coaching", "Tournaments", "Social Events"],
    price: "$45/hour"
  },
  {
    id: 34,
    name: "Cleveland Lake Tennis",
    location: "Cleveland, OH",
    rating: 4,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 68,
        name: "Bob Lake",
        rating: 4,
        comment: "Great location near the lake with excellent courts. The indoor facility is perfect for winter play in Ohio.",
        createdAt: "2024-03-07T11:30:00Z"
      },
      {
        id: 69,
        name: "Patricia Shore",
        rating: 5,
        comment: "Beautiful facility with lake views and well-maintained courts. The staff is professional and the coaching is excellent.",
        createdAt: "2024-03-04T15:15:00Z"
      }
    ],
    description: "Lakefront tennis club with indoor and outdoor courts.",
    amenities: ["Lake Views", "Indoor Courts", "Coaching", "Locker Rooms"],
    price: "$50/hour"
  },
  {
    id: 35,
    name: "Tampa Bay Tennis Center",
    location: "Tampa, FL",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 70,
        name: "Carlos Bay",
        rating: 4,
        comment: "Great facility with excellent courts and bay views. The Florida weather allows for year-round outdoor play.",
        createdAt: "2024-03-09T14:45:00Z"
      },
      {
        id: 71,
        name: "Isabella Gulf",
        rating: 5,
        comment: "Perfect courts with beautiful bay views. The staff is very friendly and the facilities are top-notch.",
        createdAt: "2024-03-06T17:30:00Z"
      }
    ],
    description: "Bayfront tennis center with 10 courts and water views.",
    amenities: ["Bay Views", "Outdoor Courts", "Year-round Play", "Pro Shop"],
    price: "$55/hour"
  },
  {
    id: 36,
    name: "Pittsburgh Steel Tennis",
    location: "Pittsburgh, PA",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 72,
        name: "Steel Mike",
        rating: 4,
        comment: "Great club with industrial charm. The courts are well-maintained and the clubhouse has character. Good value for money.",
        createdAt: "2024-03-11T12:15:00Z"
      },
      {
        id: 73,
        name: "Steel Sarah",
        rating: 5,
        comment: "Excellent facility with friendly staff and great coaching. The tournaments are well-organized and competitive.",
        createdAt: "2024-03-08T16:00:00Z"
      }
    ],
    description: "Industrial-themed tennis club with 6 courts and character.",
    amenities: ["Hard Courts", "Coaching", "Tournaments", "Clubhouse"],
    price: "$40/hour"
  },
  {
    id: 37,
    name: "Cincinnati Queen City Tennis",
    location: "Cincinnati, OH",
    rating: 4,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 74,
        name: "Queen Mike",
        rating: 4,
        comment: "Great club with royal atmosphere. The courts are well-maintained and the staff treats you like royalty.",
        createdAt: "2024-03-13T13:30:00Z"
      },
      {
        id: 75,
        name: "Queen Lisa",
        rating: 5,
        comment: "Excellent facility with premium amenities. The coaching is top-notch and the tournaments are well-organized.",
        createdAt: "2024-03-10T18:45:00Z"
      }
    ],
    description: "Premium tennis club with 8 courts and royal treatment.",
    amenities: ["Premium Courts", "Coaching", "Spa", "Fine Dining"],
    price: "$65/hour"
  },
  {
    id: 38,
    name: "Milwaukee Brewers Tennis",
    location: "Milwaukee, WI",
    rating: 4,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 76,
        name: "Brew Mike",
        rating: 4,
        comment: "Great club with beer-themed events. The courts are well-maintained and the clubhouse has a fun atmosphere.",
        createdAt: "2024-03-15T15:00:00Z"
      },
      {
        id: 77,
        name: "Brew Sarah",
        rating: 5,
        comment: "Excellent facility with unique events and great coaching. The beer garden after matches is a nice touch.",
        createdAt: "2024-03-12T19:15:00Z"
      }
    ],
    description: "Beer-themed tennis club with 6 courts and unique events.",
    amenities: ["Hard Courts", "Beer Garden", "Events", "Coaching"],
    price: "$45/hour"
  },
  {
    id: 39,
    name: "Raleigh Research Tennis",
    location: "Raleigh, NC",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 78,
        name: "Research Tom",
        rating: 4,
        comment: "Great club with tech-savvy members. The courts are well-maintained and the club uses modern technology for bookings.",
        createdAt: "2024-03-17T11:45:00Z"
      },
      {
        id: 79,
        name: "Research Jane",
        rating: 5,
        comment: "Excellent facility with innovative features. The coaching uses video analysis and the tournaments are well-organized.",
        createdAt: "2024-03-14T16:30:00Z"
      }
    ],
    description: "Tech-forward tennis club with 8 courts and modern amenities.",
    amenities: ["Tech Features", "Video Analysis", "Online Booking", "Coaching"],
    price: "$50/hour"
  },
  {
    id: 40,
    name: "Richmond Capital Tennis",
    location: "Richmond, VA",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 80,
        name: "Capital Bob",
        rating: 4,
        comment: "Great club with historical charm. The courts are well-maintained and the clubhouse has character from the colonial era.",
        createdAt: "2024-03-19T14:00:00Z"
      },
      {
        id: 81,
        name: "Capital Mary",
        rating: 5,
        comment: "Excellent facility with rich history and great coaching. The tournaments are competitive and well-organized.",
        createdAt: "2024-03-16T17:45:00Z"
      }
    ],
    description: "Historic tennis club with 6 courts and colonial charm.",
    amenities: ["Historic Courts", "Coaching", "Tournaments", "Clubhouse"],
    price: "$45/hour"
  },
  {
    id: 41,
    name: "Louisville Derby Tennis",
    location: "Louisville, KY",
    rating: 4,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 82,
        name: "Derby Jim",
        rating: 4,
        comment: "Great club with horse racing theme. The courts are well-maintained and the Derby-themed events are fun and unique.",
        createdAt: "2024-03-21T12:30:00Z"
      },
      {
        id: 83,
        name: "Derby Kate",
        rating: 5,
        comment: "Excellent facility with unique atmosphere. The coaching is great and the tournaments have a competitive spirit.",
        createdAt: "2024-03-18T18:00:00Z"
      }
    ],
    description: "Derby-themed tennis club with 8 courts and racing spirit.",
    amenities: ["Hard Courts", "Derby Events", "Coaching", "Bar"],
    price: "$45/hour"
  },
  {
    id: 42,
    name: "Memphis Blues Tennis",
    location: "Memphis, TN",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 84,
        name: "Blues Sam",
        rating: 4,
        comment: "Great club with music heritage. The courts are well-maintained and the blues-themed events are entertaining.",
        createdAt: "2024-03-23T15:15:00Z"
      },
      {
        id: 85,
        name: "Blues Ella",
        rating: 5,
        comment: "Excellent facility with soulful atmosphere. The coaching is great and the tournaments have a musical flair.",
        createdAt: "2024-03-20T19:30:00Z"
      }
    ],
    description: "Blues-themed tennis club with 6 courts and musical heritage.",
    amenities: ["Hard Courts", "Music Events", "Coaching", "Live Music"],
    price: "$40/hour"
  },
  {
    id: 43,
    name: "Oklahoma City Thunder Tennis",
    location: "Oklahoma City, OK",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 86,
        name: "Thunder Mike",
        rating: 4,
        comment: "Great club with energetic atmosphere. The courts are well-maintained and the staff is very enthusiastic.",
        createdAt: "2024-03-25T13:45:00Z"
      },
      {
        id: 87,
        name: "Thunder Lisa",
        rating: 5,
        comment: "Excellent facility with high energy. The coaching is dynamic and the tournaments are very competitive.",
        createdAt: "2024-03-22T17:15:00Z"
      }
    ],
    description: "High-energy tennis club with 8 courts and thunderous spirit.",
    amenities: ["Hard Courts", "Energy Events", "Coaching", "Fitness"],
    price: "$45/hour"
  },
  {
    id: 44,
    name: "Albuquerque Desert Tennis",
    location: "Albuquerque, NM",
    rating: 4,
    image: 'https://images.pexels.com/photos/16038517/pexels-photo-16038517.jpeg',
    reviews: [
      {
        id: 88,
        name: "Desert Carlos",
        rating: 4,
        comment: "Great club with desert views. The courts are well-maintained and the altitude makes for interesting play.",
        createdAt: "2024-03-27T10:30:00Z"
      },
      {
        id: 89,
        name: "Desert Maria",
        rating: 5,
        comment: "Excellent facility with stunning desert scenery. The coaching is great and the tournaments are well-organized.",
        createdAt: "2024-03-24T16:45:00Z"
      }
    ],
    description: "Desert tennis club with 6 courts and mountain views.",
    amenities: ["Desert Views", "Altitude Training", "Coaching", "Lodge"],
    price: "$40/hour"
  },
  {
    id: 45,
    name: "Tucson Cactus Tennis",
    location: "Tucson, AZ",
    rating: 4,
    image: 'https://images.pexels.com/photos/16140853/pexels-photo-16140853.jpeg',
    reviews: [
      {
        id: 90,
        name: "Cactus Tom",
        rating: 4,
        comment: "Great club with desert charm. The courts are well-maintained and the cactus garden adds unique character.",
        createdAt: "2024-03-29T14:00:00Z"
      },
      {
        id: 91,
        name: "Cactus Jane",
        rating: 5,
        comment: "Excellent facility with desert beauty. The coaching is great and the tournaments have a southwestern flair.",
        createdAt: "2024-03-26T18:30:00Z"
      }
    ],
    description: "Desert-themed tennis club with 8 courts and cactus gardens.",
    amenities: ["Desert Gardens", "Hard Courts", "Coaching", "Nature Trails"],
    price: "$45/hour"
  },
  {
    id: 46,
    name: "Fresno Valley Tennis",
    location: "Fresno, CA",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
    reviews: [
      {
        id: 92,
        name: "Valley Bob",
        rating: 4,
        comment: "Great club with agricultural charm. The courts are well-maintained and the valley views are beautiful.",
        createdAt: "2024-03-31T11:15:00Z"
      },
      {
        id: 93,
        name: "Valley Mary",
        rating: 5,
        comment: "Excellent facility with rural beauty. The coaching is great and the tournaments are well-organized.",
        createdAt: "2024-03-28T15:45:00Z"
      }
    ],
    description: "Valley tennis club with 6 courts and agricultural views.",
    amenities: ["Valley Views", "Hard Courts", "Coaching", "Farm Stand"],
    price: "$40/hour"
  },
  {
    id: 47,
    name: "Sacramento Capital Tennis",
    location: "Sacramento, CA",
    rating: 4,
    image: 'https://images.pexels.com/photos/2973104/pexels-photo-2973104.jpeg',
    reviews: [
      {
        id: 94,
        name: "Capital John",
        rating: 4,
        comment: "Great club with political atmosphere. The courts are well-maintained and the government-themed events are interesting.",
        createdAt: "2024-04-02T12:45:00Z"
      },
      {
        id: 95,
        name: "Capital Susan",
        rating: 5,
        comment: "Excellent facility with civic pride. The coaching is great and the tournaments are very competitive.",
        createdAt: "2024-03-30T17:00:00Z"
      }
    ],
    description: "Capital tennis club with 8 courts and civic pride.",
    amenities: ["Hard Courts", "Civic Events", "Coaching", "Government Tours"],
    price: "$50/hour"
  },
  {
    id: 48,
    name: "Long Beach Coastal Tennis",
    location: "Long Beach, CA",
    rating: 4,
    image: 'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg',
    reviews: [
      {
        id: 96,
        name: "Coastal Mike",
        rating: 4,
        comment: "Great club with ocean views. The courts are well-maintained and the coastal breeze makes for pleasant play.",
        createdAt: "2024-04-04T13:30:00Z"
      },
      {
        id: 97,
        name: "Coastal Lisa",
        rating: 5,
        comment: "Excellent facility with beautiful ocean views. The coaching is great and the tournaments are well-organized.",
        createdAt: "2024-04-01T18:15:00Z"
      }
    ],
    description: "Coastal tennis club with 10 courts and ocean views.",
    amenities: ["Ocean Views", "Hard Courts", "Coaching", "Beach Access"],
    price: "$55/hour"
  },
  {
    id: 49,
    name: "Virginia Beach Ocean Tennis",
    location: "Virginia Beach, VA",
    rating: 4,
    image: 'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
    reviews: [
      {
        id: 98,
        name: "Ocean Tom",
        rating: 4,
        comment: "Great club with Atlantic views. The courts are well-maintained and the ocean breeze is refreshing.",
        createdAt: "2024-04-06T14:15:00Z"
      },
      {
        id: 99,
        name: "Ocean Jane",
        rating: 5,
        comment: "Excellent facility with stunning ocean views. The coaching is great and the tournaments have a beach vibe.",
        createdAt: "2024-04-03T19:30:00Z"
      }
    ],
    description: "Atlantic coast tennis club with 8 courts and ocean views.",
    amenities: ["Ocean Views", "Hard Courts", "Beach Access", "Coaching"],
    price: "$50/hour"
  },
  {
    id: 50,
    name: "Norfolk Naval Tennis",
    location: "Norfolk, VA",
    rating: 4,
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
    reviews: [
      {
        id: 100,
        name: "Naval Jack",
        rating: 4,
        comment: "Great club with military precision. The courts are well-maintained and the staff runs things like a well-oiled machine.",
        createdAt: "2024-04-08T15:00:00Z"
      },
      {
        id: 101,
        name: "Naval Sarah",
        rating: 5,
        comment: "Excellent facility with disciplined atmosphere. The coaching is great and the tournaments are very organized.",
        createdAt: "2024-04-05T20:00:00Z"
      }
    ],
    description: "Military-themed tennis club with 6 courts and naval precision.",
    amenities: ["Hard Courts", "Military Events", "Coaching", "Naval Museum"],
    price: "$45/hour"
  }
];

export default mockCourts;