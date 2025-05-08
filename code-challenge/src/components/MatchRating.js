import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';
import { updatePlayers } from '../api/playerApi';
import { toast } from 'react-toastify';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlayer) {
      toast.error('Please select a player', { autoClose: 5000 });
      return;
    }

    setIsSubmitting(true);
    const submittingToast = toast.info('Submitting rating...', {
      autoClose: false,
      isLoading: true
    });

    try {
      
      await submitRating(selectedPlayer, rating, players);

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

      setPlayers(updatedPlayers);
      await updatePlayers(updatedPlayers);

      toast.dismiss(submittingToast);
      toast.success('Rating submitted successfully!', { autoClose: 3000 });

      const updatedPlayer = updatedPlayers.find(p => p.id === selectedPlayer);
      if (updatedPlayer) {
        setRating(updatedPlayer.averageRating);
      }
    } catch (error) {
      toast.dismiss(submittingToast);
      toast.error(`Error: ${error.message}`, { autoClose: 5000 });
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
          <select 
            value={selectedPlayer} 
            onChange={handlePlayerChange}
            disabled={isSubmitting}
          >
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
            disabled={isSubmitting}
          />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
      </form>
    </div>
  );
};

export default MatchRating;