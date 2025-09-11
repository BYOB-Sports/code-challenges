import { Link } from "react-router-dom";
import RatingStars from "./RatingStarts";
import type { Court } from "../data/courts";

export default function CourtCard({ court }:{ court: Court }){
  return (
    <li className="item card">
      <div className="thumb" aria-hidden />
      <div style={{flex:1}}>
        <div className="row">
          <h3 className="h" style={{fontSize:16}}>{court.name}</h3>
          <span className="badge">{court.surface}</span>
        </div>
        <div className="meta">{court.city} • {court.courts} courts • {court.lights? 'Lights':'No lights'}</div>
        <div style={{marginTop:6}}>
          <RatingStars value={court.rating} />
        </div>
        <div style={{marginTop:10}}>
          <Link className="button" to={`/court/${court.id}`} aria-label={`View ${court.name}`}>View details</Link>
        </div>
      </div>
    </li>
  );
}
