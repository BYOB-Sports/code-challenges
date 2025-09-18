export type SurfaceType = 'hard' | 'clay' | 'grass';

export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  surface: SurfaceType;
  rating: number;
  reviewCount: number;
  amenities: string[];
  priceRange: string;
  imageUrl: string;
  description: string;
}

export interface Review {
  id: string;
  courtId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}