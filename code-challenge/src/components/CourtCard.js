import { Link } from "react-router-dom";

export default function CourtCard({ court }) {
  return (
    <Link to={`/court/${court.id}`} className="court-card">
      <img src={court.image} alt={court.name} className="court-image" />
      <div className="court-info">
        <h2 className="court-title">{court.name}</h2>
        <p className="court-location">{court.location}</p>
      </div>
    </Link>
  );
}
