export type Surface = "Hard" | "Clay" | "Grass" | "Acrylic" | "Artificial Turf";

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  createdAt: number;
};

export type Court = {
  id: string;
  name: string;
  city: string;
  surface: Surface;
  courts: number;
  rating: number;
  reviews: Review[];
};

export type SortKey = "best" | "mostRecent" | "name";

export type NavState = { route: "list" } | { route: "detail"; courtId: string };
