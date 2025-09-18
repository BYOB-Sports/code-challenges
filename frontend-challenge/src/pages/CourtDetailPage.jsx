import { useParams, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { courts } from "../data/courts";
import ToastContainer from "../components/ToastContainer";
import ReviewSkeleton from "../components/ReviewSkeleton";

const getAvatar = (id) => {
  const avatars = ["🧑", "👩‍🎤", "🎾", "😎", "👨‍💻", "🏸", "👩‍🏫", "🕺"];
  return avatars[id % avatars.length];
};

const ratingLabels = {
  1: "1 - Poor",
  2: "2 - Fair",
  3: "3 - Good",
  4: "4 - Very Good",
  5: "5 - Excellent",
};

export default function CourtDetailPage() {
  const { id } = useParams();
  const court = courts.find((c) => c.id === Number(id));

  const [reviews, setReviews] = useState([
    { id: 1, text: "Great court, very clean!", rating: 5, date: Date.now() - 50000 },
    { id: 2, text: "Surface was a bit worn out.", rating: 3, date: Date.now() - 30000 },
  ]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const toastRef = useRef(null);
  const MAX_CHARS = 250;
  const WARNING_THRESHOLD = 30;

  if (!court) return <p className="p-4">Court not found</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    const review = {
      id: Date.now(),
      text: newReview,
      rating,
      date: Date.now(),
    };
    setLoading(true);
    setTimeout(() => {
      setReviews([review, ...reviews]);
      setNewReview("");
      setRating(5);
      setLoading(false);
      toastRef.current?.addToast("✅ Review added!", "success");
    }, 800);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all reviews?")) {
      setReviews([]);
      toastRef.current?.addToast("🗑️ Reviews cleared", "error");
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest") return b.date - a.date;
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  const renderColoredStars = (value) => {
    const fullStars = Math.floor(value);
    const halfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <span className="flex space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-lg animate-pulse">⭐</span>
        ))}
        {halfStar && <span className="text-yellow-300 text-lg">✩</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-lg">☆</span>
        ))}
      </span>
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto font-sans bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:shadow-md hover:scale-95 transition"
        aria-label="Go back to courts list"
      >
        ← Back
      </Link>

      {/* Court info card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-2xl p-6 mt-4">
        <h1 className="text-3xl font-extrabold flex items-center space-x-2">
          <span>🎾</span>
          <span>{court.name}</span>
        </h1>
        <p className="text-sm mt-2 opacity-90">📍 {court.location}</p>
        <p className="italic text-yellow-200">{court.surface}</p>

        <div className="flex items-center justify-between mt-3">
          {reviews.length > 0 ? (
            <div className="flex items-center space-x-2">
              {renderColoredStars(avgRating)}
              <span className="font-medium">({avgRating.toFixed(1)} / 5)</span>
            </div>
          ) : (
            <p className="italic opacity-80">No reviews yet</p>
          )}

          {reviews.length > 0 && import.meta.env.MODE === "development" && (
            <button
              onClick={handleClear}
              className="text-red-200 text-sm underline"
              aria-label="Clear all reviews"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Sort reviews */}
      {reviews.length > 0 && (
        <div className="mt-5">
          <label className="block text-sm font-medium mb-1">Sort reviews:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          >
            <option value="newest">Newest first</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>
        </div>
      )}

      {/* Reviews list */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Reviews</h2>
      {loading ? (
        <>
          <ReviewSkeleton />
          <ReviewSkeleton />
        </>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 italic">Be the first to leave a review ✍️</p>
      ) : (
        <ul className="space-y-3 mb-5">
          {sortedReviews.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl p-4 shadow-lg bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 flex items-start space-x-3 animate-fade-slide-up border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg shadow-md">
                {getAvatar(r.id)}
              </div>
              <div className="flex-1">
                <p className="text-sm leading-snug">{r.text}</p>
                <div className="flex items-center justify-between mt-2">
                  {renderColoredStars(r.rating)}
                  <span className="text-xs text-gray-500">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add review form */}
      <form onSubmit={handleSubmit} className="space-y-3 border-t pt-4 mt-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          maxLength={MAX_CHARS}
          className="w-full p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-100"
        />
        <div
          className={`flex justify-end text-xs ${
            MAX_CHARS - newReview.length <= WARNING_THRESHOLD
              ? "text-red-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {MAX_CHARS - newReview.length} characters left
        </div>

        {/* Rating stars */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex space-x-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                role="button"
                tabIndex={0}
                title={ratingLabels[star]}
                onClick={() => setRating(star)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setRating(star);
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className={`cursor-pointer text-2xl transition-transform duration-200 ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 scale-125"
                    : "text-gray-300"
                }`}
              >
                {(hoverRating || rating) >= star ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {hoverRating ? ratingLabels[hoverRating] : ratingLabels[rating]}
          </div>
        </div>

        <button
          type="submit"
          disabled={!newReview.trim()}
          className={`w-full py-3 rounded-full font-semibold shadow-md transition ${
            newReview.trim()
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit Review
        </button>
      </form>

      <ToastContainer ref={toastRef} />
    </div>
  );
}
