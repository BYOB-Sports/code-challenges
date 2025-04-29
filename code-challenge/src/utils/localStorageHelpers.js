const LS_KEY = "playerRatingState";

// Using this local storage ensures that my changes to the average are consistent even across page refreshes

export const loadRatingState = (players) => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  
      // guarantee we have an entry for every current player
      const state = {};
      players.forEach(p => {
        state[p.id] = stored[p.id] ?? {
          total: p.averageRating ?? 0,  // assume one rating already
          count: 1
        };
      });
      return state;
    } catch {
      // corrupted JSON - start fresh
      return Object.fromEntries(
        players.map(p => [p.id, { total: p.averageRating ?? 0, count: 1 }])
      );
    }
  };
  
  export const saveRatingState = (state) => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  };