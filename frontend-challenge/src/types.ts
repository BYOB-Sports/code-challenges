export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type Court = {
  id: string;
  name: string;
  image: string;
  rating: number;
  tags: string[];
  location: string;
  description: string;
  reviews: Review[];
}
