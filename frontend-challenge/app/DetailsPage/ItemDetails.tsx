/**
 * A React component that displays detailed information about a tennis court.
 *
 * @param {TennisCourtType} courtData - The data for the tennis court to display details for.
 * @returns {JSX.Element} - styled section with details of specified tennis court.
 * @public
 */

import { type TennisCourtType } from "../../data/mockCourtData";

export function ItemDetails({ courtData }: { courtData: TennisCourtType }) {
  return (
    <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
      <div className="lg:col-span-2">
        <div className="py-8 lg:pe-8">
          <div className="space-y-5 lg:space-y-8">
            <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">
              {courtData.name}
            </h2>
            <img
              className="w-full object-cover rounded-xl"
              src={courtData.image}
              alt="Tennis court"
            />
            <dl className="flex flex-col sm:flex-row">
              <dt className="min-w-40">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                  Price:
                </span>
              </dt>
              <dd>
                <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  $$
                </span>
              </dd>
            </dl>
            <dl className="flex flex-col sm:flex-row gap-1">
              <dt className="min-w-40">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                  Location:
                </span>
              </dt>
              <dd>
                <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {courtData.location}
                </span>
              </dd>
            </dl>
            <dl className="flex flex-col sm:flex-row gap-1">
              <dt className="min-w-40">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                  Hours of Operation:
                </span>
              </dt>
              <dd>
                <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {courtData.daysOpen} * {courtData.hours}
                </span>
              </dd>
            </dl>
            <dl className="flex flex-col sm:flex-row gap-1">
              <dt className="min-w-40">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                  Instructors Available:
                </span>
              </dt>
              <dd>
                <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {courtData.hasInstructors ? "Yes" : "None"}
                </span>
              </dd>
            </dl>
            <p className="text-lg text-gray-800 dark:text-neutral-200">
              {courtData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
