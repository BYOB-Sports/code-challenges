# Tennis Court Review App - React + TypeScript

A modern, mobile-first tennis court review application built with React, TypeScript, and Tailwind CSS. This project demonstrates modern React development practices, component architecture, and responsive design principles.

## 🚀 Features

### 🎾 Court Discovery & Management

- **52+ Tennis Courts**: Comprehensive database of tennis courts across the United States
- **Real-time Search**: Instant search across court names, locations, addresses, and descriptions
- **Advanced Filtering**: Filter by rating (3+, 4+, 5 stars) and surface type (Hard, Clay, Grass)
- **Responsive Grid**: Adaptive layout (1 column mobile, 2 tablet, 3 desktop, 4 large screens)
- **Debounced Search**: Optimized search performance with 250ms debouncing

### ⭐ Interactive Review System

- **Star Rating Component**: Interactive 5-star rating system with hover effects
- **Review Form**: Complete form with name, rating, and text review
- **Form Validation**: Client-side validation with user feedback
- **Real-time Updates**: Instant rating updates and review display
- **Review Display**: Beautiful review cards with user info and formatted dates

### 📱 Mobile-First Design

- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets (44px minimum) for mobile interaction
- **Smooth Animations**: Fade-in, hover effects, and micro-interactions
- **Sticky Navigation**: Persistent header with back button functionality
- **Mobile Typography**: Responsive text sizing and spacing

### 💾 Data Persistence

- **Local Storage**: Search terms and filters persist across sessions
- **State Management**: React hooks for efficient state handling
- **Performance Optimization**: Memoized filtering and search operations

## 🛠️ Technical Stack

### Core Technologies

- **React 19.1.1**: Latest React with modern hooks and features
- **TypeScript 5.8.3**: Full type safety and enhanced developer experience
- **Vite 7.1.2**: Lightning-fast development server and build tool
- **Tailwind CSS 3.4.17**: Utility-first CSS framework for rapid styling

### Development Tools

- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing
- **Font Awesome 6**: Professional icon library

### Build & Deployment

- **ESBuild**: Optimized production builds
- **Tree Shaking**: Automatic dead code elimination
- **Hot Module Replacement**: Instant development updates

## 📁 Project Structure & File Organization

```
frontend-challenge/
├── src/
│   ├── components/              # React Components
│   │   ├── CourtCard.tsx       # Individual court display card
│   │   ├── CourtDetail.tsx     # Detailed court view page
│   │   ├── Navbar.tsx          # Navigation header component
│   │   ├── ReviewForm.tsx      # Review submission form
│   │   ├── ReviewItem.tsx      # Individual review display
│   │   ├── SearchAndFilters.tsx # Search and filter controls
│   │   └── StarRating.tsx      # Interactive star rating component
│   ├── data/
│   │   └── courts.ts           # Mock tennis court database (52 courts)
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── helpers.ts          # Utility functions and helpers
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application-specific styles
│   ├── main.tsx               # React application entry point
│   ├── index.css              # Global styles and Tailwind imports
│   └── vite-env.d.ts          # Vite environment type definitions
├── public/                     # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── PROJECT_README.md          # This documentation file
```

## 🔧 Component Architecture

### Core Components

#### **App.tsx** - Main Application

- **Purpose**: Root component managing application state and routing
- **Key Features**:
  - State management for current page, search, filters, and courts
  - Local storage persistence for search terms and filters
  - Court filtering logic with useMemo optimization
  - Review submission handling
- **State Management**:
  ```typescript
  const [currentPage, setCurrentPage] = useState<"court-list" | "court-detail">(
    "court-list"
  );
  const [selectedCourt, setSelectedCourt] = useState<TennisCourt | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    rating: "",
    surface: "",
  });
  ```

#### **CourtCard.tsx** - Court Display Card

- **Purpose**: Displays individual court information in a card format
- **Key Features**:
  - Responsive design with mobile-first approach
  - Hover effects and smooth transitions
  - Click handling for navigation to detail view
  - Amenities display with truncation
- **Props Interface**:
  ```typescript
  interface CourtCardProps {
    court: TennisCourt;
    onClick: (courtId: number) => void;
  }
  ```

#### **CourtDetail.tsx** - Court Detail Page

- **Purpose**: Comprehensive court information and review system
- **Key Features**:
  - Full court information display
  - Integrated review form and review list
  - Responsive grid layout for court details
  - Mobile-optimized spacing and typography

#### **SearchAndFilters.tsx** - Search & Filter Controls

- **Purpose**: Search input and filter dropdowns
- **Key Features**:
  - Debounced search input (250ms delay)
  - Clear search button functionality
  - Rating and surface type filters
  - Responsive layout with centered alignment

#### **StarRating.tsx** - Interactive Star Rating

- **Purpose**: Reusable star rating component
- **Key Features**:
  - Interactive and display modes
  - Three size variants (sm, md, lg)
  - Hover effects and smooth transitions
  - Half-star support for decimal ratings
- **Props Interface**:
  ```typescript
  interface StarRatingProps {
    rating: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    size?: "sm" | "md" | "lg";
  }
  ```

#### **ReviewForm.tsx** - Review Submission

- **Purpose**: Form for submitting new reviews
- **Key Features**:
  - Form validation with user feedback
  - Loading states during submission
  - Form reset after successful submission
  - Accessible form controls

#### **ReviewItem.tsx** - Individual Review Display

- **Purpose**: Display individual reviews in a card format
- **Key Features**:
  - User information and rating display
  - Formatted date display
  - Clean, readable layout

#### **Navbar.tsx** - Navigation Header

- **Purpose**: Application header with navigation controls
- **Key Features**:
  - Conditional back button display
  - Responsive title sizing
  - Sticky positioning
  - Gradient background design

### Data Layer

#### **courts.ts** - Mock Data

- **Purpose**: Comprehensive tennis court database
- **Content**: 52 tennis courts with complete information
- **Data Structure**: Each court includes:
  - Basic info (name, location, address)
  - Court details (surface, price, hours)
  - Amenities and ratings
  - User reviews and descriptions

#### **types/index.ts** - TypeScript Definitions

- **Purpose**: Type safety and interface definitions
- **Key Interfaces**:

  ```typescript
  interface TennisCourt {
    id: number;
    name: string;
    location: string;
    address: string;
    surface: "Hard" | "Clay" | "Grass";
    price: string;
    hours: string;
    amenities: string[];
    rating: number;
    reviewCount: number;
    description: string;
    reviews: Review[];
  }

  interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    text: string;
  }

  interface FilterOptions {
    rating: string;
    surface: string;
  }
  ```

#### **utils/helpers.ts** - Utility Functions

- **Purpose**: Reusable utility functions
- **Functions**:
  - `filterCourts()`: Court filtering logic
  - `formatDate()`: Date formatting utility
  - `generateStars()`: HTML star generation (legacy)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Installation Steps

1. **Navigate to Project Directory**

   ```bash
   cd frontend-challenge
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all required packages:

   - React 19.1.1 and React DOM
   - TypeScript and type definitions
   - Vite build tool and plugins
   - Tailwind CSS and PostCSS
   - ESLint for code quality

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173` (or next available port)

4. **Open in Browser**
   - Visit the URL shown in your terminal
   - The app will automatically reload when you make changes

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

### Build for Production

```bash
npm run build
```

This command will:

- Compile TypeScript to JavaScript
- Process and optimize CSS with Tailwind
- Bundle and minify all assets
- Generate optimized production files in `dist/` directory

The built files can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## 🎨 Design System

### Color Palette

- **Primary**: Deep Navy Blue (`#002865`)
- **Secondary**: Forest Green (`#047940`)
- **Accent**: Bright Blue (`#00AFF0`)
- **Background**: Pure White (`#ffffff`)
- **Text Primary**: Dark Gray (`#1e293b`)
- **Text Secondary**: Medium Gray (`#64748b`)
- **Stars**: Yellow (`#fbbf24`)
- **Borders**: Light Gray (`#e2e8f0`)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Sizing**: Scales appropriately across devices
- **Line Height**: Optimized for readability

### Spacing System

- **Mobile**: 4px base unit (`gap-4`, `p-4`)
- **Desktop**: 6px base unit (`gap-6`, `p-6`)
- **Consistent Margins**: 4, 6, 8, 12, 16, 24px scale

### Breakpoints

- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px+ (2 column layout)
- **Desktop**: 1024px+ (3 column layout)
- **Large Desktop**: 1280px+ (4 column layout)

## 🔧 Configuration Files

### **package.json**

```json
{
  "name": "tennis-courts-react",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### **tailwind.config.js**

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
```

### **tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true
  }
}
```

## 🎯 Key React Features Demonstrated

### Component Architecture

- **Functional Components**: Modern React with hooks
- **TypeScript Integration**: Full type safety
- **Component Composition**: Building complex UIs from simple components
- **Props Interface**: Strong typing with TypeScript interfaces
- **Memoization**: React.memo for performance optimization

### State Management

- **useState**: Local component state management
- **useMemo**: Optimized filtering and search performance
- **useCallback**: Optimized event handlers
- **State Lifting**: Sharing state between parent and child components
- **Local Storage**: Persistent state across sessions

### Performance Optimizations

- **Memoized Filtering**: useMemo prevents unnecessary re-computations
- **Debounced Search**: Optimized search input handling
- **Event Handling**: Efficient event delegation and handling
- **Conditional Rendering**: Smart rendering based on application state
- **Component Memoization**: React.memo for expensive components

### TypeScript Benefits

- **Type Safety**: Compile-time error checking
- **IntelliSense**: Enhanced IDE support and autocomplete
- **Refactoring Safety**: Safe code changes with type checking
- **Interface Definitions**: Clear contracts between components
- **Generic Types**: Reusable type definitions

## 📱 Responsive Design Implementation

### Mobile-First Approach

- **Base Styles**: Designed for mobile devices first
- **Progressive Enhancement**: Added complexity for larger screens
- **Touch Targets**: Minimum 44px touch targets for accessibility
- **Typography**: Responsive text sizing with Tailwind classes

### Breakpoint Strategy

```css
/* Mobile First */
.court-cards {
  @apply grid grid-cols-1 gap-4;
}

/* Tablet */
@media (min-width: 768px) {
  .court-cards {
    @apply grid-cols-2 gap-6;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .court-cards {
    @apply grid-cols-3;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .court-cards {
    @apply grid-cols-4;
  }
}
```

### Responsive Components

- **CourtCard**: Adapts layout and spacing for different screen sizes
- **CourtDetail**: Single column on mobile, multi-column on desktop
- **SearchAndFilters**: Centered layout with responsive spacing
- **Navbar**: Responsive title sizing and touch targets

## 🔄 Data Flow & State Management

### Application State Flow

```
App.tsx (Root State)
├── Search Term State
├── Filter State
├── Current Page State
├── Selected Court State
└── Courts Data (from courts.ts)

Child Components:
├── SearchAndFilters (Search & Filter UI)
├── CourtCard (Individual Court Display)
├── CourtDetail (Court Information & Reviews)
└── ReviewForm (Review Submission)
```

### State Persistence

- **Search Terms**: Persisted in localStorage
- **Filter Settings**: Persisted in localStorage
- **Review Data**: Stored in component state (can be extended to localStorage)

### Data Filtering Logic

```typescript
const filteredCourts = useMemo(() => {
  return filterCourts(
    tennisCourts,
    searchTerm,
    filters.rating,
    filters.surface
  );
}, [searchTerm, filters.rating, filters.surface]);
```

## 🚀 Performance Optimizations

### React Optimizations

- **useMemo**: Prevents unnecessary re-computations of filtered courts
- **useCallback**: Optimizes event handler functions
- **React.memo**: Prevents unnecessary re-renders of StarRating component
- **Debounced Search**: Reduces API calls and improves typing performance

### Build Optimizations

- **Vite**: Lightning-fast development server
- **ESBuild**: Optimized production builds
- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Automatic code splitting for optimal loading

### CSS Optimizations

- **Tailwind CSS**: Utility-first approach reduces CSS bundle size
- **PostCSS**: Optimized CSS processing
- **Autoprefixer**: Automatic vendor prefixing
- **Purge CSS**: Removes unused CSS in production

## 🧪 Testing Strategy (Future Enhancement)

### Recommended Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest vitest

# Add test scripts to package.json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
}
```

### Test Categories

- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user journey testing
- **Accessibility Tests**: WCAG compliance testing

## 🔮 Future Enhancements

### Short-term Improvements

- **Skeleton Loading**: Loading states during search/filter operations
- **Review Persistence**: Store reviews in localStorage
- **Enhanced Filters**: Price range, amenities, location-based filtering
- **Sorting Options**: Sort by rating, price, distance, etc.

### Medium-term Features

- **State Management**: Redux Toolkit or Zustand for complex state
- **Routing**: React Router for multi-page navigation
- **API Integration**: Real backend with React Query
- **User Authentication**: Login/signup functionality
- **Favorites System**: Save favorite courts

### Long-term Vision

- **PWA Features**: Service workers and offline support
- **Real-time Updates**: WebSocket integration for live reviews
- **Maps Integration**: Google Maps or Mapbox for location visualization
- **Social Features**: User profiles and social sharing
- **Mobile App**: React Native version

## 🐛 Troubleshooting

### Common Issues

#### **Blank Screen on Load**

- Check browser console for JavaScript errors
- Ensure all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build`

#### **Styling Issues**

- Clear browser cache and hard refresh
- Check Tailwind CSS is properly configured
- Verify PostCSS configuration

#### **Search Not Working**

- Check if debounced search is properly implemented
- Verify filter logic in `utils/helpers.ts`
- Check console for JavaScript errors

#### **Mobile Layout Issues**

- Test on actual mobile devices, not just browser dev tools
- Verify touch targets are at least 44px
- Check responsive breakpoints in Tailwind config

### Development Tips

- Use React Developer Tools for debugging
- Check Network tab for any failed requests
- Use TypeScript strict mode for better error catching
- Test on multiple browsers and devices

## 📚 Learning Resources

### React & TypeScript

- [React Official Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Tailwind CSS Examples](https://tailwindcomponents.com/)

### Vite

- [Vite Documentation](https://vitejs.dev/)
- [Vite React Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Run linting: `npm run lint`
5. Build and test: `npm run build`
6. Commit changes: `git commit -m "Add new feature"`
7. Push to branch: `git push origin feature/new-feature`
8. Create a Pull Request

### Code Standards

- Follow TypeScript strict mode
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages
- Test on multiple devices and browsers

## 📄 License

This project is created for demonstration purposes.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

_Last updated: September 2025_
