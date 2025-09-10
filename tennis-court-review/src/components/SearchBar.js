import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <input
      className="w-full mt-5 mb-2 px-5 py-3 rounded-2xl bg-zinc-100 text-base text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
      placeholder="Search courts or location…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
  );
}
export default SearchBar;
