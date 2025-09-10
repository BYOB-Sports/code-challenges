import { useMemo } from "react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
};

export function StarRating({
  value,
  onChange,
  size = 24,
  readOnly = false,
}: Props) {
  const stars = useMemo(() => [1, 2, 3, 4, 5], []);
  return (
    <div style={{ display: "inline-flex", gap: 6 }} aria-label="star rating">
      {stars.map((star) => {
        const filled = value >= star;
        const color = filled ? "#f59e0b" : "#e5e7eb";
        return (
          <button
            key={star}
            type="button"
            onClick={() => !readOnly && onChange?.(star)}
            style={{
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: readOnly ? "default" : "pointer",
            }}
            aria-label={`rate ${star}`}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={color}
              aria-hidden
            >
              <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.211l8.2-1.193z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
