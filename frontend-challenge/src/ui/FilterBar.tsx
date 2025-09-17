import React, { useState } from "react";
import { Sliders } from "lucide-react";

export default function FilterBar({
  tags,
  active,
  onToggle,
}: {
  tags: string[];
  active: string[];
  onToggle: (t: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 relative w-full">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
      >
        <Sliders className="w-4 h-4" />
        <span className="text-sm font-medium">Filter</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="top-12 left-0 right-0 pt-4 w-full">
          
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const isActive = active.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => onToggle(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    isActive
                      ? "bg-blue-50 border-blue-400 text-blue-600"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div className="border-b border-gray-200 pb-2 mb-3">
          </div>
        </div>
      )}
    </div>
  );
}
