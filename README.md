# EatClub Restaurant Discovery App

A modern, performant restaurant discovery application built with Next.js 15, featuring an optimized UX with auto-hiding headers, debounced search, and smooth page transitions.

## 🚀 Key Features

### Performance Optimizations

- **Server-Side Rendering (SSR)**: Initial page load pre-renders restaurant data for instant display
- **Static Generation**: Optimized production builds with pre-rendered static pages where possible
- **Debounced Search**: 300ms debounce prevents excessive API calls during user typing
- **React Query Caching**: Intelligent client-side caching with 1-minute stale time
- **Image Loading States**: Skeleton loaders and graceful error handling for images

### UX Enhancements

- **Auto-Hide Header**: Smart header that hides on scroll down, shows on scroll up to maximize screen real estate
  - Always visible when near the top of the page
  - Smooth CSS transitions with `translate-y` transforms
  - Prevents hydration mismatches with proper client-side mounting
  
- **Smooth Page Transitions**: Framer Motion animations for restaurant detail pages
  - Slide-in from right on navigation
  - Slide-out to right on back navigation
  - 300ms easing for natural feel

- **Responsive Design**: Mobile-first approach with breakpoints for tablet/desktop
  - Grid layout adapts from 1 column (mobile) to 4 columns (desktop)
  - Different header layouts for mobile vs desktop
  - Touch-friendly button sizes

- **Search Experience**: Real-time search with loading and error states
  - Visual loading spinner during API calls
  - Empty state messaging when no results found
  - Error handling with user-friendly messages
  - Search only activates when user has typed (no empty queries)

### Data Management

- **Optimized Data Transfer**: API returns only necessary fields to reduce payload size
  - Home page receives simplified `Restaurant` objects with `bestDeal` only
  - Detail page receives full `RawRestaurant` with all deals
  
- **Smart Deal Sorting**: Deals automatically sorted by discount percentage (highest first)

- **TypeScript Types**: Fully typed data structures for type safety and developer experience

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query (React Query)** - Powerful data fetching and caching
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

## 📦 Getting Started

### Development Mode

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Mode

For optimal performance, build and run in production mode:

```bash
npm run build
npm start
```

Production mode features:
- Optimized bundle sizes
- Pre-rendered static pages
- Minified code
- Faster initial page loads
- Reduced rendering delays

## 📁 Project Structure

```
app/
  _components/         # Page-specific components
    HomePage.tsx       # Main restaurant listing page
  restaurants/
    [id]/
      _components/
        RestaurantDetailPage.tsx  # Detail page with deals
      page.tsx
  api/
    restaurants/       # API routes for search
components/
  AutoHideHeader.tsx   # Smart scroll-responsive header
  RestaurantImage.tsx  # Image component with loading states
hooks/
  useDebounce.ts       # Custom debounce hook
providers/
  QueryProvider.tsx    # React Query setup
types/
  restaurant.ts        # TypeScript interfaces
```

## 🎯 Notable Implementation Details

### Custom Hooks

- **useDebounce**: Generic debounce hook that delays value updates by 300ms, reducing API calls during rapid user input

### Component Patterns

- **Client Components**: Strategic use of `"use client"` directive only where needed (interactivity, hooks)
- **Server Components**: Default for static content, maximizing SSR benefits
- **Hydration Safety**: Careful handling of client-only features to prevent hydration mismatches

### API Design

- **Search Endpoint**: `/api/restaurants?q={query}` for filtered results
- **Efficient Filtering**: Backend filters by restaurant name and cuisines
- **Case-insensitive Search**: User-friendly search matching

### CSS Techniques

- **Fixed Positioning**: Header uses `fixed` with `z-10` to stay on top
- **Transform Animations**: GPU-accelerated transforms for smooth performance
- **Responsive Utilities**: Tailwind's responsive prefixes (`sm:`, `lg:`, etc.)
- **Hover States**: Interactive feedback on all clickable elements

## 📝 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
