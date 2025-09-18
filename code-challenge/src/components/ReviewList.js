import React from "react";
import { List, ListItem, ListItemText, Typography, Rating } from "@mui/material";

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: "italic" }}>
        No reviews yet. Be the first to leave one!
      </Typography>
    );
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {reviews.map((review, index) => (
        <ListItem key={index} alignItems="flex-start" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
          <ListItemText
            primary={
              <>
                <Typography component="span" variant="body1" fontWeight="bold">
                  {review.user}
                </Typography>
                <Rating name="read-only-review" value={review.rating} readOnly size="small" sx={{ ml: 1, verticalAlign: "bottom" }} />
              </>
            }
            secondary={
              <Typography sx={{ display: "block", mt: 1 }} component="span" variant="body2" color="text.primary">
                {review.comment}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ReviewList;