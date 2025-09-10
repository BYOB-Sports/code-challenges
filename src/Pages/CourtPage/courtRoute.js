import { getCourt } from "../../apis/courtApi";
import { getReviews, postReview } from "../../apis/reviewApi";
import { CourtPage } from "./CourtPage";
import { redirect } from "react-router-dom";

export const courtLoader = async ({ request, params }) => {
  const { courtId } = params;

  try {
    const courtData = getCourt(courtId);

    const reviews = await getReviews(courtId);
    console.log("🚀 ~ courtLoader ~ reviews:", reviews);

    return { courtData, reviews };
  } catch (error) {
    console.log("🚀 ~ courtLoader ~ error:", error);
    return {};
  }
};

export const courtAction = async ({ request, params }) => {
  const { courtId } = params;

  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const content = formData.get("content");

    const date = new Date();

    const stamp = date.valueOf();

    const showDate = date.toLocaleString();
    await postReview({ name, content, courtId, stamp, showDate });
    document.getElementById("reveiwForm").reset();
    alert("Thank you for leaving a review");
    return redirect(`/court/${courtId}`);
  } catch (error) {
    console.log("🚀 ~ courtAction ~ error:", error);
  }

  return redirect(`/courts`);
};

export const courtRoute = {
  path: "/court/:courtId?",
  action: courtAction,
  loader: courtLoader,
  Component: CourtPage,
  adminRoute: true,
};
