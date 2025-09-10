import { useState } from "react";
import mockCourts from "../data/mockCourts";
import { searchCourts } from "../utils/searchUtils";

export default function useCourts() {
  const [search, setSearch] = useState("");
  const [surface, setSurface] = useState("");

  const filteredCourts = mockCourts.filter(
    (court) =>
      (!surface || court.surface === surface) && searchCourts(court, search)
  );

  return {
    courts: filteredCourts,
    setSearch,
    setSurface,
    search,
    surface,
  };
}
