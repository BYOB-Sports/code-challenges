const mockCourtsData = [
  {
    id: 1,
    name: "Central Park Tennis Center",
    location: "New York, NY",
    description: "A well-maintained public court with a vibrant community. The surface is hard court, and it's popular year-round.",
    image: "images/image1.jpg",
    reviews: [{ rating: 5, text: "Excellent court! Clean and well-maintained. Always a great game." }, { rating: 4, text: "Good courts, but can get crowded on weekends. Love the location." }]
  },
  {
    id: 2,
    name: "Venice Beach Courts",
    location: "Los Angeles, CA",
    description: "Right next to the beach, these courts offer a unique playing experience. The wind can be a factor, but the view is unbeatable.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "Best place to play tennis in LA. The view is amazing." }]
  },
  {
    id: 3,
    name: "Lincoln Park Courts",
    location: "Chicago, IL",
    description: "A popular urban court with a good mix of players. A great spot for a quick match after work.",
    image: "images/image3.jpg",
    reviews: [{ rating: 4, text: "Solid courts, good lighting in the evening. A bit worn, but playable." }]
  },
  {
    id: 4,
    name: "Golden Gate Park Courts",
    location: "San Francisco, CA",
    description: "Nestled in the beautiful Golden Gate Park, these courts are a scenic place to play. Requires reservations, especially on weekends.",
    image: "images/image4.jpg",
    reviews: [{ rating: 5, text: "Beautiful location and well-kept courts. My favorite place to play." }]
  },
  {
    id: 5,
    name: "Prospect Park Tennis Center",
    location: "Brooklyn, NY",
    description: "A large facility with multiple courts and a pro shop. Great for lessons and clinics.",
    image: "images/image5.jpg",
    reviews: [{ rating: 4, text: "Good quality courts, but the staff can be a bit slow sometimes." }]
  },
  {
    id: 6,
    name: "Washington Park Courts",
    location: "Denver, CO",
    description: "A well-known public court in Denver with a vibrant tennis community. Often busy, so plan ahead.",
    image: "images/image6.jpg",
    reviews: []
  },
  {
    id: 7,
    name: "Lakeside Tennis Club",
    location: "Austin, TX",
    description: "A private club with excellent facilities and a stunning view of the lake.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "Top-notch facilities. Worth the membership fee." }]
  },
  {
    id: 8,
    name: "Belmont Tennis Courts",
    location: "Philadelphia, PA",
    description: "Public courts with a friendly atmosphere. A great place for casual games.",
    image: "images/image8.jpg",
    reviews: [{ rating: 3, text: "The courts are a bit old, but they're free and accessible." }]
  },
  {
    id: 9,
    name: "Grant Park Courts",
    location: "Chicago, IL",
    description: "Centrally located courts with a mix of players. Can be a bit windy at times.",
    image: "images/image9.jpg",
    reviews: []
  },
  {
    id: 10,
    name: "North Park Tennis Center",
    location: "San Diego, CA",
    description: "A large complex with multiple hard courts and some clay courts. Offers lessons and tournaments.",
    image: "images/image10.jpg",
    reviews: [{ rating: 4, text: "Great facilities. The staff is very helpful." }]
  },
  {
    id: 11,
    name: "Arthur Ashe Stadium",
    location: "Queens, NY",
    description: "The largest tennis stadium in the world and the main court of the US Open. An electrifying atmosphere.",
    image: "images/image1.jpg",
    reviews: [{ rating: 5, text: "It's an iconic court. Nothing beats the feeling of playing here." }]
  },
  {
    id: 12,
    name: "Alice Marble Courts",
    location: "San Francisco, CA",
    description: "Situated on Russian Hill, these courts offer breathtaking views of the Golden Gate Bridge and the city skyline.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "The views are incredible! It's a must-play for any tennis fan in SF." }]
  },
  {
    id: 13,
    name: "Underground Racquets",
    location: "Carthage, MO",
    description: "A truly unique experience playing tennis inside a massive limestone cave. The temperature is naturally regulated.",
    image: "images/image3.jpg",
    reviews: [{ rating: 5, text: "The most unique tennis court I've ever seen! An unforgettable experience." }]
  },
  {
    id: 14,
    name: "All Iowa Lawn Tennis Club",
    location: "Charles City, IA",
    description: "A meticulously maintained grass court that's a tribute to Wimbledon. It's free to the public with reservations.",
    image: "images/image4.jpg",
    reviews: [{ rating: 5, text: "A hidden gem! It's amazing that this court is free to play on." }]
  },
  {
    id: 15,
    name: "Grand Hyatt Sky Court",
    location: "Denver, CO",
    description: "A rooftop court in downtown Denver with stunning views of the city skyline and the Rocky Mountains.",
    image: "images/image5.jpg",
    reviews: [{ rating: 4, text: "Views were distracting, but in a good way! A fun place to play." }]
  },
  {
    id: 16,
    name: "Vanderbilt Tennis Club",
    location: "New York, NY",
    description: "A luxurious indoor club located inside Grand Central Terminal. A unique and historic setting for a match.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "Playing here feels like stepping back in time. Worth the price." }]
  },
  {
    id: 17,
    name: "Hurd Tennis Center",
    location: "Waco, TX",
    description: "Part of Baylor University, this complex has 12 outdoor and 6 indoor courts, perfect for year-round play.",
    image: "images/image7.jpg",
    reviews: [{ rating: 4, text: "Great courts and facilities. Well-kept and plenty of courts available." }]
  },
  {
    id: 18,
    name: "Mauna Kea Beach Hotel",
    location: "Big Island, HI",
    description: "A beautiful seaside tennis club with 11 courts right along the ocean's edge. Named one of the top tennis resorts in the world.",
    image: "images/image8.jpg",
    reviews: [{ rating: 5, text: "Paradise on a tennis court. Can't beat the ocean breeze while you play." }]
  },
  {
    id: 19,
    name: "The Courts at Anza-Borrego",
    location: "Borrego Springs, CA",
    description: "A desert oasis with four courts, a pool, and a clubhouse. Surrounded by views of the San Ysidro mountains.",
    image: "images/image9.jpg",
    reviews: [{ rating: 5, text: "Super cool retro vibes. The courts are in great shape." }]
  },
  {
    id: 20,
    name: "International Tennis Hall of Fame",
    location: "Newport, RI",
    description: "Historic grass courts where the first U.S. National Men's Singles Championship was held. A true piece of tennis history.",
    image: "images/image10.jpg",
    reviews: [{ rating: 5, text: "An absolute honor to play on these courts. The atmosphere is incredible." }]
  },
  {
    id: 21,
    name: "Darling Tennis Center",
    location: "Las Vegas, NV",
    description: "A fantastic public facility with 22 hard courts and a stadium court, all with excellent lighting.",
    image: "images/image1.jpg",
    reviews: [{ rating: 4, text: "Great public facility with plenty of courts. Well-run and clean." }]
  },
  {
    id: 22,
    name: "Plaza Tennis Center",
    location: "Kansas City, MO",
    description: "A well-equipped public center with 14 outdoor courts, a pro shop, and locker rooms.",
    image: "images/image2.jpg",
    reviews: [{ rating: 4, text: "Convenient location with good amenities. The pro shop is a nice bonus." }]
  },
  {
    id: 23,
    name: "East River Park Courts",
    location: "New York, NY",
    description: "Courts with a unique backdrop, located directly under the iconic Williamsburg Bridge. A great spot for urban tennis.",
    image: "images/image3.jpg",
    reviews: [{ rating: 3, text: "A bit loud with the traffic, but the views are worth it. Very unique." }]
  },
  {
    id: 24,
    name: "Burnham Shores Park",
    location: "Evanston, IL",
    description: "A picturesque court just north of Chicago, offering beautiful views of Lake Michigan. A peaceful place to play.",
    image: "images/image4.jpg",
    reviews: [{ rating: 5, text: "The perfect lakeside spot. Very serene and beautiful." }]
  },
  {
    id: 25,
    name: "Cope Park",
    location: "Juneau, AK",
    description: "A court well-hidden in the Alaskan wilderness. A true hidden gem for those seeking adventure.",
    image: "images/image5.jpg",
    reviews: [{ rating: 5, text: "An unforgettable experience. The surroundings are breathtaking." }]
  },
  {
    id: 26,
    name: "Madrid Tennis Centre",
    location: "Madrid, Spain",
    description: "Home of the Madrid Masters, this facility has a series of high-tech retractable roofs and a main stadium with over 12,000 seats.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "World-class facilities. A must-visit for any tennis enthusiast." }]
  },
  {
    id: 27,
    name: "Monte-Carlo Country Club",
    location: "Monte Carlo, Monaco",
    description: "A prestigious club with stunning views of the Mediterranean. It hosts the Monte-Carlo Masters.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "An unbelievable place to play. The elegance and views are unmatched." }]
  },
  {
    id: 28,
    name: "Dubai Tennis Centre",
    location: "Dubai, UAE",
    description: "Known for its state-of-art facilities and a stunning location surrounded by skyscrapers.",
    image: "images/image8.jpg",
    reviews: [{ rating: 4, text: "Pristine courts and a fantastic atmosphere. It's truly a top-tier venue." }]
  },
  {
    id: 29,
    name: "Hampton Racquet Club",
    location: "East Hampton, NY",
    description: "A family-owned boutique club that offers a relaxing, country club experience to the public.",
    image: "images/image9.jpg",
    reviews: [{ rating: 4, text: "A great place to unwind and play. The courts are always in great shape." }]
  },
  {
    id: 30,
    name: "Hampton Court Palace",
    location: "London, UK",
    description: "The oldest tennis court in Britain, originally built for King Henry VIII. A historic and beautiful setting.",
    image: "images/image10.jpg",
    reviews: [{ rating: 5, text: "Pure history! It's incredible to play where royalty once did." }]
  },
  {
    id: 31,
    name: "Wimbledon Centre Court",
    location: "London, UK",
    description: "The most iconic tennis court in the world, home to the Wimbledon Championships since 1877.",
    image: "images/image1.jpg",
    reviews: [{ rating: 5, text: "The holy grail of tennis. Playing here is a dream come true." }]
  },
  {
    id: 32,
    name: "Roland Garros",
    location: "Paris, France",
    description: "Home of the French Open and known for its distinctive red clay courts. A challenge for even the best players.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "The clay courts are a different experience entirely. Beautiful and a lot of fun." }]
  },
  {
    id: 33,
    name: "Melbourne Park",
    location: "Melbourne, Australia",
    description: "A major tennis venue with a retractable roof, known for hosting the Australian Open in the summer heat.",
    image: "images/image3.jpg",
    reviews: [{ rating: 4, text: "A great facility with a lot of courts to choose from. Well-maintained." }]
  },
  {
    id: 34,
    name: "Indian Wells Tennis Garden",
    location: "Indian Wells, CA",
    description: "The second-largest tennis stadium in the world. A stunning venue that feels like a mini-Grand Slam.",
    image: "images/image4.jpg",
    reviews: [{ rating: 5, text: "A true gem in the desert. The facilities are incredible and the staff is friendly." }]
  },
  {
    id: 35,
    name: "Enchantment Resort",
    location: "Sedona, AZ",
    description: "Courts set against a backdrop of towering red rock formations. A tranquil and spiritual place to play.",
    image: "images/image5.jpg",
    reviews: [{ rating: 5, text: "The most beautiful court I've ever played on. A truly unique experience." }]
  },
  {
    id: 36,
    name: "The West Side Tennis Club",
    location: "Forest Hills, NY",
    description: "Historic grass courts and a stunning clubhouse that was the original home of the US Open.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "Playing here is like stepping into a time machine. The history is palpable." }]
  },
  {
    id: 37,
    name: "The Madonna Inn",
    location: "San Luis Obispo, CA",
    description: "A court with a unique aesthetic, featuring bright pink and blue playing surfaces. Great for photos!",
    image: "images/image7.jpg",
    reviews: [{ rating: 4, text: "A fun and quirky court. The colors are so vibrant!" }]
  },
  {
    id: 38,
    name: "Sarver Tennis Center",
    location: "Tucson, AZ",
    description: "A clay court in the Arizona desert, with a mountain backdrop that matches the court surface.",
    image: "images/image8.jpg",
    reviews: [{ rating: 4, text: "The clay courts are perfect for a slower game. Great for practice." }]
  },
  {
    id: 39,
    name: "Dolores Park Courts",
    location: "San Francisco, CA",
    description: "A recently remodeled public court in one of San Francisco's most popular parks. Can be crowded, but worth the wait.",
    image: "images/image9.jpg",
    reviews: [{ rating: 3, text: "A fun vibe, but sometimes hard to get on a court. The atmosphere is great though." }]
  },
  {
    id: 40,
    name: "Flint St Courts",
    location: "San Francisco, CA",
    description: "A hidden gem in Corona Heights with two well-maintained courts and great views of the city.",
    image: "images/image10.jpg",
    reviews: [{ rating: 4, text: "Quiet and peaceful. A great place to play without a crowd." }]
  },
  {
    id: 41,
    name: "Ala Moana Park",
    location: "Honolulu, HI",
    description: "A beautiful public park with beachside tennis courts offering stunning views of the Pacific Ocean.",
    image: "images/image1.jpg",
    reviews: [{ rating: 5, text: "Playing tennis with a view of the ocean is unbeatable. My favorite court in Hawaii." }]
  },
  {
    id: 42,
    name: "Barnes Tennis Center",
    location: "San Diego, CA",
    description: "A top-rated public facility in San Diego with numerous courts and a great atmosphere for players of all levels.",
    image: "images/image2.jpg",
    reviews: [{ rating: 4, text: "Great courts and community. Good for both casual and competitive players." }]
  },
  {
    id: 43,
    name: "City of Myrtle Beach Tennis Center",
    location: "Myrtle Beach, SC",
    description: "A clean and well-maintained public center with new lights and recently resurfaced courts.",
    image: "images/image3.jpg",
    reviews: [{ rating: 4, text: "The courts are in excellent condition. A great place to play while on vacation." }]
  },
  {
    id: 44,
    name: "Huntsville Tennis Center",
    location: "Huntsville, AL",
    description: "A large facility with 17 outdoor and 4 indoor courts, perfect for year-round play in any weather.",
    image: "images/image4.jpg",
    reviews: [{ rating: 4, text: "Lots of courts available, and the indoor courts are a lifesaver in the rain." }]
  },
  {
    id: 45,
    name: "Billie Jean King National Tennis Center",
    location: "Flushing, NY",
    description: "Home of the US Open. A massive public complex with over 20 courts for players of all levels.",
    image: "images/image5.jpg",
    reviews: [{ rating: 5, text: "It's a huge complex with so many courts. You can always find a game." }]
  },
  {
    id: 46,
    name: "Diamond Court",
    location: "Beijing, China",
    description: "A large stadium court built for the 2008 Olympics, with a unique 'diamond' shape and a capacity of 15,000.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "An amazing, modern stadium. A great place to play and watch." }]
  },
  {
    id: 47,
    name: "Roy Emerson Stadium",
    location: "Gstaad, Switzerland",
    description: "A picturesque clay court surrounded by the Swiss Alps. A serene and beautiful location for a match.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "The scenery is out of this world. It's a peaceful and beautiful place to play." }]
  },
  {
    id: 48,
    name: "Dorado Beach Resort",
    location: "Dorado, Puerto Rico",
    description: "A beautiful tropical court with ocean views and a great atmosphere. The staff is very friendly.",
    image: "images/image8.jpg",
    reviews: [{ rating: 5, text: "A great resort with excellent courts. Can't beat the tropical setting." }]
  },
  {
    id: 49,
    name: "The O2 Arena",
    location: "London, UK",
    description: "A massive multi-purpose venue that hosts the ATP Finals. An incredible atmosphere for an indoor match.",
    image: "images/image9.jpg",
    reviews: [{ rating: 4, text: "A very professional venue. The atmosphere for the finals is unmatched." }]
  },
  {
    id: 50,
    name: "Kooyong Lawn Tennis Club",
    location: "Melbourne, Australia",
    description: "The original home of the Australian Open. A historic club with beautiful grass courts.",
    image: "images/image10.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 51,
    name: "St. James Park",
    location: "London, UK",
    description: "A historic public court in London with a view of the famous park and surrounding architecture.",
    image: "images/image1.jpg",
    reviews: [{ rating: 4, text: "A great place to play with a lot of history. A must-visit for any tennis fan." }]
  },
  {
    id: 52,
    name: "Gimnasia y Esgrima de Buenos Aires",
    location: "Buenos Aires, Argentina",
    description: "A prestigious club with multiple clay courts and a beautiful clubhouse. A classic South American tennis experience.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "The courts are always in perfect condition. A true pleasure to play here." }]
  },
  {
    id: 53,
    name: "Club de Tenis de la Ciudad de México",
    location: "Mexico City, Mexico",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image3.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 54,
    name: "Mount Royal Tennis Club",
    location: "Montreal, Canada",
    description: "A beautiful and historic club with well-maintained courts and a stunning view of Mount Royal. A great place to play in the summer.",
    image: "images/image4.jpg",
    reviews: [{ rating: 5, text: "A fantastic place to play. The scenery is amazing." }]
  },
  {
    id: 55,
    name: "Miami Tennis Center",
    location: "Miami, FL",
    description: "A large facility with numerous courts and a pro shop. Great for lessons and clinics.",
    image: "images/image5.jpg",
    reviews: [{ rating: 4, text: "Good quality courts, but the staff can be a bit slow sometimes." }]
  },
  {
    id: 56,
    name: "Sydney Olympic Park Tennis Centre",
    location: "Sydney, Australia",
    description: "A modern complex with 22 courts, including a stadium court with a retractable roof. A world-class venue.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "A professional and clean venue. I always love playing here." }]
  },
  {
    id: 57,
    name: "Tennis Club Kitzbühel",
    location: "Kitzbühel, Austria",
    description: "A scenic clay court surrounded by the Austrian Alps. A tranquil and spiritual place to play.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "The most beautiful court I've ever played on. A truly unique experience." }]
  },
  {
    id: 58,
    name: "Fremont Park Courts",
    location: "Fremont, CA",
    description: "A public court with a friendly atmosphere. A great place for casual games.",
    image: "images/image8.jpg",
    reviews: [{ rating: 3, text: "The courts are a bit old, but they're free and accessible." }]
  },
  {
    id: 59,
    name: "The Tennis Center at Crandon Park",
    location: "Key Biscayne, FL",
    description: "A world-class tennis center with 26 courts, including a stadium court with over 7,500 seats. A must-visit for any tennis fan.",
    image: "images/image9.jpg",
    reviews: [{ rating: 5, text: "The facilities are incredible and the staff is friendly." }]
  },
  {
    id: 60,
    name: "Montevideo Tennis Club",
    location: "Montevideo, Uruguay",
    description: "A historic tennis club with a long tradition of producing top-ranked players. The courts are meticulously maintained.",
    image: "images/image10.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The courts are a joy to play on." }]
  },
  {
    id: 61,
    name: "Rock Creek Park Tennis Center",
    location: "Washington, D.C.",
    description: "A well-known public court with a vibrant tennis community. Often busy, so plan ahead.",
    image: "images/image1.jpg",
    reviews: []
  },
  {
    id: 62,
    name: "Tennis Club du Jardin du Luxembourg",
    location: "Paris, France",
    description: "A beautiful public park with tennis courts located in the heart of Paris. A great place to play with a view of the Eiffel Tower.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "Playing here is a dream come true. The views are incredible!" }]
  },
  {
    id: 63,
    name: "The Courts at the Ritz-Carlton, Laguna Niguel",
    location: "Dana Point, CA",
    description: "A luxurious resort with multiple tennis courts and a stunning view of the Pacific Ocean. A perfect place to relax and play.",
    image: "images/image3.jpg",
    reviews: [{ rating: 5, text: "Top-notch facilities. Worth the membership fee." }]
  },
  {
    id: 64,
    name: "Forest Park Tennis Center",
    location: "St. Louis, MO",
    description: "A large public facility with 17 outdoor and 4 indoor courts, perfect for year-round play in any weather.",
    image: "images/image4.jpg",
    reviews: [{ rating: 4, text: "Lots of courts available, and the indoor courts are a lifesaver in the rain." }]
  },
  {
    id: 65,
    name: "Wellington Tennis Club",
    location: "Wellington, New Zealand",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image5.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 66,
    name: "The Courts at the Boulders Resort",
    location: "Scottsdale, AZ",
    description: "Courts set against a backdrop of towering red rock formations. A tranquil and spiritual place to play.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "The most beautiful court I've ever played on. A truly unique experience." }]
  },
  {
    id: 67,
    name: "Tennis Club Barcelona-El Prat",
    location: "Barcelona, Spain",
    description: "A prestigious club with multiple clay courts and a beautiful clubhouse. A classic European tennis experience.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "The courts are always in perfect condition. A true pleasure to play here." }]
  },
  {
    id: 68,
    name: "Foley Square Tennis Courts",
    location: "New York, NY",
    description: "A public court with a friendly atmosphere. A great place for casual games.",
    image: "images/image8.jpg",
    reviews: [{ rating: 3, text: "The courts are a bit old, but they're free and accessible." }]
  },
  {
    id: 69,
    name: "The Tennis Center at the Breakers",
    location: "Palm Beach, FL",
    description: "A world-class tennis center with 26 courts, including a stadium court with over 7,500 seats. A must-visit for any tennis fan.",
    image: "images/image9.jpg",
    reviews: [{ rating: 5, text: "The facilities are incredible and the staff is friendly." }]
  },
  {
    id: 70,
    name: "Hong Kong Tennis Centre",
    location: "Hong Kong, China",
    description: "A modern complex with 22 courts, including a stadium court with a retractable roof. A world-class venue.",
    image: "images/image10.jpg",
    reviews: [{ rating: 5, text: "A professional and clean venue. I always love playing here." }]
  },
  {
    id: 71,
    name: "Cologne Tennis Club",
    location: "Cologne, Germany",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image1.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 72,
    name: "The Tennis Center at the Mission Hills Resort",
    location: "Rancho Mirage, CA",
    description: "A luxurious resort with multiple tennis courts and a stunning view of the mountains. A perfect place to relax and play.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "Top-notch facilities. Worth the membership fee." }]
  },
  {
    id: 73,
    name: "Shanghai Tennis Centre",
    location: "Shanghai, China",
    description: "A modern complex with 22 courts, including a stadium court with a retractable roof. A world-class venue.",
    image: "images/image3.jpg",
    reviews: [{ rating: 5, text: "A professional and clean venue. I always love playing here." }]
  },
  {
    id: 74,
    name: "Rio de Janeiro Tennis Club",
    location: "Rio de Janeiro, Brazil",
    description: "A prestigious club with multiple clay courts and a beautiful clubhouse. A classic South American tennis experience.",
    image: "images/image4.jpg",
    reviews: [{ rating: 5, text: "The courts are always in perfect condition. A true pleasure to play here." }]
  },
  {
    id: 75,
    name: "Lakeside Tennis Club",
    location: "Chicago, IL",
    description: "A public court with a friendly atmosphere. A great place for casual games.",
    image: "images/image5.jpg",
    reviews: [{ rating: 3, text: "The courts are a bit old, but they're free and accessible." }]
  },
  {
    id: 76,
    name: "The Tennis Center at the Biltmore Hotel",
    location: "Coral Gables, FL",
    description: "A historic hotel with multiple tennis courts and a stunning view of the city. A perfect place to relax and play.",
    image: "images/image6.jpg",
    reviews: [{ rating: 5, text: "Top-notch facilities. Worth the membership fee." }]
  },
  {
    id: 77,
    name: "Beijing Tennis Center",
    location: "Beijing, China",
    description: "A modern complex with 22 courts, including a stadium court with a retractable roof. A world-class venue.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "A professional and clean venue. I always love playing here." }]
  },
  {
    id: 78,
    name: "Moscow Tennis Club",
    location: "Moscow, Russia",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image8.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 79,
    name: "The Tennis Center at the Omni La Costa Resort",
    location: "Carlsbad, CA",
    description: "A luxurious resort with multiple tennis courts and a stunning view of the mountains. A perfect place to relax and play.",
    image: "images/image9.jpg",
    reviews: [{ rating: 5, text: "Top-notch facilities. Worth the membership fee." }]
  },
  {
    id: 80,
    name: "Seoul Tennis Club",
    location: "Seoul, South Korea",
    description: "A modern complex with 22 courts, including a stadium court with a retractable roof. A world-class venue.",
    image: "images/image10.jpg",
    reviews: [{ rating: 5, text: "A professional and clean venue. I always love playing here." }]
  },
  {
    id: 81,
    name: "Tokyo Tennis Center",
    location: "Tokyo, Japan",
    description: "A modern complex with 22 courts, including a stadium court with a retractable roof. A world-class venue.",
    image: "images/image1.jpg",
    reviews: [{ rating: 5, text: "A professional and clean venue. I always love playing here." }]
  },
  {
    id: 82,
    name: "Dubai Tennis Club",
    location: "Dubai, UAE",
    description: "A prestigious club with multiple clay courts and a beautiful clubhouse. A classic Middle Eastern tennis experience.",
    image: "images/image2.jpg",
    reviews: [{ rating: 5, text: "The courts are always in perfect condition. A true pleasure to play here." }]
  },
  {
    id: 83,
    name: "Athens Tennis Club",
    location: "Athens, Greece",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image3.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 84,
    name: "Cairo Tennis Club",
    location: "Cairo, Egypt",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image4.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 85,
    name: "Cape Town Tennis Club",
    location: "Cape Town, South Africa",
    description: "A beautiful and historic club with well-maintained courts and a stunning view of Table Mountain. A great place to play in the summer.",
    image: "images/image5.jpg",
    reviews: [{ rating: 5, text: "A fantastic place to play. The scenery is amazing." }]
  },
  {
    id: 86,
    name: "Johannesburg Tennis Club",
    location: "Johannesburg, South Africa",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image6.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 87,
    name: "Nairobi Tennis Club",
    location: "Nairobi, Kenya",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 88,
    name: "Lagos Tennis Club",
    location: "Lagos, Nigeria",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image8.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 89,
    name: "Accra Tennis Club",
    location: "Accra, Ghana",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image9.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 90,
    name: "Casablanca Tennis Club",
    location: "Casablanca, Morocco",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image10.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 91,
    name: "Tunis Tennis Club",
    location: "Tunis, Tunisia",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image1.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 92,
    name: "Algiers Tennis Club",
    location: "Algiers, Algeria",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image2.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 93,
    name: "Tripoli Tennis Club",
    location: "Tripoli, Libya",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image3.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 94,
    name: "Khartoum Tennis Club",
    location: "Khartoum, Sudan",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image4.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 95,
    name: "Addis Ababa Tennis Club",
    location: "Addis Ababa, Ethiopia",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image5.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 96,
    name: "Kinshasa Tennis Club",
    location: "Kinshasa, Democratic Republic of the Congo",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image6.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 97,
    name: "Luanda Tennis Club",
    location: "Luanda, Angola",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image7.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 98,
    name: "Lusaka Tennis Club",
    location: "Lusaka, Zambia",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image8.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  },
  {
    id: 99,
    name: "Harare Tennis Club",
    location: "Harare, Zimbabwe",
    description: "A historic club with beautiful grass courts and a stunning view of the city. A true piece of tennis history.",
    image: "images/image9.jpg",
    reviews: [{ rating: 5, text: "A piece of history. The grass courts are a joy to play on." }]
  },
  {
    id: 100,
    name: "Pretoria Tennis Club",
    location: "Pretoria, South Africa",
    description: "A large tennis club with a friendly community and a variety of court surfaces. A popular spot for local tournaments.",
    image: "images/image10.jpg",
    reviews: [{ rating: 4, text: "Good facilities and a fun atmosphere. The staff is very welcoming." }]
  }
];