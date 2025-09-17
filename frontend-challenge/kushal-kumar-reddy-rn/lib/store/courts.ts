import { create } from "zustand";
import data from "../../data/courts.json";

export type Review = {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
};
export type Court = {
  id: string;
  name: string;
  city: string;
  surface: "hard" | "clay" | "grass";
  indoor: boolean;
  lights: boolean;
  rating: number;
  ratingsCount: number;
  reviews: Review[];
};

type CourtsState = {
  courts: Court[];
  query: string;
  setQuery: (q: string) => void;
  filtered: () => Court[];
  addReview: (courtId: string, input: { rating: number; text: string }) => void;
};

export const useCourts = create<CourtsState>((set, get) => ({
  courts: data as Court[],
  query: "",
  setQuery: (q) => set({ query: q }),
  filtered: () => {
    const { courts, query } = get();
    const q = query.trim().toLowerCase();
    if (!q) return courts;
    return courts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
    );
  },
  addReview: (courtId, { rating, text }) => {
    set((state) => {
      const courts = state.courts.map((c) => {
        if (c.id !== courtId) return c;
        const review: Review = {
          id: `r-${Date.now()}`,
          rating,
          text: text.trim(),
          createdAt: new Date().toISOString(),
        };
        const reviews = [review, ...c.reviews];
        const ratingsCount = c.ratingsCount + 1;
        const sum = c.rating * c.ratingsCount + rating;
        const avg = Math.round((sum / ratingsCount) * 10) / 10;
        return { ...c, reviews, ratingsCount, rating: avg };
      });
      return { courts };
    });
  },
}));
