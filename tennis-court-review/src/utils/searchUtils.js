export function searchCourts(court, search) {
  if (!search) return true;
  return (
    court.name.toLowerCase().includes(search.toLowerCase()) ||
    court.location.toLowerCase().includes(search.toLowerCase())
  );
}
