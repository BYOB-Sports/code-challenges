/**
 * Home route component.
 *
 * @param {Route.MetaArgs} args - The meta arguments.
 * @returns Home page component.
 * @public
 */

import type { Route } from "./+types/home";
import { HomePage } from "../HomePage/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | Tennis Court Directory" },
    {
      name: "description",
      content: "Tennis court directory frontend challenge",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
