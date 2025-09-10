import React from "react";

interface StarsProps { rating: number }

export const Stars: React.FC<StarsProps> = ({ rating }) => (
  <div style={{ color: "#ffcc00" }}>
    {"★".repeat(Math.floor(rating))}
    {"☆".repeat(5 - Math.floor(rating))}
  </div>
);
