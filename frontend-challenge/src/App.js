import React, { useState } from "react";
import { mockCourts } from "./data/mockCourts";
import CourtCard from "./components/CourtCard";
import CourtDetail from "./components/CourtDetail";
import headerImage from "./assets/images/header.jpg";
import "./App.css";

export default function App() {
    const [courts, setCourts] = useState(mockCourts);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [search, setSearch] = useState("");

    const filteredCourts = courts.filter((court) =>
        court.name.toLowerCase().includes(search.toLowerCase())
    );

    const addReview = (courtId, review) => {
        setCourts((prev) =>
            prev.map((court) =>
                court.id === courtId
                    ? { ...court, reviews: [...court.reviews, review] }
                    : court
            )
        );
    };

    if (selectedCourt) {
        return (
            <div className="app-container">
                <CourtDetail
                    court={selectedCourt}
                    onBack={() => setSelectedCourt(null)}
                    addReview={addReview}
                />
            </div>
        );
    }

    return (
        <div className="app-container">
            {/* Header Image with overlay */}
            <div className="header-image-container">
                <img src={headerImage} alt="Tennis Courts Header" />
                <div className="header-overlay">
                    <h1>Tennis Courts</h1>
                    <input
                        type="text"
                        placeholder="Search courts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Court Grid */}
            <div className="court-grid">
                {filteredCourts.map((court) => (
                    <CourtCard key={court.id} court={court} onSelect={setSelectedCourt} />
                ))}
            </div>
        </div>
    );
}