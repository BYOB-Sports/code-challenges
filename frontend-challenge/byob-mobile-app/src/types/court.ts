export type SurfaceType = "hard" | "clay" | "grass" | "indoor";

export interface Court {
  id: string;
  name: string;
  imagePath: string; // path under public/, e.g. /court-hard-1.webp
  location: string;
  surface: SurfaceType;
  stars: number; // base mock stars 1-5
}

export interface CourtReview {
  id: string; // court id
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO
}

export interface CourtAggregate {
  court: Court;
  averageRating: number;
  reviews: CourtReview[];
}
