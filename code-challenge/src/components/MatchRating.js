import React, { useState } from "react";
import { calculateAverageRating, submitRating } from "../api/ratingApi";
import { getPlayers } from "../api/playerApi";

const MatchRating = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  const getPlayersAsync = async () => {
    try {
      const players = await getPlayers();
      setPlayer(players[0]);
    } catch (e) {
      setError(e);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await submitRating(player.id, rating);
      const newAverageRating = await calculateAverageRating(player.id, rating);
      setPlayer({ ...player, average_rating: newAverageRating });
      setIsSubmitting(false);
      setRating(0);
    } catch (e) {
      setIsSubmitting(false);
      setError(e);
    }
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!player) {
    return <button onClick={getPlayersAsync}>Get players</button>;
  }

  return (
    <div>
      {/* The UI is very basic and needs to be improved to handle the 10-second delay gracefully. */}
      {isSubmitting ? (
        <p>Submitting rating...</p>
      ) : (
        <div>
          <p>
            {player.name}
            {player.average_rating ? " - " + player.average_rating : ""}
          </p>
          <input
            type="number"
            min="0"
            max="100"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default MatchRating;