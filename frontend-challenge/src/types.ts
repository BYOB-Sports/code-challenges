export type Surface = "Hard" | "Clay" | "Grass" | "Carpet";

export type Review = {
  courtId: string;
  rating: number;
  comment: string;
  createdAt: number; // epoch ms
};
