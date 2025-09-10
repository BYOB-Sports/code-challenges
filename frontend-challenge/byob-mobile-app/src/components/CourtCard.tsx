import { Link } from "react-router-dom";
import type { Court } from "../types/court";
import { StarRating } from "./StarRating";
import { getAverageRating } from "../utils/storage";

type Props = { court: Court };

export function CourtCard({ court }: Props) {
  const avg = getAverageRating(court.id) || court.stars;
  return (
    <Link
      to={`/courts/${court.id}`}
      style={{
        display: "block",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        background: "#fff",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          overflow: "hidden",
          background: "#f3f4f6",
        }}
      >
        <img
          src={court.imagePath}
          alt={court.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16 }}>{court.name}</h3>
          <span
            style={{
              fontSize: 12,
              color: "#6b7280",
              textTransform: "capitalize",
            }}
          >
            {court.surface}
          </span>
        </div>
        <p style={{ margin: "6px 0 10px", color: "#374151", fontSize: 14 }}>
          {court.location}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StarRating value={Math.round(avg)} readOnly />
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            {avg.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
