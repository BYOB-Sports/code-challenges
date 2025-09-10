import React from "react";
import { useParams, Link } from "react-router-dom";
import courts from "../data/courts";

const CourtDetail = () => {
  const { id } = useParams();
  const court = courts.find((c) => c.id === id);

  if (!court) {
    return (
      <div style={{ padding: 16 }}>
        <p>Court not found.</p>
        <Link to="/courts">Back to Courts</Link>
      </div>
    );
  }

  return (
    <div className="court-detail" style={{ paddingBottom: 24 }}>
      <div style={{ padding: 16 }}>
        <Link
          to="/courts"
          style={{
            display: "inline-block",
            marginBottom: 8,
            background: "white",
            padding: "8px 12px",
            borderRadius: 8,
            textDecoration: "none",
            color: "#111827",
            border: "1px solid #e5e7eb",
          }}
        >
          Back
        </Link>
        <h2 style={{ marginBottom: 4 }}>{court.name}</h2>
        <div style={{ color: "#6b7280", fontSize: 14 }}>{court.address}</div>
        
        <div style={{ marginTop: 8, fontSize: 14 }}>
          {court.surface} • {court.isIndoor ? "Indoor" : "Outdoor"} •{" "}
          {court.hasLights ? "Lights" : "No lights"}
        </div>
      </div>
    </div>
  );
};

export default CourtDetail;
