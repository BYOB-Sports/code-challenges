import type { Court, SurfaceType } from "../types/court";

const surfaceCycle: SurfaceType[] = ["hard", "clay", "grass", "indoor"];

const imagePool: Record<SurfaceType, string[]> = {
  hard: ["/court-hard-1.webp", "/court-hard-2.webp"],
  clay: ["/court-clay-1.webp", "/court-clay-2.webp"],
  grass: ["/court-green-1.webp", "/court-green-2.webp"],
  indoor: ["/court-hard-1.webp", "/court-hard-2.webp"], // reuse hard for indoor visuals
};

const locations: string[] = [
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
  "New York, NY",
  "Miami, FL",
  "Denver, CO",
  "Boston, MA",
  "Chicago, IL",
  "Portland, OR",
  "Phoenix, AZ",
];

export const courts: Court[] = Array.from({ length: 60 }, (_, index) => {
  const surface = surfaceCycle[index % surfaceCycle.length];
  const images = imagePool[surface];
  const imagePath = images[index % images.length];
  return {
    id: `court-${index + 1}`,
    name: `Tennis Court #${index + 1}`,
    imagePath,
    location: locations[index % locations.length],
    surface,
    stars: (index % 5) + 1,
  };
});

export function getCourtById(id: string): Court | undefined {
  return courts.find((c) => c.id === id);
}
