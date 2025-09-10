import { useEffect, useMemo, useState } from 'react';

export const useCourtReviews = (courtId) => {
  const storageKey = `court-reviews:${courtId || 'unknown'}`;

  const initial = useMemo(() => {
    try {
      const json = localStorage.getItem(storageKey);
      return json ? JSON.parse(json) : [];
    } catch (_) {
      return [];
    }
  }, [storageKey]);

  const [reviews, setReviews] = useState(initial);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (_) {}
  }, [storageKey, reviews]);

  const addReview = (review) => {
    setReviews(prev => [review, ...prev]);
  };

  const average = reviews.length ? (reviews.reduce((a, r) => a + Number(r.rating || 0), 0) / reviews.length).toFixed(1) : null;

  return { reviews, addReview, average };
};

export default useCourtReviews;


