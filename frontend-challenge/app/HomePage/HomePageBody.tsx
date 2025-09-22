/**
 * HomePageBody component that displays a grid of tennis court cards.
 *
 * @param {TennisCourtType[]} courts - Array of tennis court objects to be displayed in the body.
 * @returns {JSX.Element} - A grid layout of tennis court cards or a message if no results are found.
 * @public
 */

import { type TennisCourtType } from "../../data/mockCourtData";
import { HomePageCourtCard } from "./HomePageCourtCard";

export function HomePageBody({ courts }: { courts: TennisCourtType[] }) {
  if (courts.length === 0) return <div>No results found</div>;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court, index) => (
          <HomePageCourtCard key={index} court={court} />
        ))}
      </div>
    </div>
  );
}
