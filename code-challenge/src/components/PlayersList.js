import React from 'react';

const PlayersList = ({ players }) => {
  return (
    <div className="players-list">
      <h2>Players and Ratings</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
  {players.length === 0 ? (
    <tr><td colSpan="2">No players available</td></tr>
  ) : (
    players
      .sort((a, b) => b.averageRating - a.averageRating)
      .map(player => (
        <tr key={player.id}>
          <td>{player.name}</td>
          <td>{player.averageRating.toFixed(1)}</td>
        </tr>
      ))
  )}
  </tbody>
      </table>
    </div>
  );
};

export default PlayersList; 