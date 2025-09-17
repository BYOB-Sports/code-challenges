"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewForm from "./ReviewForm";
import COURTS from "@/lib/mockData";
import { Review } from "@/lib/types";
import { loadReviews, saveReviews } from "@/lib/storage";
import Header from "./Header";
import Footer from "./Footer";

export default function CourtDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [storageMap, setStorageMap] = useState<Record<string, Review[]>>(() =>
    typeof window !== "undefined" ? loadReviews() : {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const REVIEWS_PER_PAGE = 3;

  const courtIndex = useMemo(() => COURTS.findIndex((c) => c.id === id), [id]);

  const court = useMemo(() => COURTS[courtIndex] ?? COURTS[0], [courtIndex]);
  const reviews = useMemo(() => {
    const persisted = storageMap[court.id] ?? [];
    return [...persisted.slice().reverse(), ...(court.reviews ?? [])];
  }, [storageMap, court]);

  const avgRating = useMemo(() => {
    const all = reviews.map((r) => r.rating);
    if (all.length === 0) return court.rating ?? 0;
    const sum = all.reduce((s, v) => s + v, 0);
    return +(sum / all.length).toFixed(1);
  }, [reviews, court]);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  useEffect(() => {
    setStorageMap(loadReviews());
  }, [id]);

  function handleAddReview(review: Review) {
    setSubmitting(true);
    const next = { ...storageMap };
    if (!next[court.id]) next[court.id] = [];
    next[court.id].push(review);
    saveReviews(next);
    setTimeout(() => {
      setStorageMap(next);
      setSubmitting(false);
      setCurrentPage(1); // jump to first page after adding
    }, 200);
  }

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );
  const nextCourt = COURTS[courtIndex + 1] ?? null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="">
        <div className="relative h-80 sm:h-96 lg:h-[600px] lg:min-h-full">
          {court.photos && court.photos.length > 0 ? (
            <img
              src={court.photos[0]}
              alt={court.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
              No photo
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 w-full text-white"></div>
          <div className="absolute inset-0 bottom-10 flex flex-col justify-end p-4 max-w-6xl mx-auto w-full text-white">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-2xl lg:text-7xl font-bold drop-shadow-sm">
                {court.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm lg:text-base text-gray-100">
                <div>
                  <span className="font-semibold">Surface:</span>{" "}
                  <span className="text-gray-200">{court.surface}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Rating:</span>{" "}
                  <span className="text-yellow-300 font-bold">
                    {avgRating.toFixed(1)}
                  </span>
                  <span className="text-gray-300">/ 5</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-gray-200">
                {court.address} · {court.city}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 p-4 sm:p-8 overflow-hidden w-full">
          <div className="w-full max-w-6xl mx-auto flex justify-center md:justify-start mb-6 sm:mb-8">
            <div className="w-full max-w-md">
              <ReviewForm onSubmit={handleAddReview} submitting={submitting} />
            </div>
          </div>

          <div className="px-5 flex-1 flex flex-col items-center overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-1 flex-col justify-center md:justify-start mb-6 sm:mb-8">
              <h3 className="text-sm font-semibold mb-3 text-slate-700">
                Recent reviews
              </h3>

              {reviews.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-sm text-slate-500 text-center">
                    No reviews yet, be the first to leave one.
                  </div>
                </div>
              ) : (
                <>
                  {/* show only last 3 reviews */}
                  <ul className="space-y-4">
                    {reviews
                      .slice(-3) // take last 3 reviews
                      .map((r) => (
                        <li key={r.id} className="flex gap-3">
                          {/* Avatar */}
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 font-semibold">
                            {r.author?.[0]?.toUpperCase() ?? "U"}
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col">
                            <p className="text-sm text-slate-800">{r.text}</p>

                            <div className="flex items-center mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={star <= r.rating ? "gold" : "none"}
                                  stroke={
                                    star <= r.rating ? "goldenrod" : "gray"
                                  }
                                  className="w-4 h-4 mr-1"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.402c.497.036.7.663.321.988l-4.202 3.602a.563.563 0 00-.182.557l1.285 5.385c.115.482-.416.86-.846.63l-4.727-2.642a.563.563 0 00-.555 0l-4.727 2.642c-.43.23-.961-.148-.846-.63l1.285-5.385a.563.563 0 00-.182-.557l-4.202-3.602c-.38-.325-.176-.952.321-.988l5.518-.402a.563.563 0 00.475-.345L11.48 3.5z"
                                  />
                                </svg>
                              ))}
                            </div>

                            <span className="text-xs text-slate-500 mt-1">
                              {r.author} ·{" "}
                              {new Date(r.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          {nextCourt && (
            <div className="flex justify-end px-4 py-8 pt-10">
              <button
                onClick={() => router.push(`/court/${nextCourt.id}`)}
                className="px-2 h-20 w-20 rounded-full py-3 bg-gray-200  hover:bg-gray-200 transition"
              >
                →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
