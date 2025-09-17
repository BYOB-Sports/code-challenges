# Tennis Court Review App

A mobile-first, responsive web application for discovering and reviewing tennis courts. Built with React and Material-UI.

## Features

- Browse a list of tennis courts with detailed information
- Search and filter courts by various criteria (location, surface, amenities, etc.)
- View detailed information about each court
- Read and submit reviews for courts
- Responsive design that works on mobile, tablet, and desktop

## Technologies Used

- React 18
- React Router for navigation
- Material-UI (MUI) for UI components and theming
- CSS3 with CSS Variables for theming
- Responsive design with mobile-first approach

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tennis-court-review.git
   cd tennis-court-review
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  │   ├── CourtCard.js  # Card component for displaying court in list
  │   └── CourtDetail.js # Detailed view of a single court
  ├── data/            # Mock data and API functions
  │   └── courts.js     # Mock data for tennis courts
  ├── pages/           # Page components
  │   └── Home.js      # Main page with court listing and search
  ├── App.js           # Main application component with routing
  └── index.js         # Application entry point
```

## Features in Detail

### Home Page
- Search bar for finding courts by name, location, or surface
- Filter courts by various criteria (surface, amenities, price range, etc.)
- Sort courts by rating, price, or number of reviews
- Responsive grid layout that adapts to different screen sizes

### Court Detail Page
- Detailed information about the court
- Photo gallery
- Amenities list with icons
- Interactive map (placeholder)
- Reviews section with the ability to submit new reviews
- Call and directions buttons

## Styling

The app uses a custom theme with CSS variables for consistent theming. The design follows Material Design principles with a clean, modern look.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Future Improvements

- Add user authentication
- Implement real API integration
- Add court booking functionality
- Include user profiles and saved courts
- Add more advanced filtering and sorting options
- Implement photo uploads for reviews