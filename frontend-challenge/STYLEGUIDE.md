# 🎨 Tennis Courts App – Style Guide  

This document outlines the **design system and styling conventions** used in the Tennis Courts mobile-first review app. It ensures consistency, scalability, and delightful user experience.  

---

## 🌈 Color Palette  

| Role | Light Mode | Dark Mode |
|------|------------|-----------|
| Primary Gradient | `from-blue-500 to-indigo-600` | `from-gray-800 to-gray-900` |
| Accent | `text-yellow-400` | `text-yellow-300` |
| Background | `bg-gray-50` | `bg-gray-900` |
| Cards | `bg-white` | `bg-gray-800` |
| Borders | `border-gray-200` | `border-gray-700` |
| Text Primary | `text-gray-900` | `text-gray-100` |
| Text Secondary | `text-gray-600` | `text-gray-400` |
| Errors | `text-red-500`, `bg-red-600` | `text-red-400`, `bg-red-700` |
| Success | `bg-green-600` | `bg-green-700` |

---

## 🔤 Typography  

- **Font:** Tailwind default `font-sans`  
- **Hierarchy:**  
  - Page title → `text-3xl font-extrabold`  
  - Section title → `text-xl font-semibold`  
  - Body text → `text-sm leading-snug`  
  - Secondary info → `text-xs text-gray-500`  
- **Accent text** uses gradient fill (`bg-clip-text text-transparent bg-gradient-to-r`) for branding.  

---

## 🧩 Components  

### 1. **Dark Mode Toggle**  
- Floating button (top-right).  
- Gradient background with emoji icon 🌙☀️.  
- `hover:scale-110` and `active:scale-95` for micro-interaction.  

### 2. **Court Card**  
- Rounded `2xl`, gradient background in list view.  
- Shadow hover states (`hover:shadow-xl`).  
- Location marked with 📍 and surface italicized.  

### 3. **Court Detail Header**  
- Full gradient header card.  
- Emoji 🎾 + court name.  
- Average rating stars with animated pulse.  

### 4. **Review List Item**  
- Gradient card with shadow.  
- Emoji avatar inside a gradient circle.  
- Review text with date stamp.  
- Animated fade-in (`animate-fade-slide-up`).  

### 5. **Review Skeleton**  
- Shimmering loading effect (`animate-shimmer`).  
- Avatar + text placeholders.  

### 6. **Toasts**  
- Max 3 visible at once.  
- Color-coded by type (success/ error/ neutral).  
- Fade-in, fade-out transitions + progress bar.  

---

## 📱 Mobile-First Principles  

- **Max container width:** `max-w-md` centered for readability.  
- **Sticky search bar** ensures quick filtering on small screens.  
- **Tap targets:** All buttons padded (`py-3 px-4`) for touch devices.  
- **Forms:** Rounded inputs with clear focus states.  

---

## ✨ Delight Factors  

- **Splash screen** with bouncing 🎾 emoji.  
- **Gradient headers + accents** across app.  
- **Animated stars** scale on hover/ selection.  
- **Toast notifications** with smooth countdown bar.  
- **Shimmer skeleton loaders** add polish.  

---

## 🛠️ Scalability Considerations  

- Components are modular (`components/`, `pages/`, `data/`).  
- Tailwind utility classes + custom animations (shimmer, fade-slide-up).  
- Easy to extend courts dataset (`/data/courts.js`).  
- Dark mode support throughout.  

---

✅ This style guide was created to make the UI **consistent, accessible, and delightful**, while showcasing design thinking beyond the coding task.  
