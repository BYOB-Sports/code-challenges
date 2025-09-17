export type Court = {
  id: string
  name: string
  address: string
  city: string
  state: string
  lat: number
  lng: number
  surface: "hard" | "clay" | "grass"
  indoor: boolean
  lights: boolean
  courtsCount: number
  isFree: boolean
  openingHours: {
    mon: string
    tue: string
    wed: string
    thu: string
    fri: string
    sat: string
    sun: string
  }
  thumbnailUrl: string
  rating: number
  reviewsCount: number
}

export type Review = {
  id: string
  courtId: string
  rating: number
  title?: string
  text: string
  user?: string
  createdAt: string
}

export type FilterOptions = {
  surface?: "hard" | "clay" | "grass"
  lights?: boolean
  indoor?: boolean
  openNow?: boolean
  minRating?: number
  isFree?: boolean
}

export type SortOption = "rating" | "reviews" | "distance"
