import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';

const MatchRating = ({ players, setPlayers }) => {
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
      const updatedPlayers = await submitRating(selectedPlayer, rating, players);
      setPlayers(updatedPlayers);
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
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="player-select">Select Player</label>
          <select
            id="player-select"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            disabled={isSubmitting}
            aria-label="Select player to rate"
          >
            <option value="">-- Select a player --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating-slider">
            Rating <span className="rating-value">{rating.toFixed(1)}</span>
          </label>
          <div className="rating-slider-container">
            <input
              type="range"
              id="rating-slider"
              min="1.0"
              max="7.0"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              disabled={isSubmitting}
              aria-valuenow={rating}
              aria-valuemin={1.0}
              aria-valuemax={7.0}
            />
            <div className="rating-scale">
              <span>1.0</span>
              <span>4.0</span>
              <span>7.0</span>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>

        {message && (
          <p className="message" style={{animation: 'fadeIn 0.5s'}}> {message} </p>
        )}
      </form>
    </div>
  );
};

export default MatchRating; 