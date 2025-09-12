# Tennis Court Reviewer 🎾

A mobile-first React application for discovering and reviewing tennis courts. Built with modern web technologies and optimized for mobile devices.

## Features

- **Court Discovery**: Browse 50+ mock tennis courts with detailed information
- **Search & Filter**: Find courts by name, location, type, or facilities
- **Court Details**: View comprehensive court information including amenities and reviews
- **Review System**: Rate and review courts with a 5-star rating system
- **Mobile-First Design**: Optimized for mobile devices with responsive design
- **Real-time Updates**: Reviews update immediately after submission

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **CSS3** - Mobile-first responsive design
- **Local Storage** - Data persistence
- **Picsum Photos** - Random court images

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend-challenge directory:
   ```bash
   cd frontend-challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
frontend-challenge/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── api/
│   │   └── courtApi.js          # Mock data and API functions
│   ├── components/
│   │   ├── CourtList.js         # Court listing and search
│   │   ├── CourtDetail.js       # Individual court view
│   │   └── ReviewForm.js        # Review submission form
│   ├── App.js                   # Main app component with routing
│   ├── App.css                  # App-specific styles
│   ├── index.js                 # React entry point
│   └── index.css                # Global styles
├── package.json
└── README.md
```

## Key Components

### CourtList
- Displays courts in a responsive grid
- Search functionality with real-time filtering
- Filter by court type and sort options
- Mobile-optimized card layout

### CourtDetail
- Comprehensive court information display
- Tabbed interface for overview and reviews
- Integrated review form
- Star rating display

### ReviewForm
- 5-star rating system with hover effects
- Form validation and error handling
- Character count for review text
- Responsive design

## Design Features

- **Mobile-First**: Designed primarily for mobile devices
- **Responsive Grid**: Adapts from 1 column on mobile to 4 columns on desktop
- **Modern UI**: Clean, card-based design with smooth animations
- **Accessibility**: Proper focus states and keyboard navigation
- **Performance**: Lazy loading images and optimized rendering

## Mock Data

The app includes 50+ mock tennis courts with:
- Realistic court names and locations
- Various court types (Hard, Clay, Grass, etc.)
- Random facilities and amenities
- Generated reviews with ratings
- High-quality placeholder images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

- All data is stored in localStorage for persistence
- Images are loaded from Picsum Photos service
- No backend required - fully client-side application
- Optimized for mobile performance

## Future Enhancements

- User authentication
- Real backend integration
- Map integration for court locations
- Photo upload for court reviews
- Push notifications for new reviews
- Social sharing features

## License

This project is created for the UI Code Challenge.