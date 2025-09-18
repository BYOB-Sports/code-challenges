/*const tennisCourts = [];

for (let i = 1; i <= 50; i++) {
  tennisCourts.push({
    id: i,
    name: `Court ${i}`,
    location: `City ${((i - 1) % 10) + 1}`,
    surface: ['Clay', 'Grass', 'Hard'][i % 3],
    rating: (Math.random() * 5).toFixed(1),
    reviews: []
  });
}

export default tennisCourts; */

import { faker } from '@faker-js/faker';

const tennisCourts = [];

const surfaces = ['Clay', 'Grass', 'Hard', 'Carpet'];
const reviewSamples = [
  "Great court with excellent lighting!",
  "Loved the surface and ambiance.",
  "Crowded on weekends but well maintained.",
  "Friendly staff and clean facilities.",
  "Perfect for casual and competitive play."
];

for (let i = 1; i <= 70; i++) {
  tennisCourts.push({
    id: i,
    name: `${faker.location.street()} Court`,
    location: faker.location.city(),
    surface: surfaces[(i - 1) % surfaces.length],
    rating: Number((Math.random() * 5).toFixed(1)),
    reviews: reviewSamples.slice(0, (i % reviewSamples.length) + 1)
  });
}

export default tennisCourts;
