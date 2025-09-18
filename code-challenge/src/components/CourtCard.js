import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Rating, Chip, Stack } from '@mui/material';
import { LocationOn, SportsTennis, Star, StarBorder, StarHalf } from '@mui/icons-material';

const CourtCard = ({ court }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/court/${court.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        }
      }}
      elevation={2}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ 
            width: { xs: '100%', sm: 150 },
            height: { xs: 150, sm: 'auto' },
            objectFit: 'cover'
          }}
          image={court.imageUrl}
          alt={court.name}
        />
        <CardContent sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" component="div" sx={{ 
            fontWeight: 'bold',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 1
          }}>
            {court.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn color="action" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {court.city}, {court.state}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <SportsTennis color="action" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {court.numCourts} {court.numCourts === 1 ? 'court' : 'courts'} • {court.surface}
              {court.lights && ' • Lights'}
              {court.indoor ? ' • Indoor' : ' • Outdoor'}
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
            {court.amenities.slice(0, 3).map((amenity, index) => (
              <Chip 
                key={index} 
                label={amenity} 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontSize: '0.7rem',
                  height: 24,
                  '& .MuiChip-label': { px: 1 }
                }}
              />
            ))}
            {court.amenities.length > 3 && (
              <Chip 
                label={`+${court.amenities.length - 3} more`} 
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: '0.7rem',
                  height: 24,
                  '& .MuiChip-label': { px: 1 }
                }}
              />
            )}
          </Stack>
          
          <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>
              ${court.price}/hour
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CourtCard;
