import { createContext, useState } from "react";
import dummyCourts from "./dummyCourts";

const CourtContext = createContext();

export const CourtProvider = ({ children }) => {
  const [courts, setCourts] = useState(dummyCourts);

  const getCourt = (id) => courts.find((court) => court.id === id);

  const addReview = (review, id) => {};

  return <CourtContext.Provider value={{ courts, getCourt, addReview }}>{children}</CourtContext.Provider>;
};

export default CourtContext;
