import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Review } from "@/types"
import { getStoredReviews, addReview as saveReview } from "@/lib/storage"

interface ReviewsState {
  reviews: Review[]
  isLoading: boolean
  error: string | null
  loadReviews: () => void
  addReview: (review: Omit<Review, "id" | "createdAt">) => Promise<void>
  getReviewsForCourt: (courtId: string) => Review[]
  deleteReview: (reviewId: string) => void
  clearError: () => void
}

export const useReviews = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],
      isLoading: false,
      error: null,

      loadReviews: () => {
        set({ isLoading: true, error: null })
        try {
          const reviews = getStoredReviews()
          set({ reviews, isLoading: false })
        } catch (error) {
          set({
            error: "Failed to load reviews",
            isLoading: false,
          })
        }
      },

      addReview: async (reviewData) => {
        set({ error: null })
        try {
          const review: Review = {
            ...reviewData,
            id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
          }

          // Optimistically update state
          set((state) => ({
            reviews: [review, ...state.reviews],
          }))

          // Persist to localStorage
          saveReview(review)
        } catch (error) {
          set({ error: "Failed to submit review" })
          // Revert optimistic update
          get().loadReviews()
          throw error
        }
      },

      getReviewsForCourt: (courtId: string) => {
        return get().reviews.filter((review) => review.courtId === courtId)
      },

      deleteReview: (reviewId: string) => {
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== reviewId),
        }))
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "tennis-courts-reviews",
      partialize: (state) => ({
        reviews: state.reviews,
      }),
    },
  ),
)
