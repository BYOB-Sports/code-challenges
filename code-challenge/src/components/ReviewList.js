export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="no-reviews">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((r, i) => (
        <div key={i} className="review-item">
          <p>{r.text}</p>
          <span className="review-date">{r.date}</span>
        </div>
      ))}
    </div>
  );
}
