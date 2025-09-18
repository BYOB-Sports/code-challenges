
import { useState } from "react";
const DetailView = ({ court, goBack }) => {
    const [review, setReview] = useState("");
    const [reviewsList, setReviewsList] = useState(court.reviews || []);
    const addReview = () => {
        if (review.trim() !== "") {
            setReviewsList([...reviewsList, review]);
            setReview("");
        }
    };

    return (
        <div>
            <button onClick={goBack}>⬅ Back</button>
            <h1>{court.name}</h1>
            <h3>{court.location}</h3>
            <p>{court.description}</p>
            <h4>Reviews:</h4>
            <ul>
                {reviewsList.map((r, idx) => (
                    <li key={idx}>{r}</li>
                ))}
            </ul>

            <input
                type="text"
                placeholder="write a review"
                value={review}
                onChange={(e) => setReview(e.target.value)} />
            <button onClick={addReview}>Submit</button>
        </div>
    );
};

export default DetailView;
