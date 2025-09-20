Phase 1 — Initialization & Architecture

“Summarize the challenge in one paragraph; confirm 2 screens (list + detail + review), no backend, mocked data, mobile-first.”

“Give me the minimal Expo RN + TypeScript + React Navigation setup; list exact install commands and a tiny App.tsx scaffold.”

“Create a typed route definition for CourtDetail that requires { id: string }.”

Phase 2 — Environment & Tooling

“Add ESLint + Prettier with sane RN/TS defaults; output the config files only.”

“Define a tiny theme.ts with colors/spacing/radius; show a container using it.”

Phase 3 — Domain Types & Mock System

“Write strict TS types for Surface, Court, and Review (rating as 1|2|3|4|5).”

“Provide a small seeded RNG (LCG) for reproducible mocks; function only.”

“Generate 110 courts with plausible fields and https placeholder images; return an array.”

“Seed 0–5 reviews per court with recent ISO dates; helper only—no UI.”

“Utility to derive avgRating and reviewCount from (seed + user reviews) without mutating mocks.”

Phase 4 — Search & Utilities

“Implement normalize() to strip diacritics and lowercase; no deps.”

“Implement matchesQuery(q, court) covering name/city/surface.”

“Implement useDebouncedValue(value, 200) with cleanup; hook only.”

Phase 5 — Home (Courts List)

“Scaffold Home screen with header title and SearchBar; no styles beyond layout.”

“FlatList setup for paging 20 items at a time; onEndReached handler only.”

“CourtCard component with 16:9 image, name, city, badges, stars; memoized.”

“Empty-state component for zero results; minimal copy.”

Phase 6 — Court Detail

“Detail screen: read id param, find court, guard invalid id by navigating back.”

“Layout: hero image, name, city/address, surface/indoor/lights, courtCount.”

“Rating summary component that uses derived avg + count.”

Phase 7 — Persistence (AsyncStorage) + Context

“Create ReviewsContext storing Record<courtId, Review[]> in AsyncStorage under @reviewsByCourt; provider + useReviews() hook only.”

“Helpers loadReviews() and addReview() with optimistic update and try/catch.”

Phase 8 — Add Review Form (A11y-first)

“Build ReviewForm with Pressable stars (radio-like) and a TextInput; validate rating required and 10–280 chars.”

“On submit: call addReview, clear form, and programmatically scroll to top of reviews.”

Phase 9 — Styling & Ergonomics

“Apply tokens to cards/buttons; ensure 44px min touch targets.”

“Add 120ms press feedback (opacity/elevation) without extra libraries.”

“Keep the search bar visually ‘sticky’ using layout—not nested ScrollViews.”

Phase 10 — Performance

“Recommend FlatList props for smooth 100–500 items: initialNumToRender, maxToRenderPerBatch, windowSize, removeClippedSubviews.”

“Show getItemLayout example assuming fixed row height and 16:9 image aspect.”

“Checklist to avoid re-renders: memoized card, stable keyExtractor, useCallback handlers.”

Phase 11 — Debugging (representative)

“NavigationContainer warning persists; checklist for double mounts or duplicate @react-navigation/native.”

“Resolve ‘VirtualizedLists should never be nested’ by replacing parent ScrollView and keeping a header.”

“Clamp number to 1|2|3|4|5 with asRating(n: number); runtime guard + TS return type.”

“Keyboard overlaps TextInput on iOS; give KeyboardAvoidingView pattern with header offset.”

“Clear Expo/Metro caches safely; list commands only.”

Phase 12 — Polish & A11y

“Empty-state copy for (a) no search results, (b) no reviews yet—1 short line each.”

“Add accessibilityLabel and accessibilityRole to stars, submit button, and card titles.”

“Ensure images use fixed aspect ratio and resizeMode='cover' to prevent layout shift.”

Phase 13 — Visual Adjustments (based on manual review)

“Reduce Home title size and tighten vertical spacing; tokens only.”

“Ensure cards have interior padding; avoid edge-to-edge content.”

“Reorganize amenities into a two-column list with icons (no emojis).”

“Fix review card overflow and align ‘sort by’ within safe paddings.”

Phase 14 — Image Loading & Placeholders

“Images not rendering on Android: switch to safe https placeholders and set explicit width/height style.”

Phase 15 — Documentation & Submission

“Generate a concise README with run steps (npx expo start), features, folder structure, and two screenshot placeholders—no fluff.”

“Draft PR body summarizing inclusions and trade-offs (paging over heavy virtualization, context-backed persistence).”

“Template PR comment for Eastern Time start/end timestamps.”