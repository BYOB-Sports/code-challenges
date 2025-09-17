import courtsData from "./tennis_courts.json";
import { Court } from "../types";
import { Review } from "../types"; 

export const COURTS_PER_PAGE = 10;
export const REVIEWS_PER_PAGE = 5;

export function fetchCourts(
    page: number,
    searchTerm = ""
  ): Promise<{ courts: Court[]; total: number }> {
    const filtered = courtsData.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const total = filtered.length;
    const start = (page - 1) * COURTS_PER_PAGE;
    const courts = filtered.slice(start, start + COURTS_PER_PAGE) as Court[];
    return Promise.resolve({ courts, total });
  }

export function fetchReviews(courtId: string, page: number, reviewsData: Review[]) {
    const start = (page - 1) * REVIEWS_PER_PAGE;
    const reviews = reviewsData.slice(start, start + REVIEWS_PER_PAGE);
    return Promise.resolve({ reviews, total: reviewsData.length });
  }