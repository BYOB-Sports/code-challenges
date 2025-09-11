import reviews from "@/mockdata/reviews";
import { Review } from "@/models/types";
export const getReviewsByCourt = (courtID: number) => {
  const data = reviews.filter((review) => review.court_id == courtID);

  return data;
};

const getAllReviews = (): Review[] => {
  const data = localStorage.getItem("reviews");
  return data ? JSON.parse(data) : [];
};
export const createReview = (
  courtID: number,
  comment: string,
  rating: number
) => {
  const reviews = getAllReviews();

  const newReview: Review = {
    id: reviews.length,
    court_id: courtID,
    comment,
    rating,
    date: Date.now().toLocaleString(),
  };
  reviews.push(newReview);
  saveAllReviews(reviews);
  return newReview;
};

export const preloadReviews = () => {
  // Only load if nothing is in localStorage yet
  const existing = localStorage.getItem("reviews");
  if (!existing) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }
};

// Save all reviews to localStorage
const saveAllReviews = (reviews: Review[]) => {
  localStorage.setItem("reviews", JSON.stringify(reviews));
};
