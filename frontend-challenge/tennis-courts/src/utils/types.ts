export type Court = {
  id: number;
  title: string;
  address: string;
  courtCount: number;
  setting: "Outdoor" | "Indoor";
  rating: number;
  ratingCount: number;
  imageUrl: string;
  buildLabel?: string;
};

export type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
};

export type Review = { text: string; date: string };
