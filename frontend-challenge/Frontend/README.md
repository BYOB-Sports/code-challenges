# 🎾 BYOB - Bring Your Own Balls

A modern, mobile-first React application for discovering and reviewing tennis courts. Built with React, Tailwind CSS, and featuring a beautiful, responsive design with smooth animations and accessibility features.

## 🚀 Live Demo

**[View Live Demo](https://tennis-courts-challenge.vercel.app)** _(Deploy URL will be added after deployment)_

## ✨ Features

### Core Functionality
- **Court Discovery**: Browse 50+ mock tennis courts with realistic data
- **Instant Search**: Real-time filtering by court name, location, or amenities
- **Smart Filtering**: Filter by categories (Featured, Premium, Luxury, Budget Friendly) and court type (Indoor/Outdoor)
- **Multiple Sorting**: Sort by rating, price (low/high), review count, or name
- **Pagination**: Efficient pagination with 12 courts per page
- **Detailed Views**: Comprehensive court detail pages with all information

### User Features
- **Reviews & Ratings**: Leave reviews with 5-star ratings (persisted to localStorage)
- **Favorites**: Bookmark favorite courts (persisted to localStorage)
- **Optimistic UI**: Smooth, responsive interactions with loading states

### Design & UX
- **Mobile-First**: Fully responsive design optimized for all screen sizes
- **Smooth Animations**: Micro-interactions, hover effects, and page transitions
- **Accessibility**: WCAG compliant with keyboard navigation, ARIA labels, and proper contrast
- **Visual Polish**: Custom color scheme (#ff914d primary, #ffe0ae secondary), beautiful cards, and intuitive layout

## 🛠️ Technology Stack

- **React 19** - Latest React with modern hooks and features
- **React Router** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, consistent icons
- **Vite** - Fast build tool and development server
- **Local Storage** - Persistent data for reviews and favorites

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CourtCard.jsx    # Court display card with favorite functionality
│   ├── SearchBar.jsx    # Search input with icon
│   ├── FilterTabs.jsx   # Category filter tabs
│   ├── SortDropdown.jsx # Sorting options dropdown
│   ├── Pagination.jsx   # Page navigation component
│   ├── ReviewForm.jsx   # Review submission form
│   └── ReviewsList.jsx  # Display list of reviews
├── pages/               # Main page components
│   ├── CourtListPage.jsx    # Main courts listing page
│   └── CourtDetailPage.jsx  # Individual court detail page
├── data/                # Mock data and constants
│   └── courts.js        # 50+ tennis courts with realistic data
├── utils/               # Utility functions
│   └── localStorage.js  # Local storage management
└── App.jsx             # Main app component with routing
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Tennis-Courts-Challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 🎨 Design Decisions

### Color Palette
- **Primary (#edb04d)**: Warm golden orange for CTAs, highlights, and active states
- **Secondary (#ffe0ae)**: Light cream for subtle accents and hover states
- **Gray Scale**: Tailwind's gray palette for text, borders, and backgrounds

### Typography
- **Headings**: Caveat font family for a playful, friendly feel
- **Body Text**: Inter font family with light weight (300) for clean readability
- **Responsive**: Scales appropriately across all device sizes

### Typography & Spacing
- **Font**: System fonts for optimal performance and native feel
- **Spacing**: Consistent 8px grid system using Tailwind's spacing scale
- **Typography Scale**: Tailwind's type scale for hierarchical information

### Component Design Philosophy
- **Composition over Inheritance**: Small, focused components that combine well
- **Mobile-First**: All components designed for mobile, enhanced for desktop
- **Accessibility First**: Every interactive element is keyboard accessible
- **Performance**: Lazy loading for images, efficient rendering patterns

### User Experience Decisions
- **Instant Feedback**: Search and filters update immediately
- **Optimistic Updates**: UI updates before server confirmation (simulated)
- **Progressive Disclosure**: Basic info on cards, full details on dedicated pages
- **Consistent Navigation**: Clear back buttons and breadcrumb-style navigation

### Data Management
- **Local Storage**: For user-generated content (reviews, favorites)
- **In-Memory State**: For UI state and filtering
- **Mock Data**: Realistic tennis court data with proper geographic distribution

## 🔧 Performance Optimizations

- **Lazy Loading**: Images load only when visible
- **Efficient Pagination**: Only render visible courts
- **Optimized Filtering**: Memoized filter and sort operations
- **Minimal Re-renders**: Proper React key usage and state management

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Alternative Text**: Descriptive alt text for all images

## 📱 Responsive Design

- **Mobile (320px+)**: Single column layout, touch-friendly interactions
- **Tablet (768px+)**: Two-column grid, optimized for touch and mouse
- **Desktop (1024px+)**: Three-column grid, hover states, enhanced interactions
- **Large Screens (1280px+)**: Maximum width constraints, optimal reading experience

## 🧪 Testing & Quality

- **ESLint**: Code quality and consistency
- **Manual Testing**: Cross-browser and device testing
- **Accessibility Testing**: WAVE and manual keyboard testing
- **Performance**: Lighthouse audits and real-world testing

## 🚀 Deployment

This app is optimized for deployment on:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel
```bash
npm run build
# Upload dist/ folder to Vercel or connect GitHub repo
```

## 🔮 Future Enhancements

- **Real Backend**: Replace localStorage with proper API
- **User Authentication**: User accounts and profiles
- **Booking System**: Actual court reservation functionality
- **Maps Integration**: Interactive maps with court locations
- **Push Notifications**: Court availability alerts
- **Advanced Search**: Distance-based search, availability filtering
- **Social Features**: Share courts, follow other players

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ by [Your Name]**