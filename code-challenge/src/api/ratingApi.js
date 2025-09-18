import { updatePlayers } from './playerApi';

// Store a new rating
// Optionally seed with a baseline rating (e.g., existing average) on first write
export const storeRating = async (playerId, rating, baselineRating) => {
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  
  if (!ratings[playerId]) {
    ratings[playerId] = [];
    if (typeof baselineRating === 'number' && !Number.isNaN(baselineRating)) {
      ratings[playerId].push(baselineRating);
    }
  }
  
  ratings[playerId].push(rating);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  
  return ratings[playerId];
};

// Calculate average rating
export const calculateAverageRating = async (playerId) => {
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  const playerRatings = ratings[playerId] || [];
  
  // Removed artificial 10-second delay that was blocking the UI
  
  if (playerRatings.length === 0) return 0;
  
  const sum = playerRatings.reduce((acc, rating) => acc + rating, 0);
  return sum / playerRatings.length;
};

// Submit a rating and update player's average
export const submitRating = async (playerId, rating, allPlayers) => {
  // Store the new rating
  const player = allPlayers.find(p => p.id === playerId);
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  const hasExisting = Array.isArray(ratings[playerId]) && ratings[playerId].length > 0;

  // If no prior ratings tracked, seed with the player's current average as baseline
  await storeRating(playerId, rating, hasExisting ? undefined : player?.averageRating);
  
  // Calculate new average
  const newAverage = await calculateAverageRating(playerId);
  
  // Update player's average rating
  const updatedPlayers = allPlayers.map(player => 
    player.id === playerId 
      ? { ...player, averageRating: newAverage }
      : player
  );
  
  // Save updated players
  return await updatePlayers(updatedPlayers);
}; 