/**
 * SearchBar component for filtering tennis courts by name.
 *
 * @param {TennisCourtType[]} courts - The list of tennis courts to search from.
 * @param {(filteredCourts: TennisCourtType[]) => void} onUpdateCourts - Callback function to update the displayed courts based on search results.
 * @returns {JSX.Element} The rendered SearchBar component.
 * @public
 */

import { useState } from "react";
import { type TennisCourtType } from "../../data/mockCourtData";

export function SearchBar({
  courts,
  onUpdateCourts,
}: {
  courts: TennisCourtType[];
  onUpdateCourts: (filteredCourts: TennisCourtType[]) => void;
}) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const regex = new RegExp(searchValue, "i");
    const filteredCourts = courts.filter((court) => regex.test(court.name));
    console.log(filteredCourts);
    onUpdateCourts(filteredCourts);
  }

  const handleFormClear = () => {
    setSearchValue("");
    const regex = new RegExp("", "i");
    const filteredCourts = courts.filter((court) => regex.test(court.name));
    onUpdateCourts(filteredCourts);
  };

  return (
    <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
      <form
        onSubmit={handleSearchSubmit}
        onReset={handleFormClear}
        className="relative z-10 flex gap-x-3 p-3 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-100"
      >
        <label htmlFor="search-query" className="sr-only">
          Email address
        </label>
        <input
          id="search-query"
          type="text"
          name="search-query"
          required
          placeholder="Search"
          className="min-w-0 flex-auto rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          type="submit"
          className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Search
        </button>
        {searchValue && (
          <button
            type="reset"
            className="py-3 px-4 text-sm font-medium rounded-lg cursor-pointer border-2 border-orange-600 text-orange-600 hover:bg-red-200"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
}
