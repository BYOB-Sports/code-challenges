import type { Borough, Court, Review, Surface } from "../types.ts";

const surfaces: Surface[] = ["Hard", "Clay", "Grass"];
const boroughs: Borough[] = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
  "Other",
];

const rand = (a: number, b: number) => Math.random() * (b - a) + a;
const choice = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const id = () => Math.random().toString(36).slice(2, 10);

export function generateCourts(n = 60): Court[] {
  const out: Court[] = [];
  for (let i = 0; i < n; i++) {
    const rating = Math.round(rand(30, 50)) / 10;
    out.push({
      id: id(),
      name: `Court ${i + 1}`,
      surface: choice(surfaces),
      borough: choice(boroughs),
      lights: Math.random() > 0.5,
      rating,
      reviewsCount: Math.floor(rand(5, 200)),
      address: `${100 + Math.floor(rand(0, 800))} Example St`,
      distanceKm: Math.round(rand(0.3, 15) * 10) / 10,
    });
  }
  return out;
}

export function initialReviews(courtId: string): Review[] {
  const n = Math.floor(rand(0, 4));
  return Array.from({ length: n }).map(() => ({
    id: id(),
    courtId,
    createdAt: Date.now() - Math.floor(rand(0, 20)) * 86400000,
    rating: Math.round(rand(30, 50)) / 10,
    text: "Great courts. Nets are decent; gets busy in the evening.",
    user: "Guest",
  }));
}
