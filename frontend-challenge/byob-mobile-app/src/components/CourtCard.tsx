import { Link } from "react-router-dom";
import type { Court } from "../types/court";
import { StarRating } from "./StarRating";
import { getAverageRating } from "../utils/storage";
import styles from "./CourtCard.module.css";

type Props = { court: Court };

export function CourtCard({ court }: Props) {
  const avg = getAverageRating(court.id) || court.stars;
  return (
    <Link to={`/courts/${court.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={court.imagePath} alt={court.name} className={styles.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <h3 className={styles.title}>{court.name}</h3>
          <span className={styles.surface}>{court.surface}</span>
        </div>
        <p className={styles.location}>{court.location}</p>
        <div className={styles.rating}>
          <StarRating value={Math.round(avg)} readOnly />
          <span className={styles.avg}>{avg.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
