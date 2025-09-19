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

const tennisCourts = [
  "Sunrise Clay Court",
  "Lakeside Tennis Arena",
  "Riverside Grass Court",
  "Meadowbrook Tennis Center",
  "Westfield Hard Court",
  "Greenhill Park Court",
  "Oceanview Tennis Club",
  "Cedar Grove Court",
  "Willow Creek Tennis Grounds",
  "Aspen Ridge Court",
  "Maplewood Sports Complex",
  "Pine Valley Court",
  "Stonebridge Tennis Pavilion",
  "Silver Lake Court",
  "Hillside Tennis Grounds",
  "Grandview Tennis Center",
  "Birchwood Court",
  "Summit Ridge Tennis Club",
  "Riverbend Hard Court",
  "Oakdale Tennis Arena",
  "Golden Gate Court",
  "Brookside Tennis Club",
  "Highland Meadows Court",
  "Blue Sky Tennis Grounds",
  "Sunset Valley Court",
  "Harbor View Tennis Pavilion",
  "Cypress Point Court",
  "Rolling Hills Tennis Center",
  "Fox Hollow Court",
  "Clearwater Tennis Club",
  "Elm Street Court",
  "Redwood Park Tennis Grounds",
  "Sycamore Springs Court",
  "Palm Grove Tennis Center",
  "Eagle Ridge Court",
  "Rosewood Tennis Arena",
  "Lakeview Hard Court",
  "Cherry Hill Tennis Club",
  "Silver Birch Court",
  "Whispering Pines Tennis Grounds",
  "Golden Oaks Court",
  "Pebble Creek Tennis Center",
  "Northshore Tennis Club",
  "Meadowlark Court",
  "Stonegate Tennis Pavilion",
  "Crystal Bay Court",
  "Prairie View Tennis Grounds",
  "Westbrook Court",
  "Ashford Tennis Club",
  "Canyon Creek Court",
  "Parkside Tennis Pavilion",
  "Windy Ridge Court",
  "Southgate Tennis Arena",
  "Clear Springs Court",
  "Falcon Hill Tennis Club",
  "Ironwood Court",
  "Seaside Tennis Grounds",
  "Silverleaf Court",
  "Valley Forge Tennis Pavilion"
];

export const courts: Court[] = Array.from({ length: 60 }, (_, index) => {
  const surface = surfaceCycle[index % surfaceCycle.length];
  const images = imagePool[surface];
  const imagePath = images[index % images.length];
  return {
    id: `court-${index + 1}`,
    name: tennisCourts[index % tennisCourts.length],
    imagePath,
    location: locations[index % locations.length],
    surface,
    stars: (index % 5) + 1,
  };
});

export function getCourtById(id: string): Court | undefined {
  return courts.find((c) => c.id === id);
}
