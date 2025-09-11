import React, { useState, useEffect } from 'react';
import { storeRating, calculateAverageRating } from '../api/ratingApi';
import { updatePlayers } from '../api/playerApi';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedPlayer) {
      const player = players.find(p => p.id === selectedPlayer);
      if (player) {
        setRating(player.averageRating);
      }
    }
  }, [selectedPlayer, players]);

  const calculateNewAverage = (currentAverage, currentRatingCount, newRating) => {
    if (currentRatingCount === 0) return newRating;
    return (currentAverage * currentRatingCount + newRating) / (currentRatingCount + 1);
  };

  const getRatingCount = (playerId) => {
    const ratingsStr = localStorage.getItem('ratings') || '{}';
    const ratings = JSON.parse(ratingsStr);
    return ratings[playerId] ? ratings[playerId].length : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      setMessage('Please select a player');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Submitting rating...');
    
    try {
      
      const currentPlayer = players.find(p => p.id === selectedPlayer);
      const currentRatingCount = getRatingCount(selectedPlayer);
      
      
      const newAverage = calculateNewAverage(
        currentPlayer.averageRating, 
        currentRatingCount, 
        rating
      );
      
      const optimisticPlayers = players.map(player => 
        player.id === selectedPlayer 
          ? { ...player, averageRating: newAverage }
          : player
      );
      setPlayers(optimisticPlayers);
      
      await storeRating(selectedPlayer, rating);
      
      const officialAverage = await calculateAverageRating(selectedPlayer);
    
      const finalPlayers = players.map(player => 
        player.id === selectedPlayer 
          ? { ...player, averageRating: officialAverage }
          : player
      );
      
      await updatePlayers(finalPlayers);
      setPlayers(finalPlayers);
      setRating(officialAverage);
      setMessage('Rating submitted successfully!');
      
    } catch (error) {
      setPlayers(players);
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
              <option key={player.id} value={player.id}>
                {player.name} (Current: {player.averageRating.toFixed(1)})
              </option>
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
          <div className="rating-scale">
            <span>1.0</span>
            <span>4.0</span>
            <span>7.0</span>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !selectedPlayer}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
        
        {message && (
          <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default MatchRating; 