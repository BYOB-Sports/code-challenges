import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Rating, // New import
  Typography, // New import
} from "@mui/material";

const ReviewForm = ({ onAddReview }) => {
  const [name, setName] = useState(""); // New state for name
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // New state for rating

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "" || rating === 0) {
      alert("Please provide a rating and a comment.");
      return;
    }
    const newReview = {
      user: name.trim() === "" ? "Anonymous" : name.trim(), // Use name if provided, otherwise "Anonymous"
      rating: rating,
      comment: comment.trim(),
    };
    onAddReview(newReview);
    setName(""); // Reset name after submission
    setComment("");
    setRating(0);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
    >
      <Typography component="legend">Your Rating</Typography>
      <Rating
        name="review-rating"
        value={rating}
        precision={0.5}
        onChange={(e, newRating) => {
          setRating(newRating);
        }}
      />
      <TextField
        label="Your name (optional)"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Your review"
        variant="outlined"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;


