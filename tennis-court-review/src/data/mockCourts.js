const courts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Court ${i + 1}`,
  location: ["Santa Monica", "Venice Beach", "Downtown", "West LA", "Pasadena"][
    i % 5
  ],
  surface: ["Hard", "Clay", "Grass"][i % 3],
  avgRating: (Math.random() * 2 + 3).toFixed(1),
}));
export default courts;
