import { db } from "./db";

export const getReviews = async (courtId) => {

  try {
    const courtReviews = await db.reviews
      .where("courtId")
      .equals(courtId)
      .toArray();
    console.log("🚀 ~ getReviews ~ courtReviews:", courtReviews)

    return courtReviews;
  } catch (error) {
    console.log("🚀 ~ getReviews ~ error:", error);
    return [];
  }
};

export const postReview = async (reviewData) => {
  try {
    const id = await db.reviews.add({
      ...reviewData,
    });

    return id;
  } catch (error) {
    console.log("🚀 ~ postReview ~ error:", error);
  }
};
