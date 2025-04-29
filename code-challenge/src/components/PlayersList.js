import React from 'react';

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
          {players.map((player,index) => {
            const state = ratingState?.[index];
            const average = state ? (state.total / state.count).toFixed(1) : "N/A";
            return (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{average}</td>
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