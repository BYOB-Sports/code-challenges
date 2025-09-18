export type Court = {
  id: string;
  name: string;
  city: string;
  state: string;
  surface: 'hard' | 'clay' | 'grass';
  indoor: boolean;
  lights: boolean;
  courts: number;
  img: string;
  avgRating: number; // seeded baseline rating (can be overridden by user reviews)
  reviewsCount: number;
}

export type Review = {
  id: string;
  courtId: string;
  author: string;
  rating: number; // 1..5
  text?: string;
  createdAt: string; // ISO
}
