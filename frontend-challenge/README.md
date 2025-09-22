# Tennis court directory - frontend challenge

## Overview

This is a two-page React/TypeScript application built within a 4-hour time frame.

- Page 1: Directory of tennis courts with search feature.
  - [home page demo video](https://photos.app.goo.gl/qTM4Sj5SRdZR1B1S8)

- Page 2: Detailed information about a selected court including description and reviews.
  - [details page demo video](https://photos.app.goo.gl/vFNeMVZgW1eHq56S9)

My approach was to build a minimal viable product (MVP) first, strictly meeting the core requirements of a 2 page application with a searchable list of all tennis courts and a details page for each with the ability to submit a review. Remaining time was allocated to implementing the review display. To ensure a complete application within the allotted 4 hours, I planned out each component in advance in a detailed visual flow chart.

## Teck stack

- Frontend framework: React v?? with Typescript
- Routing: React Router
- Styling: TailwindCSS
- Build tool: vite

## Features

- Court directory: A homepage listyall available tennis courts with basic info.
- Search: filter list of courts by keywords present in their names.
- Court details view: provides additional information regarding an individual tennis court such as price, location and description
- Review submission: add a review for a particular court and see it instantly on the page.
- Ratings: visual breakdown of ratings and total score.

## Getting started

Run these commands in the terminal:

1. `cd frontend-challenge`
2. `cd ui-code-challenge-submission`
3. `npm install`
4. `npm run dev`

This app should be running on localhost:5173 (or as configured by Vite).

## Design decisions

### Styling choice: TailwindCSS

I initially considered React-Bootstrap, Bulma and TailwindCSS.

- React-Bootstrap: component based, robust, and well supported but less flexible.
- Bulma: lightweight and easy to use but larger file sizes for small projects.
- TailwindCSS: Choosen because it is lightweight, highly customizable, optimized for production and already included in React Router.

### Data simulation

Instead of setting up a backend or mock server, I simulated data with 2 plain typescript files:

- mockCourtData.ts: exports an array of of objects mimicking a JSON structure.
- mockReviewData.ts: exports and object where each key is a id used in courts.ts and the value is a array of objects representing reviews for that associated tennis court. This structure was chosen to reflect how this data might be stored and efficiently retrieved in a database.

### Review ratings

- The star ratings breakdown display and for each review are hardcoded static data. This is because making them dynamic would take additional time and is not a requirement for this challenge.
- The review submission form, by extension, does not include the ability to provide a rating. This prevents a useless ui element that will not match stored data.

### IDs

- Consists of hardcoded data uses sequential numbers represented as strings.
- Submitted reviews use 6 digit randomly generated numbers represented as strings to avoid duplication and tracking ids.
- For a product to be deployed id generation should happen on the backend using longer more complex UUIDs that check for conflict.

## Future Enhancements

- Dynamic ratings calculation and ability to submit a rating with a review
- Backend or API integration for persistent storage.
- More robust ID generation (UUIDs).
- Add pagination for lists of tennis courts and reviews.
- Add account authentication to prevent spamming and misuse.
- Include multiple image displays (such as carousels) to details view.
- Include website and contact info in details view.
- And much more!
