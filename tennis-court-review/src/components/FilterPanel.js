import React from "react";

function FilterPanel({ surfaceTypes, selectedSurface, onChange }) {
  return (
    <div className="mb-5">
      <select
        value={selectedSurface}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-2 border border-zinc-200 bg-zinc-50 text-base text-zinc-600 focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All Surfaces</option>
        {surfaceTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FilterPanel;
