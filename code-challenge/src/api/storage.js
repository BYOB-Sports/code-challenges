const KEY = "tennis_courts_v1";

export function loadCourts(defaultCourts) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultCourts;
    return JSON.parse(raw);
  } catch {
    return defaultCourts;
  }
}

export function saveCourts(courts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(courts));
  } catch {
    // ignore quota errors
  }
}
