export const COURTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Court ${i + 1}`,
  location: `Location ${i + 1}`,
  surface: ["Clay", "Hard", "Grass"][i % 3],
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
  reviews: [],
}));
