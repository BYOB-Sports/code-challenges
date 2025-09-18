import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRating } from '../api/ratingApi';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      setMessage('Please select a player');
      return;
    }
    
    if (rating === 0) {
      setMessage('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Submitting rating...');
    
    try {
      const updatedPlayers = await submitRating(selectedPlayer, rating, players);
      setPlayers(updatedPlayers);
      setMessage('Rating submitted successfully!');
      setRating(0);
      setSelectedPlayer('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isFilled = starValue <= (hoveredRating || rating);
      
      return (
        <motion.button
          key={i}
          type="button"
          className={`text-3xl transition-colors duration-200 ${
            isFilled ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isSubmitting}
        >
          ★
        </motion.button>
      );
    });
  };

  return (
    <motion.div 
      className="match-rating bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Rate a Player</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Player:
          </label>
          <select 
            id="player-select"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">-- Select a player --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Rating: {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
          </label>
          <div className="flex justify-center space-x-2 mb-2">
            {renderStars()}
          </div>
          <p className="text-xs text-gray-500 text-center">
            Click on a star to rate (1-5 stars)
          </p>
        </div>
        
        <motion.button 
          type="submit" 
          disabled={isSubmitting || rating === 0}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          whileHover={{ scale: isSubmitting || rating === 0 ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting || rating === 0 ? 1 : 0.98 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </motion.button>
        
        {message && (
          <motion.p 
            className={`text-center font-medium ${
              message.includes('Error') ? 'text-red-600' : 'text-green-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default MatchRating; 