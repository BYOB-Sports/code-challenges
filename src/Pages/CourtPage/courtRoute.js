import { CourtPage } from "./CourtPage";
import { redirect } from "react-router-dom";

export const courtLoader = async ({ request, params }) => {
  const { courtId } = params;



  try {


    const courtData = {}

    return {courtData}
  } catch (error) {
    console.log("🚀 ~ courtLoader ~ error:", error);

    return {};
  }
};

export const courtAction = async ({ request, params }) => {
  const { courtId } = params;

  try {

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
