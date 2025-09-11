import React, { createContext, useContext, useMemo, useState, ReactNode, useCallback, useEffect } from 'react';
import { Court, Review } from '../types';
import { loadData, saveData } from '../data/mock';

type CourtsState = {
  courts: Court[];
  reviewsByCourtId: Record<string, Review[]>;
};

type CourtsContextValue = CourtsState & {
  addReview: (courtId: string, author: string, rating: 1 | 2 | 3 | 4 | 5, comment: string) => void;
  getAverageRating: (courtId: string) => number;
  loading: boolean;
};

const CourtsContext = createContext<CourtsContextValue | undefined>(undefined);

function indexReviews(reviews: Review[]): Record<string, Review[]> {
  const map: Record<string, Review[]> = {};
  for (const review of reviews) {
    if (!map[review.courtId]) map[review.courtId] = [];
    map[review.courtId].push(review);
  }
  return map;
}

export function CourtsProvider({ children }: { children: ReactNode }) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [reviewsByCourtId, setReviewsByCourtId] = useState<Record<string, Review[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // simulate async load for skeleton UX
    const timer = setTimeout(() => {
      const initial = loadData();
      setCourts(initial.courts);
      setReviewsByCourtId(indexReviews(initial.reviews));
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const persist = useCallback((nextReviewsByCourtId: Record<string, Review[]>) => {
    const allReviews: Review[] = Object.values(nextReviewsByCourtId).flat();
    saveData({ courts, reviews: allReviews });
  }, [courts]);

  const addReview = useCallback((courtId: string, author: string, rating: 1 | 2 | 3 | 4 | 5, comment: string) => {
    const newReview: Review = {
      id: `rev_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`,
      courtId,
      author,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setReviewsByCourtId(prev => {
      const next: Record<string, Review[]> = { ...prev, [courtId]: [...(prev[courtId] ?? []), newReview] };
      persist(next);
      return next;
    });
  }, [persist]);

  const getAverageRating = useCallback((courtId: string) => {
    const reviews = reviewsByCourtId[courtId] ?? [];
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviewsByCourtId]);

  const value = useMemo<CourtsContextValue>(() => ({
    courts,
    reviewsByCourtId,
    addReview,
    getAverageRating,
    loading,
  }), [courts, reviewsByCourtId, addReview, getAverageRating, loading]);

  return (
    <CourtsContext.Provider value={value}>{children}</CourtsContext.Provider>
  );
}

export function useCourts() {
  const ctx = useContext(CourtsContext);
  if (!ctx) throw new Error('useCourts must be used within CourtsProvider');
  return ctx;
}


