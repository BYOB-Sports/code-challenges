export const courts = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `Court ${i + 1}`,
  location: `Location ${Math.ceil(Math.random() * 20)}`,
  surfaceType: ['Hard', 'Clay', 'Grass'][i % 3],
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  reviews: []
}));
