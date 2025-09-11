import court1 from "../assets/courts/court1.jpg";
import court2 from "../assets/courts/court2.jpg";
import court3 from "../assets/courts/court3.jpg";
import court4 from "../assets/courts/court4.jpg";
import court5 from "../assets/courts/court5.jpg";
import court6 from "../assets/courts/court6.jpg";
import court7 from "../assets/courts/court7.jpg";
import court8 from "../assets/courts/court8.jpg";
import court9 from "../assets/courts/court9.jpg";

export type Court = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: string[];
  surface: "Hard" | "Clay" | "Grass";
  indoor: boolean;
  lights: boolean;
  distanceKm: number;
  images: string[];
};


const surfaces: Court["surface"][] = ["Hard", "Clay", "Grass"];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function stars() {
  return Math.floor(Math.random() * 5) + 1;
}


const surfaceImages: Record<Court["surface"], string[]> = {
  Hard: [court1, court2, court3],
  Grass: [court4, court5, court6],
  Clay: [court7, court8, court9],
};


export const courts: Court[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const surface = pick(surfaces);

 
  const images = surfaceImages[surface];

  return {
    id,
    name: `Court ${id}`,
    location: `Location ${((i % 12) + 1)}`,
    rating: stars(),
    reviews: ["Great surface!", "Good lighting.", "Could use more seating."],
    surface,
    indoor: Math.random() > 0.7,
    lights: Math.random() > 0.4,
    distanceKm: Number((Math.random() * 12 + 0.5).toFixed(1)),
    images,
  };
});