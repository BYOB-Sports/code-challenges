"use client";
import { createReview } from "@/api/review-api";
import { useState } from "react";

const CreateReview: React.FC<{ courtID: number }> = ({ courtID }) => {
  const [newComment, setNewComment] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(0);

  const addNewComment = async () => {
    if (!newComment.trim()) return;
    createReview(courtID, newComment, rating);
    setNewComment("");
  };
  return (
    <>
      {isReviewing ? (
        <div className="flex flex-col space-y-2 w-full">
          <textarea
            className="textarea textarea-bordered w-full rounded-xl"
            placeholder="What are your thoughts"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNewComment();
              }
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsReviewing(true)}
          className="btn bg-green-500 w-full"
        >
          Leave a Review
        </button>
      )}
    </>
  );
};

export default CreateReview;
