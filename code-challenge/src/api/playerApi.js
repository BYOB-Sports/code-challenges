// Generate 50+ mock courts
const SURFACES = ["Hard", "Clay", "Grass", "Synthetic"];
const CITIES = ["Austin, TX", "Chicago, IL", "Miami, FL", "Seattle, WA", "San Diego, CA", "New York, NY", "Denver, CO", "Phoenix, AZ"];

const initialPlayers = Array.from({ length: 54 }, (_, i) => ({
  id: String(i + 1),
  name: `Court ${i + 1}`,
  location: CITIES[i % CITIES.length],
  surface: SURFACES[i % SURFACES.length],
  averageRating: Math.round((Math.random() * 6 + 1) * 10) / 10 // 1.0 - 7.0
}));

const initializeStorage = () => {
  if (!localStorage.getItem('players')) {
    localStorage.setItem('players', JSON.stringify(initialPlayers));
  }
  if (!localStorage.getItem('ratings')) {
    localStorage.setItem('ratings', JSON.stringify({})); // legacy (not used directly)
  }
  if (!localStorage.getItem('reviews')) {
    localStorage.setItem('reviews', JSON.stringify({})); // { [courtId]: [{rating, comment, date}] }
  }
};

// Fetch all courts (kept function name for compatibility)
export const fetchPlayers = async () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('players') || '[]');
};

// Update courts in storage (kept function name for compatibility)
export const updatePlayers = async (players) => {
  localStorage.setItem('players', JSON.stringify(players));
  return players;
};

// Convenience helpers
export const getCourtById = async (id) => {
  const courts = await fetchPlayers();
  return courts.find((c) => String(c.id) === String(id)) || null;
};
