import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import CourtList from "./components/CourtList";
import CourtDetail from "./components/CourtDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import { courts as initialCourts } from "./data";

export default function App() {
  const [courts, setCourts] = useState(initialCourts);
  const [selectedCourtId, setSelectedCourtId] = useState(null);

  function handleSelectCourt(court) {
    setSelectedCourtId(court.id);
  }

  function handleAddReview(review) {
    setCourts(courts =>
      courts.map(c =>
        c.id === selectedCourtId
          ? { ...c, reviews: [...c.reviews, review] }
          : c
      )
    );
  }

  function handleBack() {
    setSelectedCourtId(null);
  }

  const selectedCourt = courts.find(c => c.id === selectedCourtId);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/courts" element={
          <div className="max-w-md mx-auto min-h-screen bg-white">
            {!selectedCourt ? (
              <CourtList onSelectCourt={handleSelectCourt} />
            ) : (
              <CourtDetail
                court={selectedCourt}
                onAddReview={handleAddReview}
                onBack={handleBack}
              />
            )}
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}