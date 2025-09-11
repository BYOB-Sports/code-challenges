// src/utils/storage.js
export function loadReviews(courtId) {
  try {
    const raw = localStorage.getItem(`reviews-${courtId}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveReviews(courtId, reviews) {
  try {
    localStorage.setItem(`reviews-${courtId}`, JSON.stringify(reviews));
  } catch (e) {
    // ignore
  }
}
