import React, { useState, useRef } from 'react';
import { storeRating } from '../api/ratingApi';
import { updatePlayers } from '../api/playerApi';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);

  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlayer) {
      setMessage('Please select a player');
      scrollToMessage();
      return;
    }

    setIsSubmitting(true);
    setMessage('Submitting rating…');
    scrollToMessage();

    try {
      const raw = localStorage.getItem('ratings') || '{}';
      const ratingsMap = JSON.parse(raw);
      if (!Array.isArray(ratingsMap[selectedPlayer]) || ratingsMap[selectedPlayer].length === 0) {
        const player = players.find(p => p.id === selectedPlayer);
        ratingsMap[selectedPlayer] = [player.averageRating];
        localStorage.setItem('ratings', JSON.stringify(ratingsMap));
      }

      // Storing the new rating in the mock endpoint
      await storeRating(selectedPlayer, rating);

      // Read the updated history and then calculate average
      const updatedMap = JSON.parse(localStorage.getItem('ratings') || '{}');
      const history = updatedMap[selectedPlayer] || [];
      const sum = history.reduce((acc, r) => acc + r, 0);
      const newAvg = sum / history.length;

      // Update players array
      const updatedPlayers = players.map(p =>
        p.id === selectedPlayer
          ? { ...p, averageRating: newAvg }
          : p
      );
      await updatePlayers(updatedPlayers);
      setPlayers(updatedPlayers);

      // showing submitting.. for 1 second instead of 10 second just for user experience
      await new Promise(res => setTimeout(res, 1000));

      // Showing success message after its submitted and scrolling to it, earlier it was not visible after successful submission
      setMessage('Rating submitted successfully!');
      scrollToMessage();

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      scrollToMessage();
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
            onChange={e => setSelectedPlayer(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">-- Select a player --</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
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
            onChange={e => setRating(parseFloat(e.target.value))}
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit Rating'}
        </button>
      </form>

      {message && (
        <p ref={messageRef} className="message">
          {message}
        </p>
      )}
    </div>
  );
};

export default MatchRating;
