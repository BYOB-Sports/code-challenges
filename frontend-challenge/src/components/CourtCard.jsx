import React from "react";
import "../index.css";

export default function CourtCard({ court, onSelect }) {
    return (
        <div className="court-card" onClick={() => onSelect(court)}>
            <div className="court-image-container">
                <img src={court.imageUrl} alt={court.name} />
                <div className="court-overlay">
                    <div className="court-name">{court.name}</div>
                    <div className="court-location">{court.location}</div>
                </div>
            </div>
        </div>
    );
}