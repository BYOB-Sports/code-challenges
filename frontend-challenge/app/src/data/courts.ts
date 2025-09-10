import type { Court, Surface } from "../types";

const SURFACES: Surface[] = ["Hard", "Clay", "Grass", "Carpet"];
const CITIES = [
  { city: "Milwaukee", state: "WI" },
  { city: "Madison", state: "WI" },
  { city: "Chicago", state: "IL" },
  { city: "Green Bay", state: "WI" },
  { city: "Minneapolis", state: "MN" },
  { city: "Evanston", state: "IL" },
  { city: "Naperville", state: "IL" },
  { city: "Kenosha", state: "WI" },
  { city: "Waukesha", state: "WI" },
  { city: "Oak Park", state: "IL" },
];

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function generateCourts(n = 100, seed = 42): Court[] {
  const rnd = seededRandom(seed);
  const arr: Court[] = [];
  for (let i = 0; i < n; i++) {
    const c = CITIES[Math.floor(rnd() * CITIES.length)];
    const surface = SURFACES[Math.floor(rnd() * SURFACES.length)];
    const courts = 4 + Math.floor(rnd() * 8);
    const lights = rnd() > 0.4;
    const indoor = rnd() > 0.75;
    const rating = Math.round((3 + rnd() * 2) * 10) / 10;
    const ratingCount = 5 + Math.floor(rnd() * 120);

    arr.push({
      id: `court_${i + 1}`,
      name: `${c.city} ${surface} Courts #${1 + Math.floor(rnd() * 99)}`,
      city: c.city,
      state: c.state,
      surface,
      courts,
      lights,
      indoor,
      rating,
      ratingCount,
    });
  }
  return arr;
}

export const COURTS = generateCourts(100);
