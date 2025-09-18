# Tennis Court Review App - Mock Data System

This comprehensive mock data system provides realistic tennis court and review data for the React Native tennis court review application.

## 📊 Dataset Overview

- **65 Tennis Courts** with diverse characteristics
- **Dynamic Review Generation** (3-10 reviews per court)
- **Geographic Diversity** across 50+ US cities
- **Surface Variety** (hard, clay, grass, synthetic)
- **Price Tiers** (budget $15-30, mid-range $30-60, premium $60-95+)
- **Rating Distribution** (realistic 2.8-4.9 star ratings)

## 🏗️ Data Structure

### Court Data Features
- **Basic Info**: Name, address, location, phone number
- **Court Details**: Surface type, indoor/outdoor, number of courts
- **Pricing**: Hourly rates with realistic market pricing
- **Amenities**: 30+ possible amenities (lighting, pro shop, coaching, etc.)
- **Coordinates**: Latitude/longitude for mapping features
- **Operating Hours**: Realistic daily schedules
- **Images**: Placeholder URLs with unique identifiers

### Review Data Features
- **User Diversity**: 30+ realistic user names
- **Rating Distribution**: Weighted toward higher ratings
- **Sentiment Variety**: Positive, neutral, and negative reviews
- **Helpful Votes**: Realistic engagement metrics
- **Recent Dates**: All reviews within the past year
- **Varied Length**: From short to detailed reviews

## 🚀 Usage Examples

### Basic Data Access

```typescript
import {
  mockCourts,
  getAllCourts,
  getCourtById,
  mockApiService
} from '@/data';

// Get all courts with enhanced data
const courts = getAllCourts();

// Get specific court with reviews
const court = getCourtById('1'); // Wimbledon Tennis Club

// Using the mock API service
const response = await mockApiService.getCourts({
  page: 1,
  limit: 10,
  search: 'New York'
});
```

### Filtering and Search

```typescript
import {
  filterCourts,
  searchCourts,
  getCourtsByPriceRange,
  getCourtsByRating
} from '@/data';

// Filter by multiple criteria
const filteredCourts = filterCourts({
  surface: 'clay',
  indoor: false,
  minRating: 4.0,
  maxPrice: 50
});

// Search by location or name
const nycCourts = searchCourts('New York');

// Get courts in price range
const budgetCourts = getCourtsByPriceRange(20, 40);

// Get highly rated courts
const topCourts = getCourtsByRating(4.5);
```

### Sorting

```typescript
import { sortCourts, getAllCourts } from '@/data';

const courts = getAllCourts();

// Sort by rating (highest first)
const topRated = sortCourts(courts, 'rating', 'desc');

// Sort by price (lowest first)
const cheapest = sortCourts(courts, 'price', 'asc');

// Sort by review count
const mostReviewed = sortCourts(courts, 'reviewCount', 'desc');
```

### Mock API Service

```typescript
import { mockApiService } from '@/data';

// Paginated court listing
const courtsPage = await mockApiService.getCourts({
  page: 1,
  limit: 20,
  filters: { surface: 'hard' },
  sortBy: 'rating',
  sortOrder: 'desc'
});

// Get court details with availability
const courtDetails = await mockApiService.getCourtById('1');

// Get court reviews
const reviews = await mockApiService.getCourtReviews('1', {
  page: 1,
  limit: 10,
  sortBy: 'date'
});

// Submit a review
const newReview = await mockApiService.submitReview('1', {
  rating: 5,
  comment: 'Amazing courts!'
});
```

## 📋 Court Categories

### Premium Courts (Rating 4.5+, $60+/hour)
- Wimbledon Tennis Club (London) - Grass courts
- Roland Garros Tennis Academy (Paris) - Clay courts
- Mountain View Tennis Resort (Aspen) - Luxury resort
- Miami Beach Tennis Club - Oceanfront facility
- Elite Indoor Tennis Complex (Chicago) - Climate controlled

### Mid-Range Courts (Rating 3.5-4.4, $30-60/hour)
- Central Park Tennis Center (NYC) - Urban facility
- Sunset Clay Courts (San Diego) - Scenic views
- Sydney Harbour Tennis Club - Iconic location
- Desert Oasis Tennis Resort (Phoenix) - Desert setting

### Budget Courts (Rating 2.8-3.4, $15-30/hour)
- Downtown Community Courts (Austin) - Public courts
- University Tennis Complex (Berkeley) - Student-friendly
- Various municipal and community facilities

## 🎯 Key Features

### Realistic Data Distribution
- **Surface Types**: 40% hard, 30% synthetic, 20% clay, 10% grass
- **Indoor/Outdoor**: 25% indoor, 75% outdoor
- **Geographic Spread**: Major US cities + international locations
- **Price Correlation**: Higher-rated courts generally cost more
- **Amenity Logic**: Premium courts have more amenities

### Review System
- **Rating Distribution**: Weighted toward 4-5 stars (realistic for tennis facilities)
- **Review Sentiment**: Mix of positive (70%), neutral (20%), negative (10%)
- **Helpful Votes**: Realistic engagement patterns
- **User Diversity**: Varied names representing different demographics

### Enhanced Features
- **Availability Simulation**: Dynamic time slot generation
- **Booking System**: Mock booking functionality
- **Statistics**: Comprehensive data analytics
- **Search & Filter**: Advanced querying capabilities

## 🔧 API Compatibility

The mock API service (`mockApiService`) mirrors the real API interface defined in `src/services/api.ts`, providing:

- Realistic response delays (300ms average)
- Proper error handling
- Pagination support
- Filtering and sorting
- CRUD operations for reviews
- Booking simulation

## 📊 Statistics

```typescript
import { getAppDataStats } from '@/data';

const stats = getAppDataStats();
// Returns comprehensive statistics about the dataset
```

## 🎨 Customization

The data generation system is highly customizable:

- **Court Count**: Easily adjustable in `generateFullDataset.ts`
- **Geographic Areas**: Modify the cities array
- **Amenities Pool**: Expand available amenities
- **Price Ranges**: Adjust pricing logic
- **Rating Distribution**: Modify rating generation

## 🚀 Integration

This mock data system integrates seamlessly with:
- React Native components
- Navigation systems
- State management (Redux, Context API)
- Testing frameworks
- Storybook documentation
- Development environments

Perfect for demonstrating the full capabilities of your tennis court review application!