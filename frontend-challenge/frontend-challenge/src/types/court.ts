export interface Court {
  id: string;
  name: string;
  location: string;
  surfaceType: 'hard' | 'clay' | 'grass' | 'indoor';
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  amenities: string[];
  description: string;
  lighting: boolean;
  covered: boolean;
  bookingRequired: boolean;
}

export interface Review {
  id: string;
  courtId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface NewReview {
  courtId: string;
  userName: string;
  rating: number;
  comment: string;
}