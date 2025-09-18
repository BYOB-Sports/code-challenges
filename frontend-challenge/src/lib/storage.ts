import type { Review } from './types'

const KEY = 'tc_reviews_v1'

function load(): Record<string, Review[]> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(map: Record<string, Review[]>) {
  localStorage.setItem(KEY, JSON.stringify(map))
}

export function getReviews(courtId: string): Review[] {
  const map = load()
  return map[courtId] ?? []
}

export function addReview(r: Review) {
  const map = load()
  const list = map[r.courtId] ?? []
  map[r.courtId] = [r, ...list]
  save(map)
}

export function getAverageFromReviews(courtId: string): number | null {
  const list = getReviews(courtId)
  if (!list.length) return null
  const sum = list.reduce((a, b) => a + b.rating, 0)
  return Math.round((sum / list.length) * 10) / 10
}
