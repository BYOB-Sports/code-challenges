import { useState } from "react";

const ReviewForm = ({ submitReview }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview(text, author);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="author"
        id="author"
        value={author}
        placeholder="Your name"
        className="shadow rounded-lg bg-white w-full p-1 mb-2"
        autoComplete="off"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        name="review"
        id="review"
        value={text}
        placeholder="Leave a review"
        className="shadow rounded-lg bg-white w-full h-20 p-1"
        onChange={(e) => setText(e.target.value)}></textarea>
      <button type="submit" className="bg-blue-400 shadow text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer w-full mt-2 py-1">
        Submit review
      </button>
    </form>
  );
};
export default ReviewForm;
