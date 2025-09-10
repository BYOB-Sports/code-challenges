import React, { useState } from "react";
import { courts } from "../data/mockCourts";
import type { Court } from "../data/mockCourts";
import { useNavigate } from "react-router-dom";
import { Stars } from "../components/Stars";

export const CardList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourts = courts.filter((court: Court) =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Tennis Courts</h1>

      <input
        type="text"
        className="search"
        placeholder="Search by name, city, or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredCourts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#aaa" }}>
          No courts found.
        </p>
      ) : (
        filteredCourts.map((court: Court) => (
          <div
            key={court.id}
            className="court-card"
            onClick={() => navigate(`/court/${court.id}`)}
          >
            <h2>{court.name}</h2>
            <p><strong>City:</strong> {court.location}</p>
            <p><strong>Address:</strong> {court.address}</p>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#ccc" }}>
              {court.description}
            </p>
            <Stars rating={court.rating} />
          </div>
        ))
      )}
    </div>
  );
};
