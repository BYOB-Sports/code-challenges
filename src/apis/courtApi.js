import courtsJson from "./tennis_courts_mock_with_id.json";

export const getCourts = (props) => {
  try {
    const { page = 1 } = props;

    const index = page - 1;

    const start = 10 * index;

    const results = courtsJson.slice(start, start + 10);

    return results;
  } catch (error) {
    console.log("🚀 ~ getCourts ~ error:", error);
    return [];
  }
};

export const getCourt = (id) => {
  return courtsJson.find((court) => court.id == id);
};
