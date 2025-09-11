const CITIES = ["Austin", "Dallas", "Houston", "San Antonio", "Plano", "Frisco"];
const SURFACES = ["Hard", "Clay", "Grass", "Carpet"];

export const courts = Array.from({ length: 60 }, (_, i) => ({
  id: String(i + 1),
  name: `Court ${i + 1}`,
  city: CITIES[i % CITIES.length],
  surface: SURFACES[i % SURFACES.length],
  lights: i % 2 === 0,
  indoor: i % 3 === 0,
  reviews: [], 
}));