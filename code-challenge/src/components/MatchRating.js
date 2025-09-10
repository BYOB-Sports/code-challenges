import React, { useState, useEffect } from 'react';
import { submitRating } from '../api/ratingApi';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  // add past ratings
  const [pastRating, setPastRating] = useState(0);

  useEffect(() => {
    // Reset past rating when player is selected
    const player = players.find(player => player.id === selectedPlayer);
    if (player) {
      setPastRating(player.pastRating || 0); // Use pastRating from player data
    }
  }, [selectedPlayer, players]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      setMessage('Please select a player');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Submitting rating...');
    
  // ORIGINAL
  //   try {
  //     const updatedPlayers = await submitRating(selectedPlayer, rating, players);
      
  //     const updatedRatingsStr = localStorage.getItem('ratings');
  //     const updatedRatings = JSON.parse(updatedRatingsStr || '{}');

  //     const finalPlayers = updatedPlayers.map(player => {
  //       const ratings = updatedRatings[player.id] || [];
  //       const average =
  //         ratings.length > 0
  //           ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
  //           : 0;
  //     return { ...player, averageRating: average, pastRating: player.averageRating };
  //   });
      
  //     setPlayers(updatedPlayers);
  //     setMessage('Rating submitted successfully!');
  //   } catch (error) {
  //     setMessage(`Error: ${error.message}`);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  //1ST ATTEMPT
//   try {
//     // update the player's pastRating with the current averageRating 
//     const updatedPlayers = players.map(player => {
//       if (player.id === selectedPlayer) {
//         const pastRating = player.averageRating;  // save averageRating as pastRating
//         const updatedPlayer = { ...player, pastRating };  // update pastRating

//         // Save new average rating
//         const newAverage = (player.averageRating + rating) / 2; 
//         return { ...updatedPlayer, averageRating: newAverage };  // update averageRating

//       }
//       return player;
//     });
    
//     // submit the new rating
//     const finalPlayers = updatedPlayers.map(player => {
//       return { ...player }; 
//     });

//     setPlayers(updatedPlayers);
//     setMessage('Rating submitted successfully!');
//   } catch (error) {
//     setMessage(`Error: ${error.message}`);
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//2ND ATTEMPT
try {
  // save current average rating and pastRating 
  const playersWithPast = players.map(player => {
    if (player.id === selectedPlayer) {
      return { ...player, pastRating: player.averageRating };
    }
    return player;
  });

  // submit the new rating
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
      <h2>🎾 Rate a Player 🎾</h2>
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
        
        <button   style={{color: '#000000', backgroundColor: '#FFE700', borderRadius: '5px', fontWeight: 'bolder' }} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
        
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default MatchRating; 