# CourtFinder (Vite + React + TypeScript + Tailwind)


## Requirements
- Node.js 20.19+ (or 22.12+)
- npm 10+

## Quick start
```bash
npm install
npm run dev
```
Dev server will print a local URL (default `http://localhost:5173`).

## Scripts
- npm run dev – start Vite dev server
- npm run build – type-check and build for production
- npm run preview – preview the production build
- npm run lint – run ESLint

## Tech stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4 (`@tailwindcss/postcss` + `@tailwindcss/vite`)
- Framer Motion (animations)
- lucide-react (icons)

## App structure (key files)
- src/pages/CourtListPage.tsx – main list, search, featured rows
- src/pages/CourtDetailPage.tsx – details, info grid, reviews
- src/components/CourtCard.tsx – card UI for a court
- src/data/mockData.ts – mock courts and reviews (uses images below)

## Routing
- / → list page
- /court/:id → detail page

## Demo

> Screenshots are in `public/demo/` (this folder is tracked in the repo).

### List and Search
![List](./public/demo/Screenshot%202025-09-17%20151512.png)

### Featured rows and Cards
![Featured](./public/demo/Screenshot%202025-09-17%20151528.png)

### Detail Page
![Detail](./public/demo/Screenshot%202025-09-17%20151605.png)

### Reviews
![Reviews](./public/demo/Screenshot%202025-09-17%20151613.png)