import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Rating, 
  Divider, 
  Chip, 
  TextField, 
  Paper, 
  Avatar, 
  Grid, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';
import { 
  ArrowBack, 
  LocationOn, 
  SportsTennis, 
  Star, 
  StarBorder, 
  StarHalf,
  AccessTime,
  LocalParking,
  Wc,
  LocalCafe,
  LocalDrink,
  LocalLaundryService,
  Directions,
  Phone,
  Share,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { addReview, getCourtById } from '../data/courts';

const CourtDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 0,
    comment: ''
  });
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchCourtDetails = () => {
      try {
        const courtData = getCourtById(parseInt(id));
        if (courtData) {
          setCourt(courtData);
        } else {
          // Handle court not found
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching court details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourtDetails();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setReviewForm(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewForm.rating > 0 && reviewForm.comment.trim() && reviewForm.userName.trim()) {
      const review = {
        userName: reviewForm.userName,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      };
      
      // In a real app, you would make an API call here
      const success = addReview(parseInt(id), review);
      
      if (success) {
        // Refresh court data to show the new review
        setCourt(getCourtById(parseInt(id)));
        setReviewForm({
          userName: '',
          rating: 0,
          comment: ''
        });
        setReviewDialogOpen(false);
      }
    }
  };

  const handleOpenMaps = () => {
    // In a real app, you would open the device's maps app with the court's location
    const address = encodeURIComponent(`${court.address}, ${court.city}, ${court.state} ${court.zipCode}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const handleCall = () => {
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${court.phone}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading court details...</Typography>
      </Box>
    );
  }

  if (!court) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Court not found</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Back to Courts</Button>
      </Box>
    );
  }

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'Lights':
        return <AccessTime fontSize="small" />;
      case 'Parking':
        return <LocalParking fontSize="small" />;
      case 'Restrooms':
        return <Wc fontSize="small" />;
      case 'Water Fountain':
        return <LocalDrink fontSize="small" />;
      case 'Café':
        return <LocalCafe fontSize="small" />;
      case 'Locker Rooms':
        return <LocalLaundryService fontSize="small" />;
      default:
        return <SportsTennis fontSize="small" />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/* Header with back button and title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pt: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {court.name}
        </Typography>
        <IconButton onClick={() => setFavorite(!favorite)} color={favorite ? 'error' : 'default'}>
          {favorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      {/* Main image */}
      <Box 
        sx={{
          width: '100%',
          height: isMobile ? 200 : 350,
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2,
          position: 'relative',
          boxShadow: 2
        }}
      >
        <img 
          src={court.imageUrl} 
          alt={court.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* Quick info bar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Rating
              value={court.rating}
              precision={0.5}
              readOnly
              size="small"
              icon={<Star fontSize="inherit" />}
              emptyIcon={<StarBorder fontSize="inherit" />}
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {court.rating} ({court.reviewCount} reviews)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn color="action" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {court.city}, {court.state}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ${court.price}<Typography component="span" variant="body2" color="text.secondary">/hour</Typography>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {court.numCourts} {court.numCourts === 1 ? 'court' : 'courts'}
          </Typography>
        </Box>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          startIcon={<Directions />}
          onClick={handleOpenMaps}
        >
          Directions
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          startIcon={<Phone />}
          onClick={handleCall}
        >
          Call
        </Button>
        <IconButton 
          variant="outlined" 
          color="primary"
          sx={{ border: '1px solid', borderColor: 'primary.main' }}
        >
          <Share />
        </IconButton>
      </Box>

      {/* Court details */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>About</Typography>
        <Typography variant="body1" paragraph>{court.description}</Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <SportsTennis color="action" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Surface</Typography>
                <Typography variant="body2">{court.surface}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <AccessTime color="action" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Lighting</Typography>
                <Typography variant="body2">{court.lights ? 'Available' : 'Not Available'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box sx={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', mr: 1 }}>
                {court.indoor ? (
                  <span style={{ fontSize: '1.2rem' }}>🏠</span>
                ) : (
                  <span style={{ fontSize: '1.2rem' }}>☀️</span>
                )}
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Type</Typography>
                <Typography variant="body2">{court.indoor ? 'Indoor' : 'Outdoor'}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box sx={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', mr: 1 }}>
                <span style={{ fontSize: '1.2rem' }}>🎾</span>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Courts</Typography>
                <Typography variant="body2">{court.numCourts} available</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Amenities */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Amenities</Typography>
        <Grid container spacing={2}>
          {court.amenities.map((amenity, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%', 
                  bgcolor: 'action.hover', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 1
                }}>
                  {getAmenityIcon(amenity)}
                </Box>
                <Typography variant="body2">{amenity}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Reviews */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Reviews ({court.reviewCount})
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setReviewDialogOpen(true)}
          >
            Write a Review
          </Button>
        </Box>
        
        {court.reviews.length > 0 ? (
          <Box>
            {court.reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {review.userName}
                    </Typography>
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      icon={<Star fontSize="inherit" />}
                      emptyIcon={<StarBorder fontSize="inherit" />}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              No reviews yet. Be the first to review!
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setReviewDialogOpen(true)}
            >
              Write the First Review
            </Button>
          </Box>
        )}
      </Paper>

      {/* Review Dialog */}
      <Dialog 
        open={reviewDialogOpen} 
        onClose={() => setReviewDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Write a Review</DialogTitle>
        <form onSubmit={handleSubmitReview}>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Your Rating</Typography>
              <Rating
                name="rating"
                value={reviewForm.rating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
                icon={<Star fontSize="inherit" />}
                emptyIcon={<StarBorder fontSize="inherit" />}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Your Name"
              name="userName"
              value={reviewForm.userName}
              onChange={handleInputChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="comment"
              label="Your Review"
              id="comment"
              value={reviewForm.comment}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={!reviewForm.rating || !reviewForm.userName.trim() || !reviewForm.comment.trim()}
            >
              Submit Review
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default CourtDetail;
