# BYOB Sports - Tennis Court Review App

A mobile-first, two-page React application for reviewing tennis courts, built with React, JavaScript, Tailwind, CSS, HTML.

Challenge start time: 6:50 pm September 10th 2025
Challenge finish time: 10:40 pm September 10th 2025

## 🎯 Challenge Requirements Met

### Core Requirements
- ✅ **Two-page application**: Court list view and court detail view
- ✅ **Mobile-first design**: Responsive layout optimized for mobile devices
- ✅ **JavaScript/TypeScript ecosystem only**: Built with React, no external UI frameworks
- ✅ **Court display**: Visual grid of tennis courts with images and key information
- ✅ **Search functionality**: Real-time search by court name or location
- ✅ **Court detail view**: Comprehensive information about selected courts
- ✅ **Review system**: Users can leave and view reviews for courts

### Advanced Features
- ✅ **Filtering & Sorting**: Filter by surface type and indoor/outdoor, sort by price and rating
- ✅ **Interactive UI**: Dropdown menus, collapsible sections, and smooth animations
- ✅ **Contact Information**: Phone, email, and website details for each court
- ✅ **Operating Hours**: Daily schedules with collapsible dropdown interface
- ✅ **Mixed Court Types**: Support for indoor, outdoor, and indoor/outdoor facilities
- ✅ **Professional Branding**: BYOB Sports branding with custom colors and logo

### Future Features I'd Implement ###
- Have picture slide show in detailed view page
- Tennis court inspired background
- Have spinner/loader be an animated tennis ball

### Visuals ###
<img width="329" height="586" alt="Screenshot 2025-09-10 at 10 38 11 PM" src="https://github.com/user-attachments/assets/c287c1c0-b9fd-481b-89ef-74468cdaa7eb" />
<img width="325" height="580" alt="Screenshot 2025-09-10 at 10 37 56 PM" src="https://github.com/user-attachments/assets/5d16e250-fc12-40cc-8cd0-ae91f3eac836" />
<img width="320" height="584" alt="Screenshot 2025-09-10 at 10 37 23 PM" src="https://github.com/user-attachments/assets/be739b03-6246-4860-b9d2-78962107222e" />

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- Modern web browser

### Installation
```bash
cd frontend-challenge
npm install
npm start
```

### Available Scripts
- `npm start`: Development server on http://localhost:3000
- `npm build`: Production build
- `npm test`: Run test suite

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS v3 with custom CSS for complex layouts
- **Icons**: Lucide React for modern, scalable icons
- **Routing**: React Router DOM for client-side navigation
- **Build Tool**: Create React App with PostCSS and Autoprefixer

### Project Structure
```
frontend-challenge/
├── public/
│   ├── byob_logo.avif          # Brand logo
│   ├── byob_icon.png           # Favicon
│   └── court_images/           # Local court images
├── src/
│   ├── components/
│   │   ├── CourtList.js        # Court listing with search/filters
│   │   ├── CourtDetail.js      # Detailed court view
│   │   ├── Navbar.js           # Responsive navigation
│   │   └── *.css               # Component-specific styles
│   ├── data/
│   │   └── mockCourts.js       # Mock data with 54+ courts
│   ├── App.js                  # Main app with routing
│   └── index.js                # Entry point
└── README.md
```

## 🎨 Design Practices & Features

### Mobile-First Responsive Design
- **Breakpoints**: 480px (mobile), 768px (tablet), 1024px (desktop)
- **Flexible Grid**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Large tap targets and intuitive gestures
- **Performance**: Optimized images and efficient CSS

### User Experience (UX) Design
- **Intuitive Navigation**: Clear visual hierarchy and logical flow
- **Search & Discovery**: Real-time search with visual feedback
- **Information Architecture**: Organized content with collapsible sections
- **Accessibility**: ARIA labels, keyboard navigation, and high contrast support

### Visual Design System
- **Brand Colors**:
  - Primary Green: `#004225` (BYOB brand color)
  - Accent Yellow: `#F7F76D` (call-to-action elements)
  - Hover Orange: `#FF8C42` (interactive states)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system for visual rhythm
- **Components**: Reusable UI patterns throughout the app

### Interactive Features
- **Smart Search**: Instant filtering with visual search icon
- **Advanced Filtering**: Multi-criteria filtering (surface, type, price)
- **Collapsible Sections**: Space-efficient contact and hours display
- **Review System**: Helpful/unhelpful voting with user feedback
- **Smooth Animations**: CSS transitions for professional feel

## 🚀 Key Features

### Court List Page
- **Visual Grid**: Court cards with images, ratings, and key details
- **Search Bar**: Real-time search with Lucide React search icon
- **Filter Controls**: Surface type, indoor/outdoor, and price sorting
- **Responsive Layout**: Adapts from single column to multi-column grid
- **Court Type Badges**: Visual indicators for indoor/outdoor/mixed facilities

### Court Detail Page
- **Hero Image**: Large court image with overlay rating display
- **Information Grid**: Surface type, court count, price, and amenities
- **Collapsible Sections**: Contact info and operating hours dropdowns
- **Review System**: User reviews with voting functionality
- **Review Form**: Add new reviews with star rating system

### Navigation & Branding
- **Responsive Navbar**: BYOB Sports branding with dropdown menus
- **Mobile Menu**: Hamburger menu for small screens
- **Brand Integration**: Consistent colors and logo throughout
- **Page Titles**: Dynamic titles and favicon

## 📱 Mobile Optimization

### Performance
- **Local Images**: Optimized court images served from `/public/court_images/`
- **Efficient CSS**: Tailwind CSS with purging for minimal bundle size
- **Lazy Loading**: Images load as needed for better performance
- **Responsive Images**: Appropriate sizing for different screen densities

### Touch Interface
- **Large Tap Targets**: Minimum 44px touch targets for accessibility
- **Swipe Gestures**: Natural mobile interactions
- **Touch Feedback**: Visual feedback for all interactive elements
- **Keyboard Support**: Full keyboard navigation for accessibility

## 🎯 Design Decisions

### Scalability
- **Component Architecture**: Modular, reusable React components
- **CSS Organization**: Component-specific stylesheets for maintainability
- **Data Structure**: Flexible mock data structure for easy expansion
- **State Management**: Local state with React hooks for simplicity

### User Experience
- **Progressive Disclosure**: Information revealed as needed (dropdowns)
- **Visual Feedback**: Clear states for all interactive elements
- **Error Handling**: Graceful handling of missing data
- **Loading States**: Smooth transitions and visual feedback

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## 🛠️ Development Practices

### Code Quality
- **ESLint**: Consistent code formatting and error detection
- **Component Structure**: Single responsibility principle
- **Props Validation**: Type checking for component props
- **Clean Code**: Readable, maintainable code structure

### Performance
- **Bundle Optimization**: Minimal JavaScript and CSS bundles
- **Image Optimization**: Compressed images with appropriate formats
- **CSS Efficiency**: Utility-first approach with Tailwind CSS
- **React Best Practices**: Efficient re-rendering and state management

## 📊 Data Structure

### Court Object
```javascript
{
  id: number,
  name: string,
  location: string,
  rating: number,
  reviewCount: number,
  surface: string,
  courts: number,
  price: string,
  priceValue: number,
  type: "Indoor" | "Outdoor" | "Indoor/Outdoor",
  amenities: string[],
  description: string,
  image: string,
  coordinates: { lat: number, lng: number },
  contact: {
    phone: string,
    email: string,
    website: string
  },
  hours: {
    monday: string,
    tuesday: string,
    // ... other days
  }
}
```

### AI Agent (Cursor) Prompts used ###
- Hello, can you explain the project folder to me. I need to build a 2 page frontend without using frameworks outside of the JavaScript/Typescript ecosystem. I will be evaluated on design choices (friction, scalability, etc), efficient and effective coding, and style. I need to create a mobile first, two page app for reviewing tennis courts. A user should be able to see a display of courts, search for a specific court, select a court detail view, and leave a review. what should i expect going into this assignment?
- Great. we will implement improvements now. First, let's improve CourtList page. Implement a filter and sort option below the search bar. Sort by prices. Filter by surface, indoor/outdoor(implement this in the mockdata).
- Great. Second improvement will be the page name. BYOB Sports should be the app title displayed on the left side of the navbar. In the middle have "Tennis Courts" displayed. Update the tennis courts location to be from around the US. Update the tennis court photos to  photos on unsplash  under "tennis court". this is the link for the search on unsplash: @https://unsplash.com/s/photos/tennis-court 
- update the court images to be populated from /static/court_images folder. only use the ones in that folder.
- Great. Now 
Cursor, create a responsive navbar in React with Tailwind CSS. The navbar should have a yellow background (#F7F76D). On the left side, place the logo stored in public folder called "byob_logo.avif". On the right side, include three nav links: "Our Community", "What We Do", and "Contact Us" in bold dark green (#004225).On hover, each nav link should turn bold orange (#FF8C42). "What We Do" should show a dropdown menu on hover (desktop) with two options: "Get Rated by a Pro" and "Have a Partner to Practice". "Contact Us" should show a dropdown menu on hover (desktop) with two options: "Contact Us" and "Coach Registration". The links should be horizontally aligned with spacing, and vertically centered. Add Tailwind transitions so hover effects and dropdown menus feel smooth. The navbar should have padding and look professional and minimal. Make it mobile-friendly: on smaller screens collapse into a hamburger menu that opens a dropdown list, with "What We Do" and "Contact Us" expandable to show their submenu options.
- It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
- Let's improve the second page of court detail view now. First let's fix some bugs. When a review is left, the helpful button coun't doesn't get increased and by deafult looks "helpful()". make the default "helpful (0)"  Allow for choosing and unchoosing the button. Allow for an unhelpful button as well.
- Make sure to add a router to a court specific page route so when the user refreshes th epage, they will stay in the same court detail view and not be taken to the main page.
- Great. Now make the "back to courts" button #F7F76D and "add review" button #004225
- now remove the cancel-review button and replace with an "x" inside the review-form box by the right top corner. Make sure to not display add review button when review-form is active.
- great. also make sure to change the amenities objecst boxes text color to #004225 and make the box color in a simlar lighter tone.
- Use a different search icon. import { Search } from "lucide-react"; <button className="p-2 bg-[#004225] text-white rounded-full hover:bg-[#FF8C42]">
  <Search size={20} />
</button>
- add contact information and work hours section for the courts. populate the mock data and update the court detail view. Also update so a court can have both an indoor and outdoor court
- make the contact information and operating hours clickable dropdowns so they don't take space on the screen when not needed
- Fix the css so that the information in contact information and operating hours are more compact, have better spacing and display correctly even on small/tight screens
- create a README.md in coding-challenges stating how we met the challenge requirements and summarizing the design practices and features.


## 🎉 Conclusion

This tennis court review application successfully meets all challenge requirements while implementing modern web development best practices. The mobile-first design ensures excellent user experience across all devices, while the component-based architecture provides a solid foundation for future enhancements.

The application demonstrates proficiency in React development, responsive design, user experience design, and accessibility standards, making it a comprehensive solution for tennis court discovery and review.
