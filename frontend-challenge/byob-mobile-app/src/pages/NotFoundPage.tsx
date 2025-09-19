import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>🎾</div>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Court Not Found</h2>
      <p className={styles.description}>
        Oops! The tennis court you're looking for doesn't exist or has been
        moved. Let's get you back to exploring our collection of courts.
      </p>
      <Link to="/" className={styles.homeButton}>
        Back to Courts
      </Link>
    </div>
  );
}
