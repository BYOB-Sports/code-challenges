import { fetchPlayers, updatePlayers } from './playerApi';

// Internal helpers
const readReviews = () => JSON.parse(localStorage.getItem('reviews') || '{}');
const writeReviews = (obj) => localStorage.setItem('reviews', JSON.stringify(obj));

export const getReviewsForCourt = async (courtId) => {
  const all = readReviews();
  return all[courtId] || [];
};

// Add a review and recalc average; returns { updatedCourts, newReviews }
export const addReviewAndRecalculate = async (courtId, rating, comment) => {
  const allReviews = readReviews();
  const current = allReviews[courtId] || [];
  const newEntry = {
    rating: Number(rating),
    comment: String(comment),
    date: new Date().toISOString(),
  };
  const newReviews = [newEntry, ...current]; // newest first
  allReviews[courtId] = newReviews;
  writeReviews(allReviews);

  // Recompute average for this court
  const sum = newReviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
  const avg = newReviews.length ? sum / newReviews.length : 0;

  // Update courts list
  const courts = await fetchPlayers();
  const updated = courts.map((c) =>
    String(c.id) === String(courtId)
      ? { ...c, averageRating: avg }
      : c
  );
  await updatePlayers(updated);

  return { updatedCourts: updated, newReviews };
};
