# BYOB Match Rating Improvements

This project improves the match rating flow in the BYOB Tennis app, making it smoother, smarter, and easier for users to rate players.

I focused on two key areas:
- **Fixing the average rating calculation**
-  **Improving the user experience (UX) and user interface (UI)**

---

##  What was fixed

Corrected the average rating formula so that each new rating contributes fairly:
newAverage = (currentAverage * numRatings + newRating) / (numRatings + 1)


Made sure the slider updates to the player’s **new average** after submission.

Kept the dropdown on the **currently selected player** after submission, so users can rate them multiple times easily.

Made sure when a player is selected, the slider auto-fills with their **current average**.

Improved the messages:
- Success → green 
- Error → red

Disabled the submit button when no player is selected.

Sorted players by average rating (leaderboard style).

Added **star ratings** next to player averages.

---

## Why it matters

- Prevents accidental overwriting of player averages.
- Makes it easier and faster to rate multiple players.
- Provides clear visual feedback when a rating is updated.
- Improves leaderboard clarity and adds a more polished UI.
- Gives a smoother and more intuitive user experience overall.

---

## Before and After — Improvements Summary

1. Before → basic UI, no smart updates, no visual feedback.
2. After → slider syncs to average, dropdown stays selected, clear success/error messages.
3. Leaderboard sorted and visually enhanced with star ratings.
4. Overall smoother and more satisfying rating flow.

Images are added in public folder for your reference.

---

## How to test

1. Run the app:
```bash
npm start

```

2. Go to the Match Ratings tab.

3. Select a player, adjust the slider, and submit a rating.

4. Check the Players list to see the updated average and stars.

5. Try rating multiple players in a row to feel the improved flow.

Thank you!
Thanks for the opportunity to work on this challenge!
I’m happy to iterate on feedback or extend improvements further.