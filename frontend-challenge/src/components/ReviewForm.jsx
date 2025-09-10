import { useState } from "react";

const ReviewForm = () => {
  const [text, setText] = useState("");
  return (
    <form action="">
      <textarea
        name="review"
        id="review"
        value={text}
        placeholder="Leave a review"
        className="shadow rounded-lg bg-white w-full h-20 p-1"
        onChange={(e) => setText(e.target.value)}></textarea>
      <button className="bg-blue-400 shadow text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer w-full mt-2 py-1">View</button>
    </form>
  );
};
export default ReviewForm;
