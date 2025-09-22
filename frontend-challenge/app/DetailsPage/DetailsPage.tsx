/**
 * DetailsPage component displays detailed information about a specific court
 *
 * @param {string} courtId - The ID of the court to display details for.
 * @returns {JSX.Element} The details page component.
 * @public
 */

import { Navigate } from "react-router";

import { ItemDetails } from "./ItemDetails";
import { ReviewSection } from "../ReviewSection/ReviewSection";
import { data } from "../../data/mockCourtData";

export function DetailsPage({ courtId }: { courtId: string }) {
  const courtData = data.tennisCourts.find((el) => el.id === courtId);

  if (!courtData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <ItemDetails courtData={courtData} />
      <ReviewSection courtId={courtId} />
    </div>
  );
}
