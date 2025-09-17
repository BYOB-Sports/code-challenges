import type { Court, FilterOptions } from "@/types"

export function filterCourts(courts: Court[], filters: FilterOptions, searchQuery = ""): Court[] {
  let filtered = courts

  // Search filter (fuzzy search on name and location)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim()
    filtered = filtered.filter(
      (court) =>
        court.name.toLowerCase().includes(query) ||
        court.city.toLowerCase().includes(query) ||
        court.address.toLowerCase().includes(query) ||
        `${court.city}, ${court.state}`.toLowerCase().includes(query),
    )
  }

  // Surface filter
  if (filters.surface) {
    filtered = filtered.filter((court) => court.surface === filters.surface)
  }

  // Lights filter
  if (filters.lights !== undefined) {
    filtered = filtered.filter((court) => court.lights === filters.lights)
  }

  // Indoor/outdoor filter
  if (filters.indoor !== undefined) {
    filtered = filtered.filter((court) => court.indoor === filters.indoor)
  }

  // Free/paid filter
  if (filters.isFree !== undefined) {
    filtered = filtered.filter((court) => court.isFree === filters.isFree)
  }

  // Minimum rating filter
  if (filters.minRating !== undefined) {
    filtered = filtered.filter((court) => court.rating >= filters.minRating)
  }

  // Open now filter (simplified - just check if it's not closed all day)
  if (filters.openNow) {
    const now = new Date()
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const today = dayNames[now.getDay()] as keyof Court["openingHours"]

    filtered = filtered.filter((court) => {
      const todayHours = court.openingHours[today]
      return todayHours !== "Closed" && todayHours !== ""
    })
  }

  return filtered
}

export function sortCourts(courts: Court[], sortBy: "rating" | "reviews" | "distance"): Court[] {
  const sorted = [...courts]

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "reviews":
      return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount)
    case "distance":
      // For now, just return as-is since we don't have user location
      // In a real app, you'd calculate distance from user's location
      return sorted
    default:
      return sorted
  }
}
