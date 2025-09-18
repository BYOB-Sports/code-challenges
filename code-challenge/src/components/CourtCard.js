import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack
} from "@mui/material";

const CourtCard = ({ court }) => {
  return (
    <Card sx={{ minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="h6">{court.name}</Typography>
          {/* This is a great example of conditional rendering. The chip's color changes based on whether the court is public or private. */}
          <Chip label={court.type} color={court.type === "private" ? "secondary" : "primary"} size="small" />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {court.location}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
          Surface: {court.surface}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={RouterLink}
          to={`/courts/${court.id}`}
          variant="outlined"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourtCard;

