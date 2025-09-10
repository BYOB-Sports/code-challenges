# Tennis/Pickleball Court Finder

## Features

- **Court Listing**: Displays a list of 72 mock tennis/pickleball courts with details like name, city, surface, indoor/outdoor status, and lighting availability.
- **Search and Filter**: Search courts by name or city and filter by surface type (Hard, Clay, Grass, Acrylic).
- **Court Details**: View detailed information about a specific court, including its address, rating, and reviews.
- **Review System**: Add reviews with a name (optional), rating (1-5 stars), and comments, stored in the browser's localStorage.
- **Responsive Design**: Grid-based layout for court listings that adapts to different screen sizes.
- **React Router**: Seamless navigation between the court list and individual court detail pages.

## Tech Stack

- **React**: Frontend library for building the user interface.
- **React Router**: Handles client-side routing for navigating between the court list and detail pages.
- **JavaScript (ES6+)**: Core language for logic and data management.
- **LocalStorage**: Persists user reviews for each court.

## Setup Instructions


2. **Install Dependencies**:
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```
   Required dependencies include `react`, `react-dom`, `react-router-dom`, and any build tools like Vite or Create React App.

3. **Project Structure**:
   ```
   court-finder/
   ├── src/
   │   ├── api/
   │   │   └── courts.js          # Mock dataset of 72 courts
   │   ├── components/
   │   │   ├── CourtDetail.jsx    # Court detail page with review form
   │   │   └── CourtsList.jsx     # Court list with search and filter
   │   ├── hooks/
   │   │   └── useCourtReviews.js # Custom hook for managing reviews
   │   ├── App.jsx                # Main app with routing setup
   │   └── index.jsx              # Entry point
   ├── public/
   │   └── index.html             # HTML template
   ├── package.json
   └── README.md
   ```

4. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` (or the port specified by your setup) in a browser.

## Usage

- **Browse Courts**: On the homepage (`/courts`), view a list of courts. Use the search bar to filter by name or city, or select a surface type from the dropdown.
- **View Court Details**: Click a court to navigate to `/courts/:id`, showing details like address, surface, lighting, and reviews.
- **Submit a Review**: On the court detail page, fill out the review form with an optional name, a star rating, and comments. Reviews are saved to localStorage and displayed below.
- **Navigation**: Use the "Back" link to return to the court list.

## Development Notes

- **Courts Data**: The `courts.js` file generates a mock dataset of 72 courts with varied attributes (surface, lighting, indoor/outdoor, ratings).
- **Review Persistence**: Reviews are stored in localStorage, keyed by court ID, ensuring persistence across page reloads.
- **Routing**: React Router handles navigation between the court list (`/courts`) and detail pages (`/courts/:id`).
- **Accessibility**: Basic ARIA attributes (`role`, `aria-live`) are included in the review form for error messages.