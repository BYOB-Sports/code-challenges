export interface Court {
  id: number;
  name: string;
  location: string;
  surface: string;
  indoor: Boolean;
  lighting: boolean;
  court_num: number;
  access: string;
  price: string;
  amenities: string[];
  parking: string;
  img: string;
  rating: number;
  review_count: number;
}

export interface Review {
  id: number;
  court_id: number;
  rating: number;
  comment: string;
  date: string;
  user?: string;
}
