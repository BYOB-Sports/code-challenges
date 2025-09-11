import React from 'react';

const PlayersList = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.averageRating - a.averageRating);
  const getStarDisplay = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 7 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <span className="star-rating">
        {'★'.repeat(fullStars)}
        {hasHalfStar ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="players-list">
      <h2>Players and Ratings</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Average Rating</th>
            <th>Visual Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={player.id}>
              <td className="rank">#{index + 1}</td>
              <td>{player.name}</td>
              <td className="rating-number">{player.averageRating.toFixed(1)}</td>
              <td className="rating-stars">{getStarDisplay(player.averageRating)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList; 