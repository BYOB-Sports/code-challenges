/**
 * A route module for displaying details of a specific court.
 *
 * @module routes/details
 * @param {Route.LoaderArgs} args - The loader arguments containing route parameters.
 * @returns {JSX.Element} The details page component.
 * @public
 */

import type { Route } from "./+types/details";

import { DetailsPage } from "~/DetailsPage/DetailsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Details | Tennis Court Directory" },
    {
      name: "description",
      content: "Tennis court information and reviews",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const courtId = params.courtId;
  return { courtId };
}

export default function Details({ loaderData }: Route.ComponentProps) {
  return <DetailsPage courtId={loaderData.courtId} />;
}
