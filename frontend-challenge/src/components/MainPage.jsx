import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        fontFamily: "'Baloo 2', sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Blurred background */}
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
      {/* Content overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          minHeight: "100vh",
          width: "100vw",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1 style={{
          color: "#000305ff",
          fontWeight: 700,
          fontSize: "2.3em",
          marginBottom: "30px",
          letterSpacing: "2px",
          textShadow: "0 2px 10px rgba(255,255,255,0.7)"
        }}>
          🎾 TENNIS COURTS
        </h1>
        <nav style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
          <Link to="/courts" style={{
            fontWeight: 700,
            color: "#000305ff",
            fontSize: "1.22em",
            textDecoration: "underline",
            padding: "8px 28px",
            borderRadius: "12px",
            transition: "background 0.2s",
            boxShadow: "0 1px 4px rgba(33,150,243,0.07)",
            backdropFilter: "blur(1px)"
          }}>
            Courts
          </Link>
          <Link to="/about" style={{
            fontWeight: 700,
            color: "#000305ff",
            fontSize: "1.13em",
            textDecoration: "underline",
            padding: "8px 28px",
            borderRadius: "12px",
            transition: "background 0.2s",
            boxShadow: "0 1px 4px rgba(33,150,243,0.07)",
            backdropFilter: "blur(1px)"
          }}>
            About
          </Link>
          <Link to="/contact" style={{
            fontWeight: 700,
            color: "#000305ff",
            fontSize: "1.13em",
            textDecoration: "underline",
            padding: "8px 28px",
            borderRadius: "12px",
            transition: "background 0.2s",
            boxShadow: "0 1px 4px rgba(33,150,243,0.07)",
            backdropFilter: "blur(1px)"
          }}>
            Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
}