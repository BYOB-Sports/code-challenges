// src/components/FeatureCardLarge.tsx
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  imgSrc: string;   // e.g., "/assets/partner.avif"
  imgAlt: string;
};

export default function FeatureCard({ title, subtitle, imgSrc, imgAlt }: Props) {
  return (
    <article
      className="card"
      style={{
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
      }}
    >
      {/* Top image (wide rectangle) */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",        // clean rectangle
          background: "#f5f5f5",
        }}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: 16 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
        <p className="meta" style={{ marginTop: 6, lineHeight: 1.5 }}>{subtitle}</p>
      </div>
    </article>
  );
}
