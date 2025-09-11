import { Link } from 'react-router-dom';
import { averageFrom } from '../lib/rating';
import type { Court } from '../data/courts';

export default function CourtCard({ court }: { court: Court }) {
  const avg = averageFrom(court.reviews);
  return (
    <Link to={`/court/${court.id}`} className="card" aria-label={`${court.name} details`}>
      <div className="row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:600}}>{court.name}</div>
          <div className="meta">{court.city} • {court.surface} • {court.courtsCount} courts</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:600}}>{avg.toFixed(1)}</div>
          <div className="meta">{court.reviews.length} reviews</div>
        </div>
      </div>
    </Link>
  );
}
