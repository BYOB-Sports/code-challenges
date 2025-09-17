type Review = { user: string; comment: string; rating: number }

const KEY = 'tennis_reviews_v1'

function readAll(): Record<string, Review[]> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(store: Record<string, Review[]>) {
  localStorage.setItem(KEY, JSON.stringify(store))
}

export function getReviews(courtId: number): Review[] {
  const all = readAll()
  return all[String(courtId)] ?? []
}

export function saveReview(courtId: number, review: Review) {
  const all = readAll()
  const k = String(courtId)
  all[k] = [...(all[k] ?? []), review]
  writeAll(all)
}
