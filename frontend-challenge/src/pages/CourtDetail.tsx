import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
type Review = { user: string; rating: number; comment: string };
type Court = {
  id: number;
  name: string;
  location: string;
  surface: string;
  reviews: Review[];
};



interface CourtDetailProps {
  court: Court;
  onBack: () => void;
  addReview: (courtId: number, review: Review) => void;
}

export function CourtDetail({ court, onBack, addReview }: CourtDetailProps) { 
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string>("");

  // Helpers: average rating and counts per star
  const getAverageRating = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  const getStarCounts = (reviews: Review[]) => {
    const counts = [0, 0, 0, 0, 0, 0]; // index by rating
    (reviews || []).forEach(r => { counts[r.rating] = (counts[r.rating] || 0) + 1; });
    return counts; // counts[1]..counts[5]
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim()) {
      setError("Name is required.");
      return;
    }
    if (!comment.trim()) {
      setError("Review comment is required.");
      return;
    }
    setError("");
    addReview(court.id, { user, rating, comment });
    setUser("");
    setRating(5);
    setComment("");
  };
  return (
    <Card>
      <CardContent>
        <Button onClick={onBack} sx={{ mb: 2 }} variant="text">Back to List</Button>
        <Stack spacing={1}>
          <Typography variant="h6">{court.name}</Typography>
          <Typography variant="body2"><strong>Location:</strong> {court.location}</Typography>
          <Typography variant="body2"><strong>Surface:</strong> {court.surface}</Typography>
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Reviews</Typography>
          {court.reviews.length === 0 ? (
            <Typography color="text.secondary">No reviews yet.</Typography>
          ) : (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{getAverageRating(court.reviews)}</Typography>
                  <Rating name="read-only" value={getAverageRating(court.reviews)} precision={0.5} readOnly />
                  <Typography variant="caption" color="text.secondary">based on {court.reviews.length} reviews</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Box sx={{ flex: 1 }}>
                  {([5,4,3,2,1] as const).map(star => {
                    const counts = getStarCounts(court.reviews);
                    const count = counts[star] || 0;
                    const percent = court.reviews.length ? Math.round((count / court.reviews.length) * 100) : 0;
                    return (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography sx={{ width: 32, textAlign: 'right' }}>{star}★</Typography>
                        <LinearProgress variant="determinate" value={percent} sx={{ flex: 1, height: 8, borderRadius: 6 }} />
                        <Typography sx={{ width: 40, textAlign: 'right' }}>{count}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1} component="ul" sx={{ listStyle: 'none', p: 0, mt: 0 }}>
                {court.reviews.map((r, i) => (
                  <li key={i}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{r.user} <span style={{ color: '#f5b50a' }}>{'★'.repeat(r.rating)}</span></Typography>
                    <Typography variant="body2" color="text.secondary">{r.comment}</Typography>
                  </li>
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>Add a Review</Typography>
          <Stack spacing={2}>
            <TextField
              id="user"
              label="Name"
              value={user}
              onChange={e => setUser(e.target.value)}
              required
              aria-label="Your name"
              size="small"
              fullWidth
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Rating</Typography>
              <Box role="radiogroup" aria-label="Rating" sx={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(n => (
                  <Button
                    key={n}
                    onClick={() => setRating(n)}
                    aria-pressed={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    size="small"
                    sx={{ minWidth: 0, px: 0.5 }}
                  >
                    <span style={{ color: n <= rating ? '#f5b50a' : '#ccc', fontSize: 20 }}>{'★'}</span>
                  </Button>
                ))}
              </Box>
            </Box>
            <TextField
              id="comment"
              label="Comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              aria-label="Review comment"
              multiline
              rows={3}
              size="small"
              fullWidth
            />
            <CardActions>
              <Button type="submit" variant="contained">Submit Review</Button>
              {error && <Typography color="error" sx={{ ml: 1 }}>{error}</Typography>}
            </CardActions>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
