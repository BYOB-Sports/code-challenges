import { Link } from "react-router-dom";
import type { Court } from "../types";

export default function CourtCard({ court }: { court: Court }) {
  return (
    <Link to={`/court/${court.id}`} className="card">
      <div className="card-title">{court.name}</div>
      <div className="meta">
        <span>{court.city}, {court.state}</span>
        <span>• {court.surface}</span>
        <span>• {court.courts} courts</span>
      </div>
      <div className="rating">
        ⭐ {court.rating.toFixed(1)} ({court.ratingCount})
        {court.lights && <span className="pill">Lights</span>}
        {court.indoor && <span className="pill">Indoor</span>}
      </div>
    </Link>
  );
}
