// Simple localStorage-backed API for tennis courts and reviews

const COURTS_KEY = 'courts';
const COURT_REVIEWS_KEY = 'courtReviews';
const COURTS_VERSION_KEY = 'courtsDataVersion';
const COURTS_VERSION = 2;

const initialCourts = [
  {
    id: 'c1',
    name: 'Central Park Court A',
    location: 'New York, NY',
    surface: 'Hard',
    imageUrl: '/courts/court-1.svg',
    averageRating: 4.6,
    reviewsCount: 5
  },
  {
    id: 'c2',
    name: 'Golden Gate Park Courts',
    location: 'San Francisco, CA',
    surface: 'Hard',
    imageUrl: '/courts/court-2.svg',
    averageRating: 4.2,
    reviewsCount: 3
  },
  {
    id: 'c3',
    name: 'Barton Springs Tennis',
    location: 'Austin, TX',
    surface: 'Clay',
    imageUrl: '/courts/court-3.svg',
    averageRating: 4.8,
    reviewsCount: 9
  },
  {
    id: 'c4',
    name: 'Venice Beach Courts',
    location: 'Los Angeles, CA',
    surface: 'Hard',
    imageUrl: '/courts/court-4.svg',
    averageRating: 4.1,
    reviewsCount: 7
  },
  {
    id: 'c5',
    name: 'Millennium Park Tennis',
    location: 'Chicago, IL',
    surface: 'Grass',
    imageUrl: '/courts/court-5.svg',
    averageRating: 3.9,
    reviewsCount: 2
  },
  {
    id: 'c6',
    name: 'Riverfront Community Courts',
    location: 'Portland, OR',
    surface: 'Hard',
    imageUrl: '/courts/court-6.svg',
    averageRating: 4.4,
    reviewsCount: 4
  }
];

function initializeStorage() {
  // Seed data
  if (!localStorage.getItem(COURTS_KEY)) {
    localStorage.setItem(COURTS_KEY, JSON.stringify(initialCourts));
    localStorage.setItem(COURTS_VERSION_KEY, String(COURTS_VERSION));
  }
  if (!localStorage.getItem(COURT_REVIEWS_KEY)) {
    localStorage.setItem(COURT_REVIEWS_KEY, JSON.stringify({}));
  }

  // Migrate existing data to local images if needed
  const currentVersion = parseInt(localStorage.getItem(COURTS_VERSION_KEY) || '1', 10);
  if (currentVersion < COURTS_VERSION) {
    try {
      const courts = JSON.parse(localStorage.getItem(COURTS_KEY) || '[]');
      const migrated = courts.map((c) => {
        // Map by id number to a local svg path
        const idNum = Number(String(c.id).replace(/[^0-9]/g, '')) || 1;
        const safeNum = Math.min(Math.max(idNum, 1), 6);
        return {
          ...c,
          imageUrl: `/courts/court-${safeNum}.svg`
        };
      });
      localStorage.setItem(COURTS_KEY, JSON.stringify(migrated));
      localStorage.setItem(COURTS_VERSION_KEY, String(COURTS_VERSION));
    } catch (_e) {
      // If anything goes wrong, reset to initial
      localStorage.setItem(COURTS_KEY, JSON.stringify(initialCourts));
      localStorage.setItem(COURTS_VERSION_KEY, String(COURTS_VERSION));
    }
  }
}

export async function getCourts() {
  initializeStorage();
  return JSON.parse(localStorage.getItem(COURTS_KEY) || '[]');
}

export async function getCourtById(courtId) {
  const courts = await getCourts();
  return courts.find(c => c.id === courtId) || null;
}

export async function getReviews(courtId) {
  initializeStorage();
  const map = JSON.parse(localStorage.getItem(COURT_REVIEWS_KEY) || '{}');
  return map[courtId] || [];
}

function saveCourts(courts) {
  localStorage.setItem(COURTS_KEY, JSON.stringify(courts));
}

function saveReviewsMap(map) {
  localStorage.setItem(COURT_REVIEWS_KEY, JSON.stringify(map));
}

export async function addReview(courtId, reviewInput) {
  // reviewInput: { author?: string, rating: number (1-5), comment: string }
  const courts = await getCourts();
  const courtIndex = courts.findIndex(c => c.id === courtId);
  if (courtIndex === -1) throw new Error('Court not found');

  const reviewsMap = JSON.parse(localStorage.getItem(COURT_REVIEWS_KEY) || '{}');
  const existing = reviewsMap[courtId] || [];

  const review = {
    id: `${courtId}-${Date.now()}`,
    author: (reviewInput.author || 'Anonymous').trim() || 'Anonymous',
    rating: Math.max(1, Math.min(5, Number(reviewInput.rating) || 1)),
    comment: (reviewInput.comment || '').trim(),
    createdAt: new Date().toISOString()
  };

  const updatedReviews = [review, ...existing];
  reviewsMap[courtId] = updatedReviews;
  saveReviewsMap(reviewsMap);

  // Recalculate average rating and count
  const totalRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
  const reviewsCount = updatedReviews.length;
  const averageRating = Number((totalRatings / reviewsCount).toFixed(1));

  const updatedCourt = {
    ...courts[courtIndex],
    averageRating,
    reviewsCount
  };
  const updatedCourts = [...courts];
  updatedCourts[courtIndex] = updatedCourt;
  saveCourts(updatedCourts);

  return { court: updatedCourt, reviews: updatedReviews };
}


