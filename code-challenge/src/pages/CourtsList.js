import { useState } from "react";
import courts from "../data/courts";
import CourtCard from "../components/CourtCard";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

export default function CourtsList() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const courtsPerPage = 10;

  // Filter by search query
  const filtered = courts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filtered.slice(indexOfFirstCourt, indexOfLastCourt);

  const totalPages = Math.ceil(filtered.length / courtsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back
      </Link>
      <h1 className="page-title">Tennis Courts</h1>
      <SearchBar query={query} setQuery={setQuery} />

      {/* Courts */}
      <div className="court-list">
        {currentCourts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
