export type SurfaceType = 'hard' | 'clay' | 'grass' | 'indoor';

export interface Court {
  id: string;
  name: string;
  location: string;
  surfaceType: SurfaceType;
  rating: number;
  reviewCount: number;
  priceRange: string;
  amenities: string[];
  image: string;
  description: string;
  phone?: string;
  website?: string;
}