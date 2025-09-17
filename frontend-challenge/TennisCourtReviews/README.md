# Tennis Court Reviews

React Native app for finding and reviewing tennis courts.

## What it does

Browse tennis courts, search by location or amenities, view details, and leave reviews. Built for mobile with 50+ courts to demonstrate handling larger datasets.

## How to run

```bash
npm install
npm start
```

Then press `i` for iOS, `a` for Android, or `w` for web.

## Structure

- `src/screens/` - Main app screens (list and detail views)
- `src/data/mockData.ts` - Sample tennis courts and reviews  
- `src/types/` - TypeScript interfaces
- `src/utils/` - Storage helpers

## Features built

**Court listing page:**
- Search courts by name, location, amenities
- Filter by surface type (hard, clay, grass, etc.)
- Cards show ratings, pricing, key info

**Court detail page:**
- Full court information with photos
- View existing reviews and ratings
- Add new reviews with star ratings
- Mock booking button

**Other:**
- TypeScript throughout
- React Navigation between screens
- Local storage for user reviews
- Mobile-optimized layouts

## Tech choices

- Expo for easier React Native development
- TypeScript for better code quality
- FlatList for performance with large court lists
- AsyncStorage for persisting user reviews
- React Navigation for screen transitions

Built in about 4 hours as requested.
