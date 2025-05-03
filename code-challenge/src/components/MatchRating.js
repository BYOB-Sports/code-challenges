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

    setMessage(`Submitting rating... This may take up to 10 seconds.`);

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
    <>
      {/* Overlay for submission state */}
      {isSubmitting && (
        <div className="submission-overlay">
          <div className="submission-message">{message}</div>
        </div>
      )}
      <div className={`match-rating ${isSubmitting ? 'submitting' : ''}`}>
        <h2>Rate a Player</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="player-select">Select Player:</label>
            <select
              id="player-select"
              value={selectedPlayer}
              onChange={(e) => {
                setSelectedPlayer(e.target.value);
                setMessage('');
              }}
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
              onChange={(e) => {
                setRating(parseFloat(e.target.value));
                setMessage('');
              }}
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" disabled={isSubmitting || !selectedPlayer}>
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>

          {message && !isSubmitting && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default MatchRating;