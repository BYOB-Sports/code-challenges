import { Star } from "lucide-react";

export default function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex items-center" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}