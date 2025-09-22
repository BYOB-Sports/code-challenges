/**
 * Defines the route configuration for the application.
 * This includes the home route and a dynamic details route.
 *
 * @module routes
 */

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("details/:courtId", "routes/details.tsx"),
] satisfies RouteConfig;
