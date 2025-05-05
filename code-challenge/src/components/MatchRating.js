import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';
import { toast } from 'react-toastify';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlayer) {
      // setMessage('Please select a player');
      toast.error('Please select a player', { autoClose: 5000 });
      return;
    }

    setIsSubmitting(true);
    // setMessage('Submitting rating...');
    toast.info('Submitting rating...', { autoClose: 10000 });

    try {
      const updatedPlayers = await submitRating(selectedPlayer, rating, players);
      setPlayers(updatedPlayers);
      // setMessage('Rating submitted successfully!');
      toast.success('Rating submitted successfully!', { autoClose: 3000 });

    } catch (error) {
      // setMessage(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`);

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
            {players.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
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

          {/* {isSubmitting && (
            <div className="spinner-container">
              <div className="spinner" />
            </div>
          )} */}

        {/* {message && <p className="message">{message}</p>} */}
      </form>
    </div>
  );
};

export default MatchRating; 