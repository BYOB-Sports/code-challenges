import React, { useState } from "react";
import { COURTS } from "../data/courts";
import { useNavigate } from "react-router-dom";
import "./CourtListPage.css";

const CourtListPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const courtsPerPage = 10;

  // Filter courts based on search
  const filteredCourts = COURTS.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);
  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filteredCourts.slice(
    indexOfFirstCourt,
    indexOfLastCourt
  );

  // Reset to first page when search changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="court-list-container">
      <h1 className="court-list-title">Tennis Courts</h1>

      <input
        className="search-input"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search courts..."
      />

      <div className="court-list">
        {currentCourts.map((court) => (
          <div
            key={court.id}
            className="court-card"
            onClick={() => navigate(`/courts/${court.id}`)}
          >
            <h3 className="court-name">{court.name}</h3>
            <p className="court-info">
              📍 {court.location} | Surface: {court.surface}
            </p>
            <p className="court-rating">⭐ {court.rating}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default CourtListPage;
