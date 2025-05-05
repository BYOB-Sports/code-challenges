import React, { useState } from 'react';
import { updatePlayers } from '../api/playerApi';
import { storeRating } from '../api/ratingApi';

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

    setMessage(`Submitting rating...`);

    try {
      // we do storeRating first to ensure the rating is stored in the player's ratings list
      const playerRatings = await storeRating(selectedPlayer, rating);
      //we calculate the average rating locally in the "frontend" instead of the api
      let newAverage = 0;
      if (playerRatings.length > 0) {
        const sum = playerRatings.reduce((acc, r) => acc + r, 0);
        newAverage = sum / playerRatings.length;
      } else {
        newAverage = rating; //this is simply error handling in our case, if the player has no ratings yet, we set the average to the rating we just submitted
      }

      const updatedPlayers = players.map(player =>
        player.id === selectedPlayer //change for the selected player
          ? { ...player, averageRating: newAverage }
          : player
      );
      setPlayers(updatedPlayers);

      await updatePlayers(updatedPlayers);
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