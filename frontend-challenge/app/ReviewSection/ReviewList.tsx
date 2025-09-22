/**
 * A component that renders a list of review item cards
 *
 * @param {ReviewType[]} reviews - An array of review items to display.
 * @returns {JSX.Element} The rendered list of review items.
 * @public
 */

import { useState } from "react";
import {
  reviewData,
  setReviewData,
  type ReviewDataType,
  type ReviewType,
} from "../../data/mockReviewData";
import { ReviewItemCard } from "./ReviewItemCard";

export function ReviewList({ reviews }: { reviews: ReviewType[] }) {
  const latestFirstList = [];
  for (let i = reviews.length - 1; i >= 0; i--) {
    latestFirstList.push(reviews[i]);
  }
  return (
    <div>
      {latestFirstList.map((review: ReviewType, index: number) => (
        <ReviewItemCard key={index} reviewItem={review} />
      ))}
    </div>
  );
}
