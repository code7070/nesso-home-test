# Technical Decisions & Trade-offs

> A documentation of key engineering decisions made during the development of this landing page.

---

## Performance Optimizations

### Image Format Strategy

**WEBP for complex images with transparency**  
I opted to use WEBP format to replace PNG images where transparency or alpha channels are needed. WEBP offers significantly smaller file sizes while maintaining quality and browser compatibility.

**JPEG for flat, solid images**  
For images that don't require transparency or unique shapes, I use JPEG format. This keeps the bundle lean without sacrificing visual quality for simpler graphics.

### Raw SVG Usage

Instead of importing SVGs as images, I use them as raw components. This approach:
- Reduces browser rendering overhead
- Helps users on low-resource devices without compromising experience
- Enables dynamic styling via `currentColor` for fill/stroke properties
- Allows color overrides for interactive states (hover, focus, etc.)

---

## Architecture Decisions

### Component-Driven Development

I structured the frontend into small, isolated sections and components. This decision was made because:
- Elements almost always need to scale over time
- Adjustments to one area shouldn't accidentally affect others
- Smaller components are easier to manage and extend
- Debugging becomes faster and more confident since issues are isolated

### Typography System

The design was well-structured but the layers weren't as organized as they could be. I created a typography grouping system with reusable text classes, making it:
- Flexible to use across different sections
- Easy to maintain and update globally
- Consistent throughout the application

### Color Variables with Tailwind v4

Using CSS color variables integrated with Tailwind v4 allows for:
- Easy color mapping and management
- Flexible reuse across components
- Simple theming capabilities if needed in the future

---

## UX & Design Decisions

### Pixel-Perfect Approach

In some cases, especially with text and copywriting, I prioritized matching the design's visual appearance over strict adherence to exact pixel values. This means adjusting padding, margins, and spacing to achieve the intended look rather than blindly following measurements.

### Responsive Brand Identity

The brand should be prominent on a landing page, but UI structure matters too. For the mobile version, I implemented two logo variants:
- **Desktop**: Full logo with text
- **Mobile**: Simplified connecting-dot icon only

This ensures the brand is recognizable without overwhelming smaller screens.

---

## Accessibility Implementation

### WCAG 2.1 Compliance Strategy

I implemented comprehensive accessibility features to ensure the landing page is usable by everyone, including users with disabilities who rely on assistive technologies.

**Skip Navigation Link**
Added a "Skip to main content" link that becomes visible on keyboard focus. This allows screen reader and keyboard users to bypass repetitive navigation and jump directly to the main content.

**Semantic HTML Structure**
Wrapped all page content in a `<main>` element with proper heading hierarchy (h1 → h2 → h3). This provides clear document structure for assistive technologies and improves SEO.

### Keyboard Navigation

**Focus States**
Implemented visible focus indicators using `:focus-visible` for all interactive elements. This ensures keyboard users always know where they are on the page without showing focus rings on mouse clicks.

**Keyboard Support for Interactive Components**
- Sliders/carousels support arrow key navigation
- Modal can be closed with Escape key
- Language switcher responds to Escape key
- All buttons and links are keyboard accessible

### ARIA Enhancements

**Descriptive Labels**
Added ARIA labels to:
- Logo links (`aria-label="Nesso Digitale - Go to homepage"`)
- Icon-only buttons (navigation arrows, menu toggles)
- Social media links in footer
- Language switcher with aria-expanded and aria-haspopup

**Navigation Structure**
Added proper `role="navigation"` and `aria-label` attributes to navigation components, ensuring screen readers can identify and announce navigation landmarks correctly.

### Modal Accessibility

Implemented proper modal behavior with:
- Focus trap (prevents keyboard navigation outside modal)
- Focus restoration (returns focus to trigger element on close)
- Escape key to close
- Body scroll prevention when open
- Proper ARIA attributes (`aria-modal="true"`, `aria-labelledby`)
- Live regions for loading and success states

### Image Accessibility

Improved alt text quality:
- Decorative images use empty alt (`alt=""`)
- Meaningful images have descriptive alt text
- Icons in buttons marked with `aria-hidden="true"` when button has aria-label

**Benefits:**
- Usable by screen reader users
- Fully keyboard navigable
- WCAG 2.1 AA compliant
- Better SEO through semantic HTML
- Improved user experience for all users

---

## SEO Optimization

### Comprehensive Metadata Strategy

**Locale-Aware Metadata**
Implemented dynamic metadata generation using next-intl translations. Each language (English/Italian) has its own optimized title, description, and Open Graph content, ensuring proper localization for search engines and social platforms.

**Open Graph & Social Sharing**
Added complete Open Graph and Twitter Card metadata for rich social media previews:
- Proper og:title, og:description, og:image
- Twitter card configuration
- Locale-specific content

### Structured Data (JSON-LD)

Implemented schema.org structured data for rich search results:
- **Organization Schema**: Company information, logo, social profiles, contact points
- **Website Schema**: Site name, URL, search action capability
- **LocalBusiness Schema**: Professional service details, address, contact information

This enables:
- Knowledge Graph appearance in Google Search
- Rich snippets with additional information
- Better understanding of site structure by search engines

### Technical SEO

**Sitemap & Robots.txt**
Created dynamic sitemap.ts and robots.ts files that:
- List all locale variants (/en, /it)
- Set proper priorities and change frequencies
- Allow all search engine crawlers
- Reference sitemap location for automated discovery

**Canonical URLs & hreflang**
Configured proper canonical URLs and alternate language links:
- Prevents duplicate content issues
- Helps search engines understand language variants
- Improves international SEO

**Internal Linking Structure**
All navigation uses semantic anchor links with smooth scrolling (respecting `prefers-reduced-motion`). Section IDs are consistent and meaningful for better crawlability.

### Heading Hierarchy

Ensured proper h1 → h2 → h3 structure across all sections:
- Single h1 per page (visible, not hidden)
- Logical content hierarchy
- Improves accessibility and SEO simultaneously

**Benefits:**
- Better search engine rankings
- Rich social media previews
- Improved crawlability and indexing
- Enhanced appearance in search results
- Multi-language SEO support

---

## Bonus: Internationalization (i18n)

When I noticed the page wasn't in English, I thought it would be beneficial to add multi-language support. I implemented this using **next-intl**, a translation library specifically built for Next.js and well-suited for the App Router pattern.

This future-proofs the landing page for potential market expansion.

---

## Summary

| Category | Decision | Benefit |
|----------|----------|---------|
| Performance | WEBP/JPEG strategy | Smaller bundle, faster loads |
| Performance | Raw SVG components | Less render overhead, dynamic styling |
| Architecture | Component-driven | Scalable, maintainable, debuggable |
| Architecture | Typography system | Consistent, reusable text styles |
| Architecture | Color variables | Flexible theming with Tailwind v4 |
| UX | Pixel-perfect approach | Design fidelity |
| UX | Responsive brand | Optimized for all screen sizes |
| Accessibility | WCAG 2.1 compliance | Usable by everyone, better SEO |
| Accessibility | Keyboard navigation | Full keyboard support for all features |
| Accessibility | ARIA labels | Screen reader friendly |
| Accessibility | Modal accessibility | Proper focus management and keyboard traps |
| SEO | Locale-aware metadata | Optimized for each language |
| SEO | Structured data (JSON-LD) | Rich search results, Knowledge Graph |
| SEO | Sitemap & robots.txt | Better crawlability and indexing |
| SEO | Semantic HTML & headings | Improved rankings and accessibility |
| Bonus | i18n support | Multi-language ready |
