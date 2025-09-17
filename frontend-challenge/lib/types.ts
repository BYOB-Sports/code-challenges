export interface Review {
  id: string
  author: string
   email: string; 
  rating: number
  text: string
  createdAt: string | number;
}

export interface Court {
  id: string
  name: string
  city: string
  address: string
  surface: string
  rating: number
  reviews: Review[]
  photos: string[]
}
