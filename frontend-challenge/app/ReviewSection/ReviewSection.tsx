/**
 * ReviewSection component to display reviews and ratings for a court.
 *
 * @param {string} courtId - The ID of the court to display reviews for.
 * @returns {JSX.Element} The rendered review section.
 * @public
 */

import { useState } from "react";
import { ReviewSubmissionModal } from "../Modal/ReviewSubmissionModal";
import {
  reviewData,
  setReviewData,
  type ReviewType,
} from "../../data/mockReviewData";
import { ReviewList } from "./ReviewList";
import { ReviewStatsSummary } from "./ReviewStatsSummary";

export function ReviewSection({ courtId }: { courtId: string }) {
  const [reviews, setReviews] = useState(reviewData[courtId] || []);

  const addReview = (newReview: ReviewType) => {
    setReviews((prev) => {
      setReviewData(courtId, newReview);
      console.log(prev);
      return [...prev];
    });
  };

  return (
    <section className="py-20 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="w-full">
          <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">
            Reviews & Ratings
          </h2>
          {reviews.length === 0 ? (
            <>
              <ReviewSubmissionModal addReviews={addReview} />
              <p className="text-2xl italic">No reviews yet.</p>
            </>
          ) : (
            <>
              <ReviewStatsSummary />
              <ReviewSubmissionModal addReviews={addReview} />
              <ReviewList reviews={reviews} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
