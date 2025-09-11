# Tennis Court Reviewer

A mobile-first React application for discovering and reviewing tennis courts in New York City. Built as a code challenge demonstrating modern frontend development practices.

## Features

### 🎾 Court Discovery
- Browse 50+ tennis courts across NYC
- Search by court name or location
- Filter and sort courts by various criteria
- View detailed court information including amenities, pricing, and ratings

### ⭐ Review System
- Leave detailed reviews with star ratings
- View reviews from other users
- Real-time rating updates
- Helpful review voting system

### 📱 Mobile-First Design
- Optimized for mobile devices (primary evaluation criteria)
- Responsive design that scales to desktop
- Touch-friendly interface
- Fast loading and smooth interactions

### 🎨 User Experience
- Intuitive navigation between list and detail views
- Beautiful card-based layout
- Smooth animations and transitions
- Accessible design with proper focus management

## Tech Stack

- **React 18** - Modern React with hooks
- **CSS3** - Custom styling with mobile-first approach
- **JavaScript ES6+** - Modern JavaScript features
- **No external frameworks** - Pure React and CSS implementation

## Project Structure

```
src/
├── components/
│   ├── CourtList.js          # Court listing page with search
│   ├── CourtList.css         # Styling for court list
│   ├── CourtDetail.js        # Court detail page with reviews
│   └── CourtDetail.css       # Styling for court detail
├── data/
│   └── mockCourts.js         # Mock data for 50+ courts and reviews
├── App.js                    # Main application component
├── App.css                   # Global app styles
├── index.js                  # React entry point
└── index.css                 # Global styles and reset
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
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

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Key Features Implementation

### Search Functionality
- Real-time search as you type
- Searches both court names and locations
- Case-insensitive matching
- Results counter display

### State Management
- React hooks for local state management
- Efficient state updates for reviews and ratings
- Proper data flow between components

### Responsive Design
- Mobile-first CSS approach
- Breakpoints: 480px, 768px, 1024px, 1200px
- Flexible grid layouts
- Touch-optimized interactions

### Performance Optimizations
- Efficient re-rendering with proper key props
- Optimized images with proper sizing
- CSS transitions instead of JavaScript animations
- Minimal bundle size

## Design Decisions

### Scalability
- Component-based architecture for easy maintenance
- Reusable CSS classes and design patterns
- Flexible grid system that adapts to content
- Efficient data structures for 50+ courts

### User Experience
- Clear visual hierarchy with proper typography
- Consistent spacing and color scheme
- Intuitive navigation patterns
- Loading states and error handling

### Accessibility
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Screen reader friendly

## Mock Data

The application includes comprehensive mock data featuring:
- 50+ tennis courts across all NYC boroughs
- Realistic court information (amenities, pricing, locations)
- Sample reviews with ratings and comments
- High-quality placeholder images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Map integration for court locations
- User authentication and profiles
- Advanced filtering options
- Court availability and booking
- Photo uploads for reviews
- Push notifications for new courts

## Development Notes

This project was built as a code challenge with the following constraints:
- 4-hour time limit
- Mobile-first design focus
- No external frameworks beyond React
- Mock data only (no backend)
- Emphasis on design choices, coding efficiency, and style

The implementation prioritizes user experience, code quality, and scalability while maintaining excellent performance on mobile devices.