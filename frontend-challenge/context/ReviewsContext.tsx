import React, { createContext, useState, ReactNode } from "react";

interface ReviewsContextType {
  reviews: Record<number, string[]>;
  addReview: (courtId: number, text: string) => void;
}

export const ReviewsContext = createContext<ReviewsContextType>({
  reviews: {},
  addReview: () => {},
});

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Record<number, string[]>>({});

  const addReview = (courtId: number, text: string) => {
    setReviews((prev) => ({
      ...prev,
      [courtId]: [...(prev[courtId] || []), text],
    }));
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}
