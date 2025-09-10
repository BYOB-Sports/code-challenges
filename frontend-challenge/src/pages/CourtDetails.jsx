import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import CourtContext from "../context/CourtContext";

const CourtDetails = () => {
  const { id } = useParams();
  const { getCourt, addReview } = useContext(CourtContext);
  const court = getCourt(Number(id));
  const { name, address, info, image, reviews } = court;
  const navigate = useNavigate();

  const submitReview = (text, author) => {
    const review = {
      text,
      author,
    };
    addReview(review, Number(id));
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-75 overflow-hidden">
        <img src={image} alt="court" className="absolute inset-0 w-full h-full object-cover" />
        <button
          className="absolute top-4 left-4 opacity-80 bg-white shadow rounded-lg hover:bg-gray-200 hover:cursor-pointer mt-2 py-2 px-4"
          onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
      <div className="m-2">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <h2 className="font-semibold">{address}</h2>
        <p>{info}</p>
        <h2 className="mt-1 font-semibold text-lg">Leave a review:</h2>
        <div className="mt-2">
          <ReviewForm submitReview={submitReview} />
        </div>

        <h2 className="text-lg font-semibold text-center mt-2">Reviews from others:</h2>
        <div>
          {reviews.map((r, i) => (
            <ReviewCard key={i} text={r.text} author={r.author} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CourtDetails;
