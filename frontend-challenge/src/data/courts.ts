// Mocked tennis courts data

export const courts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Court ${i + 1}`,
  location: `${100 + i} Main St, City ${i % 10}`,
  surface: ["Clay", "Hard", "Grass"][i % 3],
  reviews: i % 5 === 0 ? [
    { user: "UserA", rating: 5, comment: "Excellent!" },
    { user: "UserB", rating: 4, comment: "Very good." }
  ] : []
}));
