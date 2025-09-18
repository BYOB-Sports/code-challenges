import { useEffect, useMemo, useState } from "react";

import CourtDetail from "./pages/CourtDetail.tsx";
import CourtsList from "./pages/CourtsList.tsx";
import { goToDetail, goToList, parseRoute } from "./router.ts";

import { generateCourts, initialReviews } from "./data/mock.ts";
import { addReview, getReviews } from "./storage.ts";
import type { Court } from "./types.ts";

const COURTS_KEY = "byob_courts_v1";

export default function App() {
  const [route, setRoute] = useState(parseRoute());

  // keep hash-based routing in sync
  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // load saved courts once; if none, generate and save them
  const courts = useMemo<Court[]>(() => {
    const saved = localStorage.getItem(COURTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as Court[];
      } catch {
        /* fallthrough to regenerate */
      }
    }
    const gen = generateCourts(60);
    localStorage.setItem(COURTS_KEY, JSON.stringify(gen));
    return gen;
  }, []);

  // seed a few starter reviews only for courts that have none
  useEffect(() => {
    courts.forEach((c) => {
      if (getReviews(c.id).length === 0) {
        initialReviews(c.id).forEach(addReview);
      }
    });
  }, [courts]);

  // detail route
  if (route.name === "detail") {
    const c = courts.find((x) => x.id === route.id);
    if (!c) {
      return (
        <div className="container">
          <p className="meta">Court not found.</p>
        </div>
      );
    }
    return <CourtDetail court={c} onBack={goToList} />;
  }

  // list route
  return <CourtsList courts={courts} onOpen={goToDetail} />;
}
