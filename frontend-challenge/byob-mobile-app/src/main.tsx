import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CourtListPage from "./pages/CourtListPage";
import CourtDetailPage from "./pages/CourtDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <CourtListPage /> },
  { path: "/courts/:courtId", element: <CourtDetailPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
