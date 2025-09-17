import { writeFileSync } from "fs";

const cities = [
  "Dallas",
  "Austin",
  "Seattle",
  "Boston",
  "Denver",
  "Atlanta",
  "Phoenix",
  "Miami",
  "Chicago",
  "New York",
];
const surfaces = ["hard", "clay", "grass"];

const courts = [];
for (let i = 1; i <= 72; i++) {
  const city = cities[i % cities.length];
  const surface = surfaces[i % surfaces.length];
  const indoor = i % 3 === 0;
  const lights = i % 2 === 0;
  const ratingsCount = 10 + (i % 40);
  const rating = Math.round((3.2 + (i % 18) / 10) * 10) / 10; // ~3.2–5.0

  courts.push({
    id: `c-${String(i).padStart(3, "0")}`,
    name: `${city} Court ${i}`,
    city,
    surface,
    indoor,
    lights,
    rating,
    ratingsCount,
    reviews: [
      {
        id: `r-${i}-1`,
        rating: Math.min(5, Math.max(1, Math.round(rating))),
        text: "Good surface and spacing.",
        createdAt: "2025-08-01T12:10:00Z",
      },
    ],
  });
}

writeFileSync("data/courts.json", JSON.stringify(courts, null, 2));
console.log("Wrote data/courts.json with", courts.length, "courts");
