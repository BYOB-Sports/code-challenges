import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';
import { updatePlayers } from '../api/playerApi';

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
      // Call the API but ignore its returned data
      await submitRating(selectedPlayer, rating, players);

      // Manually update players in React
      const updatedPlayers = players.map(player => {
        if (player.id === selectedPlayer) {
          const numRatings = player.numRatings || 1;
          const totalRating = player.averageRating * numRatings;
          const newAverage = (totalRating + rating) / (numRatings + 1);

          return {
            ...player,
            averageRating: newAverage,
            numRatings: numRatings + 1,
          };
        }
        return player;
      });

      // Update React state + localStorage
      setPlayers(updatedPlayers);
      await updatePlayers(updatedPlayers);

      setMessage('Rating submitted successfully!');

      // Update slider to reflect new average
      const updatedPlayer = updatedPlayers.find(p => p.id === selectedPlayer);
      if (updatedPlayer) {
        setRating(updatedPlayer.averageRating);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
 
    }
  };

  const handlePlayerChange = (e) => {
    const selectedId = e.target.value;
    setSelectedPlayer(selectedId);

    const selectedPlayerObj = players.find(p => p.id === selectedId);
    if (selectedPlayerObj) {
      setRating(selectedPlayerObj.averageRating);
    }
  };

  return (
    <div className="match-rating">
      <h2>Rate a Player</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Player:
          <select value={selectedPlayer} onChange={handlePlayerChange}>
            <option value="">-- Select a player --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Rating: {rating.toFixed(1)}
          <input
            type="range"
            min="1"
            max="7"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
          />
        </label>
        <br />
        <button type="submit" disabled={!selectedPlayer || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
        {message && (
          <p className={`message ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default MatchRating;
