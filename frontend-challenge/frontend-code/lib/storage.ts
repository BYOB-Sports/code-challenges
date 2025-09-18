import type { Review } from "@/types"

const REVIEWS_STORAGE_KEY = "tennis-court-reviews"

export function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading reviews from localStorage:", error)
    return []
  }
}

export function saveReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
  } catch (error) {
    console.error("Error saving reviews to localStorage:", error)
  }
}

export function addReview(review: Review): void {
  const reviews = getStoredReviews()
  reviews.unshift(review) // Add to beginning for reverse chronological order
  saveReviews(reviews)
}

export function getReviewsForCourt(courtId: string): Review[] {
  return getStoredReviews().filter((review) => review.courtId === courtId)
}
