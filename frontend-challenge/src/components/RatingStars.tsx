export default function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const arr = Array.from({ length: 5 }, (_, i) =>
    i < full ? "★" : i === full && half ? "☆" : "✩"
  );
  return (
    <span className="stars" aria-label={`Rating ${value} of 5`}>
      {arr.join(" ")}
    </span>
  );
}
