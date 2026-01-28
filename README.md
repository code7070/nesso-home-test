# Nesso Digitale - Senior Frontend Take-Home Test

> Take-home test project demonstrating Figma-to-code implementation, engineering judgment, and React/Next.js proficiency.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [What You Built](#what-you-built)
- [Tech Stack](#tech-stack)
- [Key Technical Decisions](#key-technical-decisions)
- [Notes on Quality](#notes-on-quality)
- [Assumptions from Figma](#assumptions-from-figma)
- [What's Next](#whats-next)
- [Project Documentation](#project-documentation)

---

## Setup Instructions

### Prerequisites

- **Node.js**: v20.x or higher
- **Package Manager**: Bun (recommended) or npm/yarn

### Landing Page (Next.js)

```bash
cd landing-page
bun install
bun dev          # http://localhost:3000
```

### Job Board App (Vite)

```bash
cd app-like-job-board
bun install
bun dev          # http://localhost:5173
```

### Run Tests (Job Board)

```bash
cd app-like-job-board
bun run test           # Single run
bun run test:watch     # Watch mode
```

### Environment Variables

```bash
# landing-page/.env
NEWS_API_KEY=your_api_key    # For articles section (optional)
```

---

## What You Built

### 1. Responsive Landing Page (Next.js)

Pixel-tight implementation from Figma:

| Section | Interactive Component |
|---------|----------------------|
| Hero | CTA button, brand logos carousel |
| Team | Auto-rotating image gallery |
| Services | ServiceCard grid |
| Projects | **Synchronized dual slider** |
| Digital | Scroll-triggered animations |
| Articles | **Swiper carousel** |
| Footer | **Contact modal** |

**URL:** `http://localhost:3000`

**Locales:** `/en` (English), `/it` (Italia)

### 2. App-Like Job Board (React + Vite)

Job board platform with complex state management:

| Feature | Description |
|---------|-------------|
| Search & Filter | 6 filter types, debounced search, URL state sync |
| Job Listing | Paginated grid, loading states, empty states |
| Job Detail | Modal with URL update |
| Bookmarks | localStorage persistence |
| Application | **4-step form wizard** with Zod validation |

**URL:** `http://localhost:5173`

**Routes:**
- `/jobs` - Job listing with filters
- `/jobs?jobId=xxx` - Job detail modal
- `/bookmarks` - Saved jobs

---

## Tech Stack

### Landing Page

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| i18n | next-intl |
| Carousel | Swiper |

### Job Board App

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite 7 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Data | React Query 5 |
| Routing | React Router 7 |
| Forms | React Hook Form + Zod |
| Testing | Vitest + React Testing Library |

---

## Key Technical Decisions

> Detail lengkap: [`README_Added-Value_Landing-Page.md`](./README_Added-Value_Landing-Page.md)

| Decision | Rationale |
|----------|-----------|
| **WEBP/JPEG strategy** | Smaller bundle, faster loads while maintaining quality |
| **Raw SVG components** | Less render overhead, dynamic styling via currentColor |
| **URL state for filters** | Shareable URLs, browser history works naturally |
| **React Query for mock data** | Production-ready patterns (caching, loading states) |
| **Zod validation** | Type-safe, excellent TypeScript inference |
| **shadcn/ui** | Accessible by default, customizable, no runtime dependency |
| **Component-driven architecture** | Scalable, maintainable, isolated debugging |

---

## Notes on Quality

### Responsiveness

- **Mobile-first approach** dengan intentional breakpoints
- 5 breakpoints: default (mobile), sm, md, lg, xl
- Touch-friendly targets (minimum 44px)
- Responsive brand identity (full logo → icon on mobile)

### Accessibility (WCAG 2.1)

- Skip navigation link
- Semantic HTML (`<main>`, `<section>`, `<nav>`)
- Keyboard navigation untuk semua interactive elements
- Focus states dengan `:focus-visible`
- ARIA labels comprehensive
- Modal focus trap & escape key
- `prefers-reduced-motion` support

### Performance

- Image optimization (WEBP, Next/Image)
- Debounced search (300ms)
- React Query caching (staleTime: 5min)
- Lazy scroll animations (Intersection Observer)
- Code splitting per route

### SEO (Landing Page)

- Dynamic metadata per locale
- Open Graph & Twitter Cards
- JSON-LD structured data (Organization, Website, ProfessionalService)
- Sitemap.xml & robots.txt
- Proper heading hierarchy (h1 → h2 → h3)
- Canonical URLs dengan hreflang

---

## Assumptions from Figma

Since the Figma design focused primarily on desktop view, several assumptions were made during implementation:

### Mobile Responsive Behavior
- Mobile layouts were designed based on responsive best practices as no mobile frames were provided
- Recommendation: **Deliver mobile design frames** to enable more precise slicing and pixel-perfect mobile implementation

### Frame Structure
- Some Figma frames were not well-organized, requiring interpretation during development
- Recommendation: **Improve frame hierarchy and naming conventions** for clearer component boundaries and faster handoff

### Design Tokens
- Typography and colors were extracted manually from the design
- Recommendation: **Create font and color as Figma components/variables** for a more systematic design pattern, easier maintenance, and consistent developer handoff

### Hover & Interactive States
- Not all hover states were specified in the design
- Implemented consistent hover patterns based on the primary color scheme

### Animation Timing
- Animation durations were not specified in Figma
- Used standard 300ms transitions with easing for a smooth, professional feel

---

## What's Next

### Already Implemented (Beyond Requirements)

#### Landing Page
- **Custom `useSeen` hook** - Intersection Observer-based visibility detection combined with CSS animations and transitions for scroll-triggered effects
- **News API Integration** - Real-world SSR use case fetching live articles with caching and error handling

#### Job Board
- **Comprehensive Filter System** - 6 filter types (search, location, job type, experience, salary range, posted within) with URL state synchronization, truly demonstrating the App-Like evaluation criteria for complex state management

### Future Improvements

#### Landing Page
1. FAQ Section with JSON-LD FAQ schema for rich search results
2. Dark mode toggle (currently only system preference detection)
3. E2E testing with Playwright
4. Form backend integration (currently mock submission)

#### Job Board
1. Real API integration with proper error boundaries
2. Optimistic updates for bookmark actions
3. Infinite scroll as pagination alternative
4. Job comparison feature (compare 2-3 jobs side by side)
5. Search history with autocomplete suggestions
6. Filter presets (save filter combinations)
7. E2E tests with Playwright

---

## Project Documentation

| Document | Description |
|----------|-------------|
| [`README_Landing-Page.md`](./README_Landing-Page.md) | Evaluation criteria mapping untuk Landing Page |
| [`README_App-Like_JobBoard.md`](./README_App-Like_JobBoard.md) | Evaluation criteria mapping untuk Job Board |
| [`README_Added-Value_Landing-Page.md`](./README_Added-Value_Landing-Page.md) | Technical decisions & trade-offs detail |

---

## Author

Built for Nesso Digitale Senior Frontend Engineer Take-Home Test.
