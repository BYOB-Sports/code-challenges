import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import courtsData from "../data/courts";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Chip,
  Rating, // New import
} from "@mui/material";

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

const CourtDetail = () => {
  const { id } = useParams();
  const court = courtsData.find((c) => c.id === Number(id));
  const [reviews, setReviews] = useState(court?.reviews || []);
  const [averageRating, setAverageRating] = useState(court?.rating || 0);

  // A key improvement: this function handles both state updates and recalculates the average rating.
  const handleAddReview = (newReview) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    const newAverage = calculateAverageRating(updatedReviews);
    setAverageRating(newAverage);
  };

  if (!court) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" color="error">Court not found.</Typography>
        <Button component={RouterLink} to="/" sx={{ mt: 2 }}>Back to list</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>← Back</Button>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <div>
          <Typography variant="h4" fontWeight="bold">{court.name}</Typography>
          <Typography variant="body1" color="text.secondary">{court.location}</Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>Surface: {court.surface}</Typography>
        </div>
        <Chip label={court.type.toUpperCase()} color={court.type === "private" ? "secondary" : "primary"} />
      </Stack>
      
      <Box sx={{ mt: 1 }}>
        <Rating name="read-only" value={averageRating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary">
          ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>Access</Typography>
      <Typography variant="body2" color="text.secondary">{court.accessDetails}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>Reviews</Typography>
      <ReviewList reviews={reviews} />

      <Typography variant="h6" sx={{ mt: 3 }}>Add a Review</Typography>
      <ReviewForm onAddReview={handleAddReview} />
    </Container>
  );
};

export default CourtDetail;

