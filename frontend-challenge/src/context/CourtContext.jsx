import { createContext, useState } from "react";
import dummyCourts from "./dummyCourts";

const CourtContext = createContext();

export const CourtProvider = ({ children }) => {
  const [courts, setCourts] = useState(dummyCourts);

  const getCourt = (id) => courts.find((court) => court.id === id);

  const addReview = (review, id) => {
    const newCourts = courts.map((c) => {
      if (c.id === id) return { ...c, reviews: [...c.reviews, review] };
      else return c;
    });
    setCourts(newCourts);
  };

  return <CourtContext.Provider value={{ courts, getCourt, addReview }}>{children}</CourtContext.Provider>;
};

export default CourtContext;
