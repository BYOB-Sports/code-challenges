/**
 * HomePageHeader component that includes a search bar for filtering tennis courts.
 * @param {TennisCourtType[]} courts - Array of tennis court objects to be searched.
 * @param {(filteredCourts: TennisCourtType[]) => void} onUpdateCourts - Callback function to update the parent component with filtered results.
 * @returns {JSX.Element}
 * @public
 */

import { SearchBar } from "~/search/SearchBar";
import { type TennisCourtType } from "../../data/mockCourtData";

export function HomePageHeader({
  courts,
  onUpdateCourts,
}: {
  courts: TennisCourtType[];
  onUpdateCourts: (filteredCourts: TennisCourtType[]) => void;
}) {
  return <SearchBar courts={courts} onUpdateCourts={onUpdateCourts} />;
}
