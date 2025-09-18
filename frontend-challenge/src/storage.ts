import type { Review } from "./types.ts";
const KEY = "byob_reviews_v1";

function load(): Record<string, Review[]> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function save(map: Record<string, Review[]>) {
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function getReviews(courtId: string): Review[] {
  const map = load();
  return map[courtId] || [];
}
export function addReview(r: Review) {
  const map = load();
  map[r.courtId] = [r, ...(map[r.courtId] || [])];
  save(map);
}
