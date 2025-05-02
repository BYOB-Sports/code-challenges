import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [updatedAverage, setUpdatedAverage] = useState(null);
  const [updatedPlayerName, setUpdatedPlayerName] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      setMessage('Please select a player');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Submitting rating...');
    
    try {
      const updatedPlayers = players.map(player => {
        const newPlayer = { ...player };
      
        if (newPlayer.id === selectedPlayer) {
          // Initialize if missing
          if (newPlayer.numRatings === undefined) {
            newPlayer.numRatings = 1;
            newPlayer.totalRating = newPlayer.averageRating;
          }
      
          newPlayer.totalRating += rating;
          newPlayer.numRatings += 1;
      
          newPlayer.averageRating = parseFloat((newPlayer.totalRating / newPlayer.numRatings).toFixed(1));
        }
      
        return newPlayer;
      });
      
    
      // Submit to mock API (no real processing, just returns what we send)
      await submitRating(selectedPlayer, rating, updatedPlayers);
    
      // Update the players state with locally updated data
      setPlayers(updatedPlayers);
      const updatedPlayer = updatedPlayers.find(p => p.id === selectedPlayer);
      setUpdatedAverage(updatedPlayer.averageRating);
      setUpdatedPlayerName(updatedPlayer.name);

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
        {updatedAverage !== null && (
          <p className="average-message">
            {updatedPlayerName}’s new average: {updatedAverage}
          </p>
        )}
      </form>
    </div>
  );
};

export default MatchRating;