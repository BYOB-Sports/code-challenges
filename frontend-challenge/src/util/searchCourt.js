import { mockCourts } from "../data/mock-data";

const searchCourt = (id) => {
  return mockCourts.find((court) => court.id == id);
};

export default searchCourt;
