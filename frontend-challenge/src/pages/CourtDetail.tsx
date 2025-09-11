import { useParams, useNavigate } from "react-router-dom";
import { courts } from "../data/courts";
import { useMemo, useState } from "react";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import { ArrowLeft, MapPin, User } from "lucide-react";
import CourtCarousel from "../components/CourtCarousel";

export default function CourtDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const court = useMemo(() => courts.find((c) => c.id === Number(id)), [id]);
  const [reviews, setReviews] = useState<string[]>(court?.reviews ?? []);

  if (!court) return <div className="p-4">Court not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-green-light to-white dark:from-gray-900 dark:to-black font-sans">
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-1/2">
          <CourtCarousel images={court.images} />
          <button
            onClick={() => nav(-1)}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70 active:scale-95 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 lg:p-6 -mt-6 lg:mt-0">
          <section className="max-w-md mx-auto lg:mx-0 lg:max-w-none px-4 lg:px-0 relative z-10">
            <div className="rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-card border border-gray-100 dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {court.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" /> {court.location} • {court.distanceKm} km
              </p>
              <div className="mt-2 flex items-center gap-2">
                <RatingStars value={court.rating} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {court.rating}/5 ({reviews.length} reviews)
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${
                    court.surface === "Grass"
                      ? "bg-brand-grass"
                      : court.surface === "Clay"
                      ? "bg-brand-clay"
                      : "bg-brand-green"
                  }`}
                >
                  {court.surface}
                </span>
                {court.indoor && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                    Indoor
                  </span>
                )}
                {court.lights && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                    Lights
                  </span>
                )}
              </div>
            </div>
          </section>

          <section className="max-w-md mx-auto lg:mx-0 lg:max-w-none px-4 lg:px-0 mt-6">
            <h2 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Reviews</h2>
            {reviews.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-5xl mb-2">💬</div>
                <p className="font-medium">No reviews yet</p>
                <p className="text-sm">Be the first to share your thoughts.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {reviews.map((r, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start rounded-xl bg-white dark:bg-gray-800 p-3 shadow-card border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">{r}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <ReviewForm onSubmit={(text) => setReviews([text, ...reviews])} />
        </div>
      </div>
    </div>
  );
}