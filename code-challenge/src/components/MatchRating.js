import React, { useState } from 'react';
import { updatePlayers } from '../api/playerApi';

const MatchRating = ({ players, setPlayers, changeTab }) => {
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
      const updatedPlayers = players.map(player => {
        if(player.id === selectedPlayer){
          if(!player.ratingCount) {
            player.ratingCount = 1; //use the 4.0 baseline as the initial average and keep track of the number of ratings
          }

          const newAverageRating = calculateNewAverage(player, rating); 

          return {
            ...player,
            ratingCount: player.ratingCount + 1,
            averageRating: newAverageRating,
          };
        }
        return player;
      });
      setPlayers(updatedPlayers); //update the players state
      await updatePlayers(updatedPlayers); //store the updated players in local storage
      changeTab('players'); //redirect to players tab after rating submission
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  function calculateNewAverage(player, rating) {
    const currentTotalRating = player.averageRating * player.ratingCount;
    const newTotalRating = currentTotalRating + rating;
    const newCount = player.ratingCount + 1;
    const newAverageRating = newTotalRating / newCount;
    return newAverageRating;
  }

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