# Landing Page - Dokumentasi Evaluasi

> Dokumentasi implementasi **Responsive Landing Page (Next.js)** berdasarkan kriteria evaluasi Nesso Digitale Senior Front-End Engineer Take-Home Test.

---

## Overview

**Landing page Nesso Digitale Lab** yang mengimplementasikan:
- Pixel-tight responsive design dari Figma
- SEO-friendly fundamentals (metadata, Open Graph, structured data)
- Accessibility baseline (WCAG 2.1 compliance)
- Reusable component set
- Interactive components (sliders, modals)
- Internationalization (English & Italian)

**Tech Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + next-intl + Swiper

---

## Checklist Evaluasi

### ✅ Pixel-Tight Implementation dari Figma

| Section | Status | Notes |
|---------|--------|-------|
| **Hero (Home Cover)** | ✓ | Typography, layout, hero image, CTA button |
| **Brand Logos** | ✓ | Carousel dengan staggered animations |
| **Team** | ✓ | Auto-rotating image gallery (3s intervals) |
| **Services** | ✓ | Grid layout (2-column desktop) |
| **Projects** | ✓ | Synchronized dual swipers dengan card effect |
| **Digital** | ✓ | Three-column layout, scroll animations |
| **Articles** | ✓ | Responsive slider (1.3/2/3 slides) |
| **Footer** | ✓ | Contact CTA, social links, navigation |

### ✅ Responsive Design (Intentional)

| Breakpoint | Screen Width | Adaptations |
|------------|--------------|-------------|
| **Default** | < 640px | Single column, mobile menu, 1.3 slides |
| **sm:** | ≥ 640px | Tablet adjustments |
| **md:** | ≥ 768px | 2 columns, 2 slides |
| **lg:** | ≥ 1024px | Desktop layout, 3 columns |
| **xl:** | ≥ 1280px | Full desktop experience |

**Responsive Features:**
- Logo: Full logo (desktop) → Icon only (mobile)
- Navigation: Horizontal nav → Hamburger menu
- Hero typography: Scales dari 2.7rem ke 5.36rem
- Grid layouts: 1 → 2 → 3 columns
- Touch-friendly: Minimum 44px tap targets

---

### ✅ Sections yang Wajib Ada

| Section | File | Interactive Component |
|---------|------|----------------------|
| **Hero** | `sections/home-cover.tsx` | CTA button, brand logos carousel |
| **Features/Services** | `sections/home-service.tsx` | ServiceCard grid |
| **Team** | `sections/home-team.tsx` | Auto-rotating image gallery |
| **Projects** | `sections/home-project.tsx` | **Synchronized dual slider** |
| **Digital Solutions** | `sections/home-digital.tsx` | Scroll-triggered animations |
| **Articles** | `home-articles.tsx` | **Swiper carousel** |
| **CTA** | `footer/index.tsx` | ContactModal trigger |
| **Footer** | `footer/` | Navigation, social links |

---

### ✅ Minimal 1 Interactive Component

Implementasi memiliki **4+ interactive components**:

#### 1. Project Slider (Synchronized Dual Swipers)
```
- Info Swiper: Text content carousel
- Image Swiper: Card effect dengan shadows
- Controller module untuk sinkronisasi
- Prev/Next navigation dengan disabled states
- Keyboard navigation enabled
```

#### 2. Articles Slider
```
- Responsive slides per view: 1.3 (mobile), 2 (tablet), 3 (desktop)
- 24px gaps antar slides
- Keyboard dan accessibility modules
```

#### 3. Contact Modal
```
- Form state → Loading state → Success state
- Focus trap implementation
- Escape key to close
- Backdrop click handling
- Body scroll prevention
- Animated transitions (pop-out-fade)
```

#### 4. Team Image Carousel
```
- 3-second auto-rotate interval
- Smooth fade transitions (500ms)
- Image scale animations (100% → 90%)
```

---

### ✅ SEO-Friendly Fundamentals

#### Page Metadata
```tsx
// Implemented in app/[locale]/layout.tsx
- title: Dynamic per locale
- description: Translated description
- keywords: SEO-optimized array
- authors, creator, publisher
- canonical URLs per locale
- robots: index true, follow true
- googleBot settings (max-video/image preview)
```

#### Open Graph & Twitter Cards
```tsx
openGraph: {
  type: 'website',
  locale: 'it_IT' / 'en_US',
  url, siteName, title, description,
  images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]
}

twitter: {
  card: 'summary_large_image',
  title, description, images
}
```

#### Structured Data (JSON-LD)
```tsx
// components/seo/JsonLd.tsx
- Organization Schema: name, url, logo, email, social links, contact point
- Website Schema: site name, URL, search action
- ProfessionalService Schema: description, price range
```

#### Sitemap & Robots.txt
```tsx
// app/sitemap.ts
- Routes: /, /en, /it
- changeFrequency: weekly
- priority: 1

// app/robots.ts
- rules: { userAgent: '*', allow: '/' }
- sitemap: '/sitemap.xml'
```

#### Heading Structure
```
<h1> NESSO DIGITALE LAB (hero, visible)
├─ <h2> Brands we've worked with
├─ <h2> Meet Our Team
├─ <h2> Our Services
│   ├─ <h3> Custom Projects
│   └─ <h3> Team on-demand
├─ <h2> Featured Projects
├─ <h2> Digital Solutions
└─ <h2> Latest Articles
```

#### Internal Linking
- Navigation anchor links (#home, #team, #services, etc.)
- Smooth scroll dengan `scroll-behavior: smooth`
- Respects `prefers-reduced-motion`

---

### ✅ Accessibility (Baseline)

#### Semantic HTML
```tsx
<main id="main-content">
  <section id="home">...</section>
  <section id="team">...</section>
  <section id="services">...</section>
  ...
</main>

<nav role="navigation" aria-label="Main navigation">
<footer>
```

#### Skip Navigation Link
```tsx
// Implemented in layout.tsx
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  Skip to main content
</a>
```

#### Keyboard Navigation
| Component | Keyboard Support |
|-----------|-----------------|
| Navigation links | Tab focus |
| Language switcher | Escape to close |
| Mobile menu | Escape to close |
| Contact modal | Escape to close, Tab focus |
| Project slider | Arrow keys |
| Articles slider | Keyboard controls enabled |

#### Focus States
```css
/* globals.css */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

#### ARIA Labels & Attributes
```tsx
// Header
<button aria-label="Toggle menu" aria-expanded={isOpen} aria-controls="mobile-menu">

// Language switcher
<div aria-label="Select language" aria-expanded={open} aria-haspopup="listbox">
<button role="option" aria-selected={currentLocale === 'en'}>

// Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">

// Slider navigation
<button aria-label="Previous slide">
<button aria-label="Next slide">

// Loading/success states
<div role="status" aria-live="polite">
```

#### Modal Accessibility
- Focus trap (stores & restores previous active element)
- Escape key to close (disabled during loading)
- Backdrop click to close
- Body scroll prevention
- `aria-modal="true"`, `aria-labelledby`

#### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

#### Color Contrast
- Primary color (#0b5ed7) meets WCAG AA
- Gray scale dengan sufficient contrast
- Antialiased font rendering

---

### ✅ Reusable Component Set

| Component | Variants | Props |
|-----------|----------|-------|
| **Button** | primary, outline, circle-nav, ghost | size, variant, asChild |
| **HeaderSection** | - | children |
| **HeaderStripe** | - | children |
| **ServiceCard** | - | title, description, icon |
| **ArticlesSlider** | - | articles, locale |
| **ContactModal** | - | isOpen, onClose |
| **Icons** | 15+ icons | className, size |

#### Component Characteristics
- Consistent props API
- Sensible defaults
- Variants via class-variance-authority
- TypeScript strict mode
- Accessible by default

---

### ✅ Performance Awareness

| Aspect | Implementation |
|--------|----------------|
| **Image Optimization** | WEBP untuk transparency, JPEG untuk flat images |
| **Next/Image** | All images use Next.js Image component |
| **Raw SVG** | Icons as components, tidak sebagai img |
| **Layout Shift** | Fixed dimensions, proper aspect ratios |
| **Lazy Animation** | Intersection Observer untuk scroll animations |
| **Cache** | Articles API: 1-hour revalidation |

---

## Bonus: Internationalization (i18n)

| Feature | Implementation |
|---------|----------------|
| **Library** | next-intl |
| **Locales** | English (en), Italian (it) |
| **Server-side** | `getTranslations()` |
| **Client-side** | `useTranslations()` |
| **Routing** | `/[locale]/` dynamic route |
| **Switcher** | Flag icons, dropdown dengan keyboard support |

**Translation Coverage:**
- metadata (title, description, keywords, OG)
- navigation (7 links)
- all sections (cover, team, service, project, digital, articles)
- contactModal (form labels, placeholders, states)
- footer (tagline, menus, contacts)

---

## Files Inventory

### Core Files
| File | Purpose |
|------|---------|
| `app/[locale]/layout.tsx` | Root layout, SEO metadata |
| `app/[locale]/page.tsx` | Home page structure |
| `app/globals.css` | Global styles, animations, a11y |
| `app/sitemap.ts` | XML sitemap |
| `app/robots.ts` | Robots.txt |

### Components
```
components/
├── sections/
│   ├── home-cover.tsx          # Hero + brand logos
│   ├── home-team.tsx           # Team gallery
│   ├── home-service.tsx        # Services grid
│   ├── home-project.tsx        # Project showcase
│   ├── home-project-slider.tsx # Dual swipers
│   ├── home-digital.tsx        # Digital solutions
│   └── home-digital-visual.tsx # Animated visuals
│
├── header/
│   ├── index.tsx               # Header container
│   ├── navigation.tsx          # Nav links + mobile menu
│   └── language-switcher.tsx   # i18n switcher
│
├── footer/
│   ├── index.tsx               # Footer container
│   ├── content.tsx             # Links, social
│   └── contact.tsx             # CTA section
│
├── seo/
│   └── JsonLd.tsx              # Structured data
│
├── icons/                      # 15+ SVG components
├── button.tsx                  # Reusable button
├── ContactModal.tsx            # Contact form modal
├── ArticlesSlider.tsx          # News carousel
├── ServiceCard.tsx             # Service display
└── HeaderSection.tsx           # Section header
```

### Translations
```
messages/
├── en.json    # English (complete)
└── it.json    # Italian (complete)
```

---

## Technical Decisions Summary

| Decision | Benefit |
|----------|---------|
| **WEBP/JPEG strategy** | Smaller bundle, faster loads |
| **Raw SVG components** | Less render overhead, dynamic styling |
| **Component-driven** | Scalable, maintainable, debuggable |
| **Typography system** | Consistent, reusable text styles |
| **Color variables** | Flexible theming dengan Tailwind v4 |
| **Pixel-perfect approach** | Design fidelity |
| **Responsive brand** | Optimized for all screen sizes |
| **WCAG 2.1 compliance** | Usable by everyone, better SEO |
| **Locale-aware metadata** | Optimized for each language |
| **Structured data** | Rich search results, Knowledge Graph |

---

## Development Commands

```bash
cd nesso-home-test/landing-page

# Install dependencies
bun install

# Development server (http://localhost:3000)
bun dev

# Production build
bun run build

# Start production server
bun run start

# Linting
bun run lint
```

---

## What's Next (dengan waktu lebih)

1. **FAQ Section dengan Schema** - Add FAQ accordion dengan JSON-LD FAQ schema
2. **Performance Audit** - Lighthouse optimization, Core Web Vitals
3. **E2E Testing** - Playwright tests untuk critical paths
4. **Dark Mode** - Theme toggle dengan system preference detection
5. **Animation Enhancement** - Framer Motion untuk smoother transitions
6. **Form Backend** - Actual form submission (currently mock)

---

## Related Files

| File | Description |
|------|-------------|
| `README_Added-Value_Landing-Page.md` | Technical decisions & trade-offs detail |
| `prd/landing-page/` | PRD documents untuk setiap phase |
| `EVALUATION_CRITERIA.md` | Original evaluation criteria |
