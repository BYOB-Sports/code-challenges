const STORAGE_KEY = 'court_reviews_v1';

export function readAllReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

export function readReviewsByCourtId(courtId) {
  const all = readAllReviews();
  return Array.isArray(all[courtId]) ? all[courtId] : [];
}

export function addReview(courtId, review) {
  const all = readAllReviews();
  const existing = Array.isArray(all[courtId]) ? all[courtId] : [];
  const withId = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), ...review };
  const updated = { ...all, [courtId]: [withId, ...existing] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return withId;
}


