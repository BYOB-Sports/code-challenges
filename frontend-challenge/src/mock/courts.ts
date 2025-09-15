// Tennis court mock data generator
// This file defines the data structures and generates mock tennis court data for the app.
export type Review = {
// Review represents a user review for a court, including username, review text, and rating (1-5 stars).
  user: string;
  text: string;
  rating: number; // 1-5
};

export type Court = {
// Court represents a tennis court with its details and a list of reviews.
  id: number;
  name: string;
  city: string;
  surface: 'Clay' | 'Hard' | 'Grass' | 'Acrylic';
  distance_km: number;
  image: string;
  reviews: Review[];
};

const surfaces = ['Clay', 'Hard', 'Grass', 'Acrylic'] as const;
// Possible court surfaces
const cities = [
// Possible cities for courts
  'New York', 'Los Angeles', 'Chicago', 'Miami', 'Dallas',
  'Seattle', 'Boston', 'Denver', 'Atlanta', 'San Diego'
];
const names = [
// Possible court names
  'Central Park Court', 'Sunset Tennis', 'Green Valley',
  'Ocean View', 'Mountain Top', 'River Side',
  'City Sports', 'Ace Arena', 'Grand Slam', 'Champion Grounds'
];
const images = [
// Example images for courts
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
];

function randomInt(min: number, max: number) {
// Returns a random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomReview(): Review {
// Generates a random review object
  const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
  const texts = [
    'Great court, very clean!',
    'Loved the surface, smooth play.',
    'Good for casual games.',
    'Lighting could be better.',
    'Friendly staff and players.',
    'Gets a bit crowded in evenings.',
    'Perfect for beginners.',
    'Well maintained and spacious.',
    'Convenient location.',
    'Nice atmosphere and vibe.',
  ];
  return {
    user: users[randomInt(0, users.length - 1)],
    text: texts[randomInt(0, texts.length - 1)],
    rating: Math.floor(Math.random() * 5) + 1,
  };
}

export const courts: Court[] = Array.from({ length: 100 }, (_, i) => {
// Generates an array of 100 mock courts with random details and reviews
  const reviews = Array.from({ length: randomInt(2, 6) }, randomReview);
  return {
    id: i + 1,
    name: names[randomInt(0, names.length - 1)] + ' #' + (i + 1),
    city: cities[randomInt(0, cities.length - 1)],
    surface: surfaces[randomInt(0, surfaces.length - 1)],
    distance_km: parseFloat((Math.random() * 50 + 1).toFixed(1)),
    image: images[randomInt(0, images.length - 1)],
    reviews,
  };
});
