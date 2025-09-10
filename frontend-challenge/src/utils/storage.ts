import type { Review } from "../types";

const KEY = "tennis_reviews_v1";

export function getReviews(): Review[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as Review[] : [];
}

export function getReviewsForCourt(courtId: string) {
  return getReviews().filter(r => r.courtId === courtId).sort((a, b) => b.createdAt - a.createdAt);
}

export function addReview(review: Review) {
  const all = getReviews();
  all.push(review);
  localStorage.setItem(KEY, JSON.stringify(all));
}