/**
 * A card component displaying tennis court information with a link to the details page.
 *
 * @param {TennisCourtType} court - Tennis court object containing details to be displayed in the card.
 * @returns {JSX.Element} - A card component with image.
 * @public
 */

import { Link } from "react-router";

import { type TennisCourtType } from "../../data/mockCourtData";

export function HomePageCourtCard({ court }: { court: TennisCourtType }) {
  return (
    <div
      key={court.id}
      className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl"
    >
      <div className="md:shrink-0 justify-center items-center bg-blue-600 rounded-t-xl">
        <img
          src={court.image}
          alt="Tennis court"
          className="h-48 w-full object-cover rounded-t-xl"
        />
      </div>
      <Link
        to={`/details/${court.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="p-4 md:p-6">
          <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
            {court.location}
          </span>
          <h3 className="text-xl font-semibold text-gray-800">{court.name}</h3>
          <p className="mt-3 text-gray-500 dark:text-neutral-500">
            {court.description.substring(0, 80)}...
          </p>
        </div>
      </Link>
    </div>
  );
}
