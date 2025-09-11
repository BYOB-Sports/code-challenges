import React from 'react';

type Props = {
  value: number; // 0-5
  onChange?: (v: 1 | 2 | 3 | 4 | 5) => void;
  size?: number;
};

export default function RatingStars({ value, onChange, size = 18 }: Props) {
  const stars = [1, 2, 3, 4, 5] as const;

  return (
    <div className="stars" style={{ fontSize: size }}>
      {stars.map((n) => {
        const filled = value >= n - 0.5;
        if (!onChange) {
          return (
            <span key={n} aria-hidden className={filled ? 'star filled' : 'star'}>★</span>
          );
        }
        return (
          <button
            type="button"
            key={n}
            className={filled ? 'star filled' : 'star'}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onClick={() => onChange(n)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}


