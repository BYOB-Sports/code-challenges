import type { CourtReview } from "../types/court";

const REVIEWS_KEY = "court-reviews"; // map courtId -> CourtReview[]

function readAll(): Record<string, CourtReview[]> {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CourtReview[]>) : {};
  } catch {
    return {};
  }
}

function writeAll(map: Record<string, CourtReview[]>): void {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(map));
}

export function getReviews(courtId: string): CourtReview[] {
  const map = readAll();
  return map[courtId] ?? [];
}

export function addReview(
  courtId: string,
  rating: number,
  comment: string
): CourtReview {
  const map = readAll();
  const newReview: CourtReview = {
    id: crypto.randomUUID(),
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };
  const list = map[courtId] ?? [];
  map[courtId] = [newReview, ...list];
  writeAll(map);
  return newReview;
}

export function getAverageRating(courtId: string): number {
  const reviews = getReviews(courtId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // 1 decimal
}
