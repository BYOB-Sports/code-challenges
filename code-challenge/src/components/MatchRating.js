import React, { useState } from 'react';
// Changed the submitRating import to make more API calls directly
import { storeRating, calculateAverageRating } from '../api/ratingApi';
import { updatePlayers } from '../api/playerApi';


// Changed the imports back. This only uses API calls to change the users ratings. This way, there is less storage needed on the client's side.
// One down side to this approach is that this would use more network data on the user's side to make more API calls. In a mobile setting, we would
// ideally do this calculation on the cloud to save the user's network data and use less computing power (wasting less battery power)
const MatchRating = ({ players, setPlayers, loadingAverages, setLoadingAverages }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      setMessage('Please select a player');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Submitting rating...');
    
    try {

      // Load the values directly
      const id = selectedPlayer;
      const player = players.find(p => p.id === id);

      // Call calculate first to see if this is the first rating
      const currentAverage = await calculateAverageRating(id);

      // If this IS the first rating, we send an API call to store that player's averageRating in the API (since it isn't stored at first)
      if (currentAverage === 0 && player?.averageRating !== undefined) {
        // Inject initial average via the API
        await storeRating(id, player.averageRating);
      }
      
      // Changed the logic behind the API, trying out new logic; Make more API calls from the frontend, and do not rely on localStorage directly (only through the API)

      // Store new rating
      await storeRating(id, rating);

      // Calculate accurate average
      setLoadingAverages(prev => ({ ...prev, [id]: true }));


      // I added a behavior to the calculation of a new average that makes the UI render an ellipsis while this is still running.
      // This makes it so the UI is still usable while the player's average is still being calculated. I thought about just keeping the 
      // old average, but I wanted to make a visual indicator that the new average is still being calculated.
      calculateAverageRating(id).then(updatedAverage => {
        const updatedPlayers = players.map(p =>
          p.id === id ? { ...p, averageRating: updatedAverage } : p
        );

        setPlayers(updatedPlayers);
        updatePlayers(updatedPlayers);

        setLoadingAverages(prev => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      });

      
      setMessage('Rating submitted successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="match-rating">
      <h2>Rate a Player</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="player-select">Select Player:</label>
          <select 
            id="player-select"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">-- Select a player --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="rating-slider">Rating: {rating.toFixed(1)}</label>
          <input 
            type="range" 
            id="rating-slider"
            min="1.0" 
            max="7.0" 
            step="0.1" 
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            disabled={isSubmitting}
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
        
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default MatchRating; 