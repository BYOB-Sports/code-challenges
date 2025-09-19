import { updatePlayers } from './playerApi';

// Store a new rating
export const storeRating = async (playerId, rating) => {
  console.log('storeRating called with:', { playerId, rating, type: typeof rating });
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  
  if (!ratings[playerId]) {
    ratings[playerId] = [];
  }
  
  ratings[playerId].push(rating);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  console.log('All ratings after storing:', ratings);
  
  return ratings[playerId];
};

// Calculate average rating
export const calculateAverageRating = async (playerId) => {
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  const playerRatings = ratings[playerId] || [];
  
  if (playerRatings.length === 0) return 0;
  
  const sum = playerRatings.reduce((acc, rating) => acc + rating, 0);
  return sum / playerRatings.length;
};

// Submit a rating and update player's average
export const submitRating = async (playerId, rating, allPlayers) => {
  console.log('submitRating called with:', { playerId, rating, playerCount: allPlayers.length });
  
  // Store the new rating
  await storeRating(playerId, rating);
  console.log('Rating stored successfully');
  
  // Calculate new average
  const newAverage = await calculateAverageRating(playerId);
  console.log('New average calculated:', newAverage);
  
  // Update player's average rating
  const updatedPlayers = allPlayers.map(player => 
    player.id === playerId 
      ? { ...player, averageRating: newAverage }
      : player
  );
  
  console.log('Updated player:', updatedPlayers.find(p => p.id === playerId));
  
  // Save updated players
  return await updatePlayers(updatedPlayers);
}; 