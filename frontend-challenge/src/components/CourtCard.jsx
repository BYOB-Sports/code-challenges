import { Link } from 'react-router-dom';

export default function CourtCard({ court }) {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold">{court.name}</h2>
      <p>{court.location}</p>
      <Link
        to={`/court/${court.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View
      </Link>
    </div>
  );
}
