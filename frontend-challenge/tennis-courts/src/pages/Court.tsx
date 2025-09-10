import { useLocation, useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { getCourts } from "../api/courts";
import type { Court } from "../utils/types";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function CourtDetail() {
  const { id } = useParams();
  const location = useLocation() as { state?: { court?: Court } };

  const court = useMemo(() => {
    if (location.state?.court) return location.state.court;
    const numId = Number(id);
    return getCourts(50).find((c) => c.id === numId);
  }, [location.state, id]);

  const [reviews, setReviews] = useState<{ text: string; date: string }[]>([]);

  if (!court) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <p className="mb-4 text-red-600">Court not found.</p>
        <Link to="/" className="text-yellow-700 underline">
          ← Back to courts
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <Link to="/" className="text-yellow-700 underline">
        ← Back to courts
      </Link>

      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900">
          {court.title}
        </h1>
        <p className="text-neutral-500">{court.address}</p>
        <div className="flex flex-wrap items-center gap-4 text-neutral-700">
          <span className="font-semibold">Courts: {court.courtCount}</span>
          <span className="font-semibold">Setting: {court.setting}</span>
          <span className="font-semibold">
            Rating: {court.rating.toFixed(1)}{" "}
            <span className="text-neutral-400">({court.ratingCount})</span>
          </span>
          <span className="font-semibold">
            Build: {court.buildLabel ?? "Build None"}
          </span>
        </div>
      </header>

      {/* Image */}
      <figure className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <img
          src={court.imageUrl}
          alt={court.title}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </figure>

      {/* Reviews */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Reviews</h2>

        <ReviewForm onAddReview={(r) => setReviews((prev) => [r, ...prev])} />

        <ReviewList reviews={reviews} />
      </section>
    </div>
  );
}
