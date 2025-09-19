"use client";

import { TextField } from "@mui/material";
import { useState, useMemo, useDeferredValue, startTransition } from "react";
import CourtsGrid from "@/components/CourtsGrid";

export default function SearchAndResults({ initialCourts }) {
  const [courts] = useState(initialCourts);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);

  const filteredCourts = useMemo(() => {
    if (!deferredQuery.trim()) {
      return courts;
    }
    
    return courts.filter((court) =>
      court.name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      court.location.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [courts, deferredQuery]);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    
    setQuery(newQuery);
    
    startTransition(() => {
      if (newQuery.length > 2) {
      }
    });
  };

  const isStale = query !== deferredQuery;

  return (
    <>
      <TextField
        fullWidth
        placeholder="Search courts by name or location..."
        value={query}
        onChange={handleSearchChange}
        sx={{ 
          mb: 3,
          opacity: isStale ? 0.7 : 1,
          transition: 'opacity 0.2s ease'
        }}
      />

      {loading ? (
        <CourtsGrid
          courts={Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            name: "",
            photo: "/placeholder.webp",
            rating: 0,
            type: "",
            location: "",
            skeleton: true,
          }))}
        />
      ) : (
        <CourtsGrid 
          courts={filteredCourts} 
          isStale={isStale}
        />
      )}
    </>
  );
}