import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';
import toast from 'react-hot-toast';

const MatchRating = ({ players, setPlayers, isSubmitting, setIsSubmitting }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  // const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rest a message.
    //setMessage('');

    if (!selectedPlayer) {
      toast.error('Please select a player');
      return;
    }
    
    setIsSubmitting(true);
    //setMessage('Submitting rating...');
    
    try {
      // 1. Submit the rating
      const updatedPlayers = await submitRating(selectedPlayer, rating, players);
      
      // 2.Show success message first
      toast.success('Rating submitted successfully!');
      
      // 3.Update the list.
      setPlayers(updatedPlayers);
      
      // 4.Wait a brief moment. We can later use backend or
      // Our api can let us know that everything has been submitted.
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 5. Rest the form
      setSelectedPlayer('');
      setRating(4.0);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="match-rating">
      <h2>Rate a Player</h2>
      <form onSubmit={handleSubmit} className={isSubmitting ? 'submitting' : ''}>
        <div className="form-group">
          <label htmlFor="player-select">Select Player:</label>
          <select 
            id="player-select"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            disabled={isSubmitting}
            className={isSubmitting ? 'disabled' : ''}
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
            className={isSubmitting ? 'disabled' : ''}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? (
            <span className="loading-state">
              <span className="spinner"></span>
              Submitting...
            </span>
          ) : (
            'Submit Rating'
          )}
        </button>

      </form>
    </div>
  );
};

export default MatchRating; 