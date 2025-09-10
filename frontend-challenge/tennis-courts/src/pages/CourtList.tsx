import React, { useState, useEffect } from "react";
import { courts } from "../data/courts";
import CourtCard from "../components/CourtCard";
import SearchBar from "../components/SearchBar";

export default function CourtList() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  // Filter courts based on search
  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  // Slice courts to display only visible ones
  const visibleCourts = filteredCourts.slice(0, visibleCount);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Load more courts when near bottom
      if (scrollTop + windowHeight >= fullHeight - 100) {
        setVisibleCount((prev) => Math.min(prev + 10, filteredCourts.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredCourts.length]);

  // Reset visibleCount when search changes
  useEffect(() => {
    setVisibleCount(10);
  }, [search]);

  return (
    <div className="p-4">
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {visibleCourts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>

      {visibleCount < filteredCourts.length && (
        <p className="text-center mt-4 text-gray-500">Loading more courts...</p>
      )}

      {filteredCourts.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No courts found.</p>
      )}
    </div>
  );
}
