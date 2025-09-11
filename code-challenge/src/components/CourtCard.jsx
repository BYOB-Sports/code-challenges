import { Link } from "react-router-dom";

export default function CourtCard({ court }) {
  const avg =
    court.reviews.length > 0
      ? (
          court.reviews.reduce((s, r) => s + r.rating, 0) /
          court.reviews.length
        ).toFixed(1)
      : "—";

  return (
    <Link to={`/court/${court.id}`} className="card">
      <h2 className="card-title">{court.name}</h2>
      <p className="card-sub">
        {court.city} • {court.surface}
      </p>
      <div className="chip-row">
        {court.indoor ? <span className="chip">Indoor</span> : <span className="chip">Outdoor</span>}
        {court.lights && <span className="chip">Lights</span>}
      </div>
      <div className="rating">Avg Rating: {avg} ★</div>
    </Link>
  );
}
