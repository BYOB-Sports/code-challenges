import React, { useEffect } from 'react';
import { storeRating } from '../api/ratingApi';

const PlayersList = ({ players }) => {
  // Check if ratings are already stored in localStorage and store them if not
  useEffect(() => {
    const initializeRatingsIfNeeded = async () => {
      const ratingsStr = localStorage.getItem('ratings');
      if (!ratingsStr || ratingsStr === '{}') {
        await Promise.all(
          players.map(player => storeRating(player.id, player.averageRating))
        );
      }
    };
    initializeRatingsIfNeeded();
  }, [players]);

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
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.averageRating.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;