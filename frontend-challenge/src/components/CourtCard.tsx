import React from 'react';
import { Court } from '../types';
import RatingStars from './RatingStars';
import { useCourts } from '../store/CourtsContext';
import { useNavigate } from 'react-router-dom';

type Props = {
  court: Court;
};

export default function CourtCard({ court }: Props) {
  const { getAverageRating, reviewsByCourtId } = useCourts();
  const navigate = useNavigate();
  const avg = getAverageRating(court.id);
  const count = reviewsByCourtId[court.id]?.length ?? 0;

  return (
    <button className="card" onClick={() => navigate(`/court/${court.id}`)}>
      <div className="card-title">{court.name}</div>
      <div className="card-sub">{court.city}, {court.state}</div>
      <div className="card-row">
        <span className={`badge ${court.surface}`}>{court.surface}</span>
        {court.indoor && <span className="badge neutral">indoor</span>}
        {court.lighted && <span className="badge neutral">lights</span>}
        <span className="badge neutral">{court.numCourts} courts</span>
      </div>
      <div className="card-row">
        <RatingStars value={avg} />
        <span className="muted">{avg.toFixed(1)} · {count} review{count !== 1 ? 's' : ''}</span>
      </div>
    </button>
  );
}


