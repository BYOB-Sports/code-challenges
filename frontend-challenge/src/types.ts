export type Surface = "Hard" | "Clay" | "Grass";
export type Borough =
  | "Manhattan"
  | "Brooklyn"
  | "Queens"
  | "Bronx"
  | "Staten Island"
  | "Other";

export interface Court {
  id: string;
  name: string;
  surface: Surface;
  borough: Borough;
  lights: boolean;
  rating: number;
  reviewsCount: number;
  address: string;
  distanceKm: number;
}

export interface Review {
  id: string;
  courtId: string;
  createdAt: number;
  rating: number;
  text: string;
  user: string;
}
