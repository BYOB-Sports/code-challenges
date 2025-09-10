import { getCourts } from "../../apis/courtApi";
import { CourtsPage } from "./CourtsPage";
import { redirect } from "react-router-dom";

const parsePageNum = (raw) => {
  try {
    const page = raw && raw !== null ? raw : "1";



    const num = parseInt(page);
    

    if(num<1 || num >10){


      return 1
    }


    return num
  } catch (error) {
    return 1;
  }
};

export const courtsLoader = async ({ request, params }) => {
  const url = new URL(request.url);

  const rawPage = url.searchParams.get("page");

  const page = parsePageNum(rawPage);

  const courts = getCourts({page});

  const pageLinks = [];

  while (pageLinks.length < 10) {
    pageLinks.push({
      index: pageLinks.length,
      selected: page == pageLinks.length + 1,
      link: `/?page=${pageLinks.length + 1}`,
    });
  }

  return { courts, page, pageLinks };
};

export const courtsRoute = {
  path: "/",
  loader: courtsLoader,
  Component: CourtsPage,
};
