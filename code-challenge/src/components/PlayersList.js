import React from 'react';

// Changed the import to include the locally stored rating state
const PlayersList = ({ players, ratingState }) => {
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
              <td>{ratingState[player.id]
                  ? (ratingState[player.id].total / ratingState[player.id].count).toFixed(1)
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