import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      position: "relative",
      fontFamily: "'Baloo 2', sans-serif",
      overflow: "hidden"
    }}>
      <div
        style={{
          backgroundImage: "url('/src/data/image1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0
        }}
      />
      <div style={{
        position: "absolute",
        zIndex: 1,
        minHeight: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "rgba(255,255,255,0.28)",
            color: "#000305ff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            marginBottom: "24px",
            fontSize: "1.05em",
            fontWeight: 700,
            boxShadow: "0 1px 4px rgba(33,150,243,0.07)",
            cursor: "pointer",
            backdropFilter: "blur(1px)"
          }}
          aria-label="Back to Home"
        >
          <span style={{ fontSize: "1.15em" }}>←</span> Back to Home
        </button>
        <h2 style={{
          color: "#000305ff",
          fontWeight: 700,
          fontSize: "2em",
          marginBottom: "18px",
          textShadow: "0 2px 10px rgba(255,255,255,0.7)"
        }}>Contact Us</h2>
        <p style={{
          color: "#000305ff",
          fontSize: "1.15em",
          maxWidth: "420px",
          textAlign: "center",
          textShadow: "0 2px 10px rgba(33,150,243,0.12), 0 1px 8px rgba(255,255,255,0.18)"
        }}>
          For questions or feedback,<br />
          email us at <a href="mailto:info@tenniscourtsapp.com" style={{ color: "#000305ff", textDecoration: "underline" }}>info@tenniscourtsapp.com</a>
        </p>
      </div>
    </div>
  );
}