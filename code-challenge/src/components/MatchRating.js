import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';


// Changed the import to include the locally stored rating state 
const MatchRating = ({ players, setPlayers, ratingState, setRatingState }) => {
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
      const prev = ratingState[id] ?? { total: 0, count: 0 };
    
      const newTotal = prev.total + rating;
      const newCount = prev.count + 1;
      const newAverage = newTotal / newCount;

   
      // Do update the API, but this will not be accessed again (only able to store the last rating average with no running weights)
      await submitRating(id, rating, players);

      // Update local value that is stored in UI
      setPlayers(
        players.map(p =>
          p.id === id ? { ...p, averageRating: newAverage } : p
        )
      );

      // Update the rating state and save it in localStorage 
      setRatingState((prevState) => ({
        ...prevState,
        [id]: { total: newTotal, count: newCount },
      }));

      
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