import React from 'react';

const PlayersList = ({ players }) => {
  return (
    <div className="players-list">
      <h2>🎾 Players and Ratings 🎾 </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Average Rating</th>
            {/* add new column to display the past average ratings */}
            <th>Past Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td class="playername">{player.name}</td>
              <td>{player.averageRating.toFixed(1)}</td>
              <td>{(player.pastRating ?? player.averageRating ?? 0).toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>The past rating section is the original rating by default. Once you submit your rating for a player, the past rating section for that player will be updated</h3>
    </div>
  );
};

export default PlayersList; 