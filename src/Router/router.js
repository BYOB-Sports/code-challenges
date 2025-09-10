import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/rootLoader";
import { courtsRoute } from "../Pages/CourtsPage/courtsRoute";
import { courtRoute } from "../Pages/CourtPage/courtRoute";

import { LayoutConfig } from "../Components/LayoutConfig";
import { LoadFadeLayout } from "../Components/LoadFadeLayout";
const routes = [
  {
    public: true,
    path: "/",
    Component: LayoutConfig,
    children: [courtsRoute, courtRoute],
  },
];

export const router = createBrowserRouter(routes);
