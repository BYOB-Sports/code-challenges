import React, { useState } from "react";
import ReviewForm from "./ReviewForm.jsx";

const boxStyle = {
  background: "#fff",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "18px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid #e3eafc",
  maxWidth: "500px"
};

// Style for the scrollable reviews container
const reviewsContainerStyle = {
  background: "#fff",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid #e3eafc",
  maxWidth: "500px",
  maxHeight: "240px",
  overflowY: "auto",
  marginBottom: "18px"
};

export default function CourtDetail({ court, onAddReview, onBack }) {
  // Stack view with next/prev buttons
  const [currentReview, setCurrentReview] = useState(0);

  function handleNextReview() {
    setCurrentReview((prev) => (prev + 1 < court.reviews.length ? prev + 1 : prev));
  }
  function handlePrevReview() {
    setCurrentReview((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        padding: "0 10px 10px 10px",
        boxSizing: "border-box",
        fontFamily: "'Baloo 2', sans-serif",
        background: "#f5f8ff"
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "#2196f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "6px 12px",
          margin: "20px 0 12px 0",
          fontSize: "1.15em",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer"
        }}
        aria-label="Back"
      >
        <span style={{ fontSize: "1.3em" }}>←</span>
      </button>

      <div style={boxStyle}>
        <h2 style={{ margin: 0, fontWeight: 700, color: "#2196f3", fontSize: "1.4em", letterSpacing: "1px" }}>{court.name}</h2>
        <p style={{ margin: "6px 0 0 0", color: "#2196f3", fontWeight: 700, fontSize: "1.11em" }}>📍 {court.location}</p>
        <div style={{ margin: "6px 0 0 0", fontSize: "1.19em", color: "#2196f3", fontWeight: 700 }}>
          {"★".repeat(Math.round(court.rating))}
          <span style={{ color: "#333", marginLeft: "8px", fontWeight: "bold" }}>{court.rating}</span>
        </div>
        <p style={{ margin: "6px 0 0 0", color: "#555" }}>
          {court.reviews.length} review{court.reviews.length !== 1 ? "s" : ""}
        </p>
      </div>

      
      <ReviewForm onAddReview={onAddReview} boxStyle={{
        ...boxStyle,
        maxWidth: "360px",
        padding: "10px",
        marginBottom: "16px"
      }} />

      
      <h3 style={{ marginBottom: "6px", color: "#2196f3", fontWeight: 700, fontSize: "1.15em" }}>Reviews</h3>
      {court.reviews.length === 0 ? (
        <div style={reviewsContainerStyle}>No reviews yet.</div>
      ) : (
   
        <div style={reviewsContainerStyle}>
          <div style={{ ...boxStyle, marginBottom: "10px", background: "#f5f8ff", border: "none", boxShadow: "none" }}>
            <strong style={{ color: "#2196f3" }}>{court.reviews[currentReview].user}</strong>
            <div
              style={{
                background: "#f0f0f0",
                borderRadius: "6px",
                padding: "6px",
                marginTop: "6px",
                color: "#333"
              }}
            >
              {court.reviews[currentReview].comment}
            </div>
            <div style={{ marginTop: "6px" }}>
              {[1,2,3,4,5].map(i => (
                <span
                  key={i}
                  style={{
                    color: i <= court.reviews[currentReview].rating ? "#2196f3" : "#ccc",
                    fontSize: "1.2em"
                  }}
                >★</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={handlePrevReview}
              disabled={currentReview === 0}
              style={{
                padding: "6px 16px",
                background: "#e3eafc",
                color: "#2196f3",
                border: "none",
                borderRadius: "6px",
                cursor: currentReview === 0 ? "not-allowed" : "pointer",
                opacity: currentReview === 0 ? 0.5 : 1,
                fontWeight: 700
              }}
            >
              Previous
            </button>
            <span style={{ color: "#333", fontWeight: 700 }}>
              {currentReview + 1} / {court.reviews.length}
            </span>
            <button
              onClick={handleNextReview}
              disabled={currentReview === court.reviews.length - 1}
              style={{
                padding: "4px 12px",
                background: "#e3eafc",
                color: "#2196f3",
                border: "none",
                borderRadius: "6px",
                cursor: currentReview === court.reviews.length - 1 ? "not-allowed" : "pointer",
                opacity: currentReview === court.reviews.length - 1 ? 0.5 : 1,
                fontWeight: 700
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


