import type { Court } from "../types.ts";
import RatingStars from "./RatingStars.tsx";

export default function CourtCard({
  c,
  onOpen,
}: {
  c: Court;
  onOpen: () => void;
}) {
  return (
    <div
      className="card"
      role="button"
      onClick={onOpen}
      aria-label={`Open ${c.name}`}
    >
      <div className="card-title">{c.name}</div>
      <p className="card-sub">
        {c.surface} • {c.borough} •{" "}
        <span className="badge">{c.lights ? "Lights" : "No lights"}</span>
      </p>
      <div className="card-row">
        <RatingStars value={c.rating} />
        <span className="meta">
          {c.reviewsCount} reviews • {c.distanceKm} km
        </span>
      </div>
    </div>
  );
}
