import { Court, Review, Surface } from "../types";

export const SURFACES: Surface[] = [
  "Hard",
  "Clay",
  "Grass",
  "Acrylic",
  "Artificial Turf",
];

const CITIES = [
  "Rockford, IL",
  "Madison, WI",
  "Milwaukee, WI",
  "Chicago, IL",
  "Naperville, IL",
  "Evanston, IL",
  "Green Bay, WI",
  "Peoria, IL",
  "Aurora, IL",
  "Appleton, WI",
  "Des Plaines, IL",
  "Schaumburg, IL",
  "Oak Park, IL",
  "Skokie, IL",
  "Kenosha, WI",
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function choice<T>(arr: T[]) {
  return arr[rand(0, arr.length - 1)];
}
function makeId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function seedReviews(): Review[] {
  const n = rand(0, 6);
  const snippets = [
    "Great lighting and well-kept nets.",
    "Crowded after 5pm, but worth it.",
    "Courts are clean, surface plays fast.",
    "Windy spot; bring extra balls!",
    "Staff is friendly, water fountain nearby.",
    "Parking can be tight on weekends.",
  ];
  return Array.from({ length: n }).map(() => {
    const stars = rand(3, 5);
    return {
      id: makeId("rev"),
      author: ["Sam", "Alex", "Jamie", "Taylor", "Jordan", "Casey"][rand(0, 5)],
      rating: stars,
      text: choice(snippets),
      createdAt: Date.now() - rand(0, 1000 * 60 * 60 * 24 * 120),
    };
  });
}

export function avgRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  const s = reviews.reduce((a, r) => a + r.rating, 0);
  return Math.round((s / reviews.length) * 10) / 10;
}

export function generateCourts(count = 84): Court[] {
  return Array.from({ length: count }).map((_, i) => {
    const baseName = [
      "Riverside",
      "Oakwood",
      "Lakeside",
      "Pioneer",
      "Heritage",
      "Summit",
      "Cedar Grove",
      "Maple Ridge",
      "Hillcrest",
      "Valley View",
      "Brookside",
      "Highland",
      "Greenfield",
      "Sunset",
      "Parkview",
    ][i % 15];

    const city = choice(CITIES);
    const surface = choice(SURFACES);
    const reviews = seedReviews();
    const courts = rand(2, 16);
    const id = makeId("court");
    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(id)}/800/600`;

    return {
      id: makeId("court"),
      name: `${baseName} Tennis Center ${i + 1}`,
      city,
      surface,
      courts,
      reviews,
      rating: avgRating(reviews),
      imageUrl
    };
  });
}