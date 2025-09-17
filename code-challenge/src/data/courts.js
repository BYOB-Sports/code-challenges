// Generate mock data for 50+ tennis courts
const locations = [
  'Central Park', 'Riverside', 'Downtown', 'Westside', 'East End', 'North Hills', 'South Beach', 
  'Maple Grove', 'Oakwood', 'Pine Valley', 'Elm Street', 'Cedar Ridge', 'Willow Creek', 'Lakeview',
  'Hillside', 'Sunnydale', 'Westfield', 'Eastwood', 'Northridge', 'Southside', 'Fairview', 'Greenwood',
  'Highland Park', 'Brookside', 'Riverview', 'Meadowbrook', 'Sunset Hills', 'Parkview', 'Woodland', 'Harbor Point'
];

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
  'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus',
  'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston',
  'Nashville', 'Baltimore', 'Portland', 'Oklahoma City', 'Las Vegas', 'Milwaukee', 'Albuquerque'
];

const surfaces = ['Hard', 'Clay', 'Grass', 'Artificial Grass', 'Carpet'];
const amenities = [
  'Lights', 'Parking', 'Restrooms', 'Water Fountain', 'Seating', 'Pro Shop',
  'Locker Rooms', 'Showers', 'Café', 'Ball Machine', 'Tennis Wall', 'Backboard'
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateCourts = () => {
  const courts = [];
  
  for (let i = 1; i <= 60; i++) {
    const numCourts = getRandomInt(1, 12);
    const rating = Number((Math.random() * 3 + 2).toFixed(1)); // Rating between 2.0 and 5.0
    const reviewCount = getRandomInt(0, 200);
    const location = getRandomElement(locations);
    const city = getRandomElement(cities);
    const hasLights = Math.random() > 0.3; // 70% chance of having lights
    const isIndoor = Math.random() > 0.7; // 30% chance of being indoor
    
    courts.push({
      id: i,
      name: `${location} Tennis ${i <= 30 ? 'Club' : 'Courts'}`,
      address: `${getRandomInt(100, 9999)} ${getRandomElement(['Main', 'Park', 'Oak', 'Pine', 'Maple', 'Cedar'])} St.`,
      city: city,
      state: 'CA',
      zipCode: getRandomInt(90001, 96162).toString(),
      phone: `(${getRandomInt(200, 999)}) ${getRandomInt(200, 999)}-${getRandomInt(1000, 9999)}`,
      numCourts: numCourts,
      surface: getRandomElement(surfaces),
      lights: hasLights,
      indoor: isIndoor,
      rating: rating,
      reviewCount: reviewCount,
      price: getRandomInt(10, 50),
      amenities: getRandomElements(amenities, getRandomInt(1, 5)),
      description: `Beautiful ${isIndoor ? 'indoor' : 'outdoor'} tennis facility with ${numCourts} ${getRandomElement(['well-maintained', 'professional', 'high-quality'])} ${getRandomElement(surfaces).toLowerCase()} courts${hasLights ? ' and lighting for night play' : ''}.`,
      // Array of tennis court images that will be assigned in order
      imageUrl: [
        'https://keystonesportsconstruction.com/wp-content/uploads/2024/06/Bloomsburg-Residential-2.jpg',
        'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT3J7V0qmNMY1XI_e_DtlHDVL3hJrrXBfx3A&s',
        'https://plus.unsplash.com/premium_photo-1663039984787-b11d7240f592?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzJTIwY291cnR8ZW58MHx8MHx8fDA%3D',
        'https://t4.ftcdn.net/jpg/02/86/26/29/360_F_286262907_RyWIeoVHHhd8BBrgCVpLmGjrqq1ZmfT3.jpg',
        'https://samlarc.org/upload/Amenity/Galleries/2025-01/Monte%20Vista-6.jpeg',
        'https://www.tennis.com.au/sa/files/2021/05/Hardcourt-750x450-700x450.png',
        'https://static.vecteezy.com/system/resources/thumbnails/070/208/814/small_2x/wide-view-of-padel-court-design-with-transparent-glass-walls-photo.jpg',
        'https://recwell.umd.edu/sites/default/files/styles/optimized/public/2023-11/RECWELL.9_12.SO-46%20%282%29.jpg?itok=QS3BYUFn',
        'https://en.reformsports.com/oxegrebi/2019/06/tenis-kortu-cesitleri-nelerdir-zeminlerine-gore-kortlar.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/91/Centre_court_wide_searle.jpg',
        'https://www.as-sportssystems.co.uk/wp-content/uploads/2022/09/tennis-court-surface.png',
        'https://www.dominatorhoop.com/wp-content/uploads/2023/10/shutterstock_2348829715.jpg',
        'https://www.courtone.net/cms/wp-content/uploads/2013/03/NCSU-Tennis-Courts-New-Construction-1.jpg',
        'https://architizer-prod.imgix.net/media/mediadata/uploads/1646405077154Glen_Lake_12.jpg',
        'https://nauathletics.com/images/2023/7/27/20221008_PB_NAU_TENNIS-48.jpg',
        'https://mytennislessons.com/blog/wp-content/uploads/2024/09/image-6-1024x576.png',
        'https://austinparks.org/wp-content/uploads/2021/08/northwest-district-park-tennis-courts-austin-texas-1200x628-1.jpg',
        'https://ca-times.brightspotcdn.com/dims4/default/1257c52/2147483647/strip/true/crop/3940x2627+0+164/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc9%2Fea%2Fcab9ace3427c91e83c2af1537230%2Fwk-tennis-courts-poi-011.jpg',
        'https://s3-media0.fl.yelpcdn.com/bphoto/I9zuQPupk2x9OnJaUKPqHQ/348s.jpg',
      ][i % 20], // Use modulo to cycle through images if there are more courts than images
      reviews: Array.from({ length: Math.min(reviewCount, 5) }, (_, i) => ({
        id: i + 1,
        userName: `User${Math.floor(Math.random() * 1000)}`,
        rating: getRandomInt(1, 5),
        date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString().split('T')[0],
        comment: getRandomElement([
          'Great courts, well maintained!',
          'Love playing here, good surface quality.',
          'Could use better maintenance.',
          'Best courts in town!',
          'Friendly staff and clean facilities.',
          'A bit pricey but worth it.',
          'Needs more lighting in the evening.',
          'Perfect for weekend matches!',
          'Courts are often crowded on weekends.',
          'Good value for the price.'
        ])
      }))
    });
  }
  
  return courts;
};

export const courtsData = generateCourts();

export const getCourtById = (id) => {
  return courtsData.find(court => court.id === parseInt(id));
};

export const searchCourts = (query) => {
  const searchTerm = query.toLowerCase();
  return courtsData.filter(court => 
    court.name.toLowerCase().includes(searchTerm) ||
    court.city.toLowerCase().includes(searchTerm) ||
    court.surface.toLowerCase().includes(searchTerm) ||
    court.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm))
  );
};

export const addReview = (courtId, review) => {
  const court = getCourtById(courtId);
  if (court) {
    const newReview = {
      id: court.reviews.length + 1,
      ...review,
      date: new Date().toISOString().split('T')[0]
    };
    court.reviews.unshift(newReview);
    // Recalculate average rating
    const totalRating = court.reviews.reduce((sum, r) => sum + r.rating, 0);
    court.rating = Number((totalRating / court.reviews.length).toFixed(1));
    court.reviewCount = court.reviews.length;
    return true;
  }
  return false;
};
