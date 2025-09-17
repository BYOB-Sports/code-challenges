export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface TennisCourt {
  id: number;
  name: string;
  location: string;
  address: string;
  surface: 'Hard' | 'Clay' | 'Grass';
  price: string;
  hours: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  description: string;
  reviews: Review[];
}

export interface FilterOptions {
  rating: string;
  surface: string;
}
