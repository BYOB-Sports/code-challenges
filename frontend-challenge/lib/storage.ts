// lib/storage.ts
import type { Review } from './types'

const KEY = 'byob_courts_reviews_v1'

export function loadReviews(): Record<string, Review[]> {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<string, Review[]>) : {}
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to load reviews', e)
    return {}
  }
}

export function saveReviews(map: Record<string, Review[]>) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(KEY, JSON.stringify(map))
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to save reviews', e)
  }
}
