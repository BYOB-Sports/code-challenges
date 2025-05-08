import React from 'react';

// Removed the ratingState imports, completely unnecessary
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
          {players.map((player) => {
            return (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>
                {typeof player.averageRating === "number" && !isNaN(player.averageRating)
                  ? player.averageRating.toFixed(1)
                  : "N/A"}
              </td>
            </tr>
              );
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList; 