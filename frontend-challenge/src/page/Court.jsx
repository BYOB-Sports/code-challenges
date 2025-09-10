import { useParams } from "react-router";
import searchCourt from "../util/searchCourt";
import { useNavigate } from "react-router";
import { useState } from "react";

const Court = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const court = searchCourt(id);

  const [writeReview, setWriteReview] = useState("");

  const handleWriteReview = (e) => {
    setWriteReview(e.target.value);
  };

  const submitReview = () => {
    court.reviews.push(writeReview);
    setWriteReview("");
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-slate-200 p-2 m-4 rounded-2xl cursor-pointer hover:bg-slate-300 transition duration-200"
      >
        <p>Back</p>
      </button>
      <div className="m-4 p-4">
        <img src={court.img} alt="tennis-court" className="rounded-xl" />
      </div>

      <div className="bg-white m-4 rounded-xl p-4">
        <p className="font-bold text-lg mx-2 my-2">Court Information</p>
        <div className="flex flex-col sm:justify-between sm:items-center mx-2 my-2">
          <p className="font-bold text-sm sm:text-xl">{court.name}</p>
          <div className="bg-green-800 px-2 py-1 rounded-2xl w-12 my-2">
            <p className="font-bold text-white text-xs sm:text-sm ">
              {court.surface}
            </p>
          </div>
        </div>
        <p className="text-slate-400 mx-2 my-2 text-sm">{court.location}</p>
        <div className="flex flex-col  sm:justify-between sm:items-center mx-2 my-2">
          <p className="font-bold sm:text-xl">Rating: {court.rating}</p>
          <div className=" sm:px-2 py-1 rounded-2xl">
            <p className="font-bold text-green-800 sm:text-lg">
              ${court.price}/hr
            </p>
          </div>
        </div>

        <div className="m-2 flex flex-col sm:justify-between sm:items-center">
          <p className="text-sm font-bold mb-2">
            Type:
            <span className="ml-1 text-slate-400 font-light">
              {court.indoor ? "Indoor" : "Outdoor"}
            </span>{" "}
          </p>

          <p className="text-sm font-bold">
            Address:
            <span className="ml-1 text-slate-400 font-light">
              {court.address}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white m-4 rounded-xl p-4">
        <p className="font-bold text-xl mb-2">Reviews: </p>

        <div>
          {court.reviews.length === 0 ? (
            <p className="text-slate-400 italic text-sm">
              No reviews yet. Be the first to review this court!
            </p>
          ) : (
            <div className="space-y-3">
              {court.reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-100 rounded-lg border border-slate-200 shadow-sm"
                >
                  <p className="text-slate-700">{review}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <textarea
          className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Write your review here..."
          onChange={handleWriteReview}
          value={writeReview}
        ></textarea>

        <button
          className="mt-3 bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
          onClick={submitReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Court;
