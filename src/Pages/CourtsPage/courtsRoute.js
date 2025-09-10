import { getCourts } from "../../apis/courtApi";
import { CourtsPage } from "./CourtsPage";
import { redirect } from "react-router-dom";

export const courtsLoader = async ({ request, params, }) => {

  const courts = getCourts()

  return { courts };
};



export const courtsRoute = {
  path: "/",
  loader: courtsLoader,
  Component: CourtsPage,
};
