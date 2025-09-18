import { useState } from "react";

export default function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const show = hover ?? value;

  return (
    <div className="stars-input-wrap" aria-label="Set rating">
      <div
        className="stars-input"
        role="slider"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={value}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={n <= show ? "on" : ""}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
