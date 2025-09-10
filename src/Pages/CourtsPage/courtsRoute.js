import { CourtsPage } from "./CourtsPage";
import { redirect } from "react-router-dom";

export const courtsLoader = async ({ request, params, }) => {




  return {  };
};



export const courtsRoute = {
  path: "/",
  loader: courtsLoader,
  Component: CourtsPage,
};
