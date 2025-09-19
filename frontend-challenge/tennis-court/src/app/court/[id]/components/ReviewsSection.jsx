"use client";

import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useState } from "react";

export default function ReviewsSection() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview("");
    }
  };

  return (
    <>
      <Paper
        sx={{ p: 3, borderRadius: 3, mb: 4, backgroundColor: "#f5f7fa" }}
        elevation={0}
      >
        <Typography variant="h6" gutterBottom>
          Leave a Review
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Paper>

      {reviews.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Reviews
          </Typography>
          <Stack spacing={2}>
            {reviews?.map((r, i) => (
              <Paper
                key={i}
                sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
                elevation={0}
              >
                <Typography variant="body2">{r}</Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
}