export const courts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Court ${i + 1}`,
  location: `Location ${i + 1}`,
  reviews: [],
}));
