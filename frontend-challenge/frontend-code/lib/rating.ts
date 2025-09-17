import type { Review } from "@/types"

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  const average = sum / reviews.length

  // Round to nearest 0.5
  return Math.round(average * 2) / 2
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getRatingStars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return { full, half, empty }
}
