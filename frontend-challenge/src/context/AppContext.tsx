import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Court, NavState, Review } from "../types";
import { avgRating, generateCourts } from "../data/mock";

export type AppState = {
  courts: Court[];
  nav: NavState;
  setNav: (n: NavState) => void;
  addReview: (courtId: string, review: Omit<Review, "id" | "createdAt">) => void;
  recalcRating: (courtId: string) => void;
};

const AppCtx = createContext<AppState | null>(null);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [courts, setCourts] = useState<Court[]>(() => generateCourts(84));
  const [nav, setNav] = useState<NavState>({ route: "list" });

  const addReview = useCallback(
    (courtId: string, r: Omit<Review, "id" | "createdAt">) => {
      setCourts(prev =>
        prev.map(c => {
          if (c.id !== courtId) return c;
          const nextReviews = [
            { ...r, id: `rev_${Math.random().toString(36).slice(2, 9)}`, createdAt: Date.now() },
            ...c.reviews,
          ];
          return {
            ...c,
            reviews: nextReviews,
            rating: avgRating(nextReviews),
          };
        })
      );
    },
    []
  );

  const recalcRating = useCallback((courtId: string) => {
    setCourts(prev =>
      prev.map(c => (c.id === courtId ? { ...c, rating: avgRating(c.reviews) } : c))
    );
  }, []);

  const value = useMemo(
    () => ({ courts, nav, setNav, addReview, recalcRating }),
    [courts, nav, addReview, recalcRating]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("App context missing");
  return ctx;
}
