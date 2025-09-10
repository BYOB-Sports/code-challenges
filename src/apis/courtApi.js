import courtsJson from "./tennis_courts_mock_with_id.json";

export const getCourts = (props) => {
  return courtsJson;
};

export const getCourt = (id) => {
  return courtsJson.find((court) => court.id == id);
};
