import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search courts by name, surface, borough…",
}: {
  value?: string;
  onChange: (q: string) => void;
  placeholder?: string;
}) {
  const [q, setQ] = useState(value);
  const t = useRef<number | null>(null);

  useEffect(() => {
    if (t.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => onChange(q.trim()), 200);
    return () => {
      if (t.current) window.clearTimeout(t.current);
    };
  }, [q, onChange]);

  return (
    <div className="search">
      {/* inline SVG so no assets needed */}
      <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zM10 14.5A4.5 4.5 0 1110 5a4.5 4.5 0 010 9.5z"
          fill="currentColor"
        />
      </svg>
      <input
        className="search__input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        inputMode="search"
        aria-label="Search courts"
      />
    </div>
  );
}
