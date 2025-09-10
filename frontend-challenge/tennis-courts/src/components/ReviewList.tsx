import type { Review } from "../utils/types";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-neutral-500">No reviews yet — be the first!</p>;
  }

  return (
    <ul className="space-y-3">
      {reviews.map((r, idx) => (
        <li
          key={idx}
          className="rounded-xl border border-black/5 bg-white p-4 shadow-sm"
        >
          {/* Reviewer Info */}
          <div className="mb-2 flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=EEE&color=555"
              alt="Reviewer avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-neutral-800">John Doe</p>
              <time className="block text-sm text-neutral-400">{r.date}</time>
            </div>
          </div>

          {/* Review text */}
          <p className="text-neutral-700">{r.text}</p>
        </li>
      ))}
    </ul>
  );
}
