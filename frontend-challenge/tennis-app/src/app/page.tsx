// this pg will show the list of courts
"use client";
import courts from "@/mockdata/courts";
import CourtPreview from "@/components/CourtPreview";
import { useState, useEffect } from "react";
import { Court } from "@/models/types";
import { preloadReviews } from "@/api/review-api";
export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(courts);

  // laod reviews
  useEffect(() => {
    preloadReviews();
  }, []);

  useEffect(() => {
    const input = searchInput.toLowerCase();
    //  filter by name or location
    const filtered = courts.filter(
      (court) =>
        court.name.toLowerCase().includes(input) ||
        court.location.toLowerCase().includes(input)
    );

    setFilteredCourts(filtered);
  }, [searchInput]);

  return (
    <>
      <header>
        <div className="">
          <h1 className="text-3xl ">BYOB</h1>
          <h2>Bring your own balls</h2>
        </div>
      </header>
      <main>
        <div className="flex flex-col gap-2">
          {/* search bar */}
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow "
              value={searchInput}
              placeholder="Search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </label>

          <h2 className="text-center text-xl font-medium">
            Discover your next Court
          </h2>
          {/* filtered list of courts */}
          <ul className="space-y-4">
            {filteredCourts.map((court) => (
              <li key={court.id}>
                <CourtPreview court={court} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
