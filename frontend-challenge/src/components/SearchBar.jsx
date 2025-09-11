import React from 'react-router-dom';
export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search courts by name or location"
        className="w-full p-3 rounded-lg border bg-white"
      />
    </div>
  );
}
