# BYOB Tennis Court

This is a small, mobile-first mock app for browsing tennis courts, viewing court details, searching, paginating results, and leaving reviews.

# Libraries used

- Expo / React Native (managed workflow)
- React (UI)
- TypeScript (static types)
- Expo Router / file-based routing (project structure uses app/ routes)
- Basic UI components (local components in the repo)

# Mock data

- Courts and reviews are mocked in: [assets/tennis_courts_mock.json](assets/tennis_courts_mock.json)

# Components

- [`CourtCard`](components/CourtCard.tsx) — card used to display a court in lists
- [`Header`](components/Header.tsx) — app header and navigation affordance
- [`Pagination`](components/Pagination.tsx) — simple pager control for lists
- [`SearchBar`](components/SearchBar.tsx) — search input for filtering courts

Screens (app routes):

- [app/index.tsx](app/index.tsx) — main list entry
- [app/\_layout.tsx](app/_layout.tsx) — global layout / router shell
- [app/courts/[id].tsx](app/courts/[id].tsx) — court detail screen

# Inspiration

UI and interaction were inspired by short-term rental and review patterns (similar to Airbnb): clear listing cards, prominent photos, search, and review flows.

# How to run this project

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the Expo dev server:
   ```sh
   npm start
   ```
   or
   ```sh
   npx expo start
   ```
3. Open the app on a simulator or physical device using the Expo DevTools.
