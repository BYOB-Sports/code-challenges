import { getCourtByID } from "@/api/court-api";
import { getReviewsByCourt } from "@/api/review-api";
import CreateReview from "@/components/CreateReview";
import ReviewItem from "@/components/ReviewItem";
import { Review } from "@/models/types";
import {
  Star,
  MapPin,
  Sun,
  Moon,
  Lightbulb,
  ParkingCircle,
  DollarSign,
} from "lucide-react";

interface CourtID {
  params: { id: number };
}

export default async function CourtPage({ params }: CourtID) {
  const court = getCourtByID(params.id);
  const reviews = getReviewsByCourt(params.id);
  //   console.log(reviews);

  return (
    <div className="bg-base-200 min-h-screen p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Court Info */}
        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              src={"/tennis-court.jpg"}
              alt={court?.name}
              className="rounded-t-xl object-cover h-64 w-full"
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-3xl">{court?.name}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {court?.location}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {court?.amenities?.map((amenity: string, index: number) => (
                <span key={index} className="badge badge-outline">
                  {amenity}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                {court?.indoor ? (
                  <Sun className="w-4 h-4 text-orange-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-500" />
                )}
                <span>{court?.indoor ? "Indoor" : "Outdoor"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>{court?.lighting ? "Has lighting" : "No lighting"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ParkingCircle className="w-4 h-4" />
                <span>{court?.parking}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{court?.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Surface:</span>
                <span className="font-semibold">{court?.surface}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{court?.rating ?? "No rating"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>access:</span>
                <span className="font-semibold">{court?.access}</span>
              </div>
              <div className="flex items-center gap-2">
                <span># of courts:</span>
                <span className="font-semibold">{court?.court_num}</span>
              </div>
            </div>

            <div className="mt-6">
              <CreateReview courtID={params.id} />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className=" bg-base-100 shadow-md rounded-t-xl ">
          <div>
            <h2 className="card-title p-2">Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first!</p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((review: Review) => (
                  <li key={review.id} className="p-4 rounded-xl ">
                    <ReviewItem review={review} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
