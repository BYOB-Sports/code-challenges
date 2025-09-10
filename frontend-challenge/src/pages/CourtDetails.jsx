import { useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import CourtContext from "../context/CourtContext";

const CourtDetails = () => {
  const { id } = useParams();
  const { getCourt, addReview } = useContext(CourtContext);
  const court = getCourt(Number(id));
  const { name, address, info, image, reviews } = court;

  const submitReview = (text) => {
    const review = {
      text,
    };
    addReview(review, Number(id));
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-75 overflow-hidden">
        <img src={image} alt="court" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="m-2">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <h2 className="font-semibold">{address}</h2>
        <p>{info}</p>
        <div className="mt-2">
          <ReviewForm submitReview={submitReview} />
        </div>
        <button className="bg-white shadow rounded-lg hover:bg-gray-200 hover:cursor-pointer w-full mt-2 py-1">Back</button>
        <h2 className="text-lg font-semibold text-center mt-2">Reviews from others</h2>
        <div>
          {reviews.map((r, i) => (
            <ReviewCard key={i} text={r.text} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CourtDetails;
