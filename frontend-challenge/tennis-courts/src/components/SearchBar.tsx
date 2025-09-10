import React from "react";
import type { SearchBarProps } from "../utils/types";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search courts by name or address...",
  className = "",
}: SearchBarProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${className}`}
      role="search"
    >
      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-500/40">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          inputMode="search"
          placeholder={placeholder}
          className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          aria-label="Search courts"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}

        <button
          type="submit"
          className="hidden rounded-lg bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-yellow-600 sm:block"
        >
          Search
        </button>
      </div>
    </form>
  );
}
