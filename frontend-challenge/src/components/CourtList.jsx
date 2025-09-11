import React from "react";
import { useNavigate } from "react-router-dom";
import { courts } from "../data";
import "./CourtList.css";

export default function CourtList({ onSelectCourt }) {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const filteredCourts = courts.filter(
    court =>
      court.name.toLowerCase().includes(search.toLowerCase()) ||
      court.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
          <div style={{ fontFamily: "'Baloo 2', sans-serif", background: "#f5f8ff", minHeight: "100vh" }}>
  <button
    onClick={() => navigate("/")}
    style={{
      background: "#2196f3",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 14px",
      margin: "20px 0 12px 0",
      fontSize: "1.05em",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}
    aria-label="Back to Home"
  >
    <span style={{ fontSize: "1.15em" }}>←</span> Back to Home
  </button>
  <div className="page-container">
    <h2 style={{
      marginTop: "24px",
      fontSize: "1.6rem",
      color: "#2196f3",
      fontWeight: 700,
      letterSpacing: "1px"
    }}>TENNIS COURTS</h2>
    <div className="search-bar-wrapper">
      <input
        type="text"
        placeholder="Search courts by Name or Location"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #bcdffb",
          fontSize: "1em"
        }}
      />
    </div>
    <div className="court-list">
      {filteredCourts.map(court => (
        <div
          key={court.id}
          className="court-card"
          onClick={() => onSelectCourt(court)}
        >
          <img
            src={court.image}
            alt={court.name}
            className="court-image"
          />
          <div className="court-title">{court.name}</div>
          <div className="court-location-rating-row">
            <span className="court-location">
              <span style={{ color: "#b0b0b0", fontSize: "1.18rem" }}>📍</span>
              <span>{court.location}</span>
            </span>
            <span className="court-rating">
              {"★".repeat(Math.round(court.rating))}
              <span style={{ color: "#333", marginLeft: "4px", fontWeight: "bold", fontSize: "1rem" }}>{court.rating}</span>
            </span>
          </div>          
          <div className="court-details-row" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="court-num">
              <span role="img" aria-label="tennis ball">🎾</span>
              {court.numCourts} courts
            </span>
            <div
              className="court-icons"
              style={{
                position: "absolute",
                right: "8px",
                bottom: "4px",
                display: "flex",
                flexDirection: "row",
                gap: "4px"
              }}
            >
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

