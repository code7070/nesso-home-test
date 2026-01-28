# Job Board Application

**App-like feature** untuk take-home test Senior Front-End Engineer di Nesso Digitale.

Platform job board dengan state management kompleks, component architecture yang baik, dan best practices engineering.

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React | 19.2.0 | UI library |
| **Build Tool** | Vite | 7.2.4 | Fast build & HMR |
| **Language** | TypeScript | 5.9.3 | Type safety |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **Components** | shadcn/ui | Latest | Accessible component library |
| **Data Fetching** | React Query | 5.x | Server state management |
| **Routing** | React Router | 6.x | Client-side routing |
| **Forms** | React Hook Form | 7.x | Performant form handling |
| **Validation** | Zod | 3.x | Schema validation |
| **Testing** | Vitest + RTL | Latest | Unit & component tests |
| **Package Manager** | Bun | Latest | Fast package management |

---

## Design System

### Style Guidelines: Professional-Look, Boxy

Aplikasi ini menggunakan desain **professional** dengan aesthetic **boxy** yang clean dan modern:

#### Core Principles

- **Boxy Layout**: Sharp corners, defined edges, clear boundaries
- **Structured Grid**: Consistent spacing dan alignment
- **Card-based UI**: Content organized dalam card containers
- **Minimal Borders**: Menggunakan subtle borders dan shadows
- **Professional Typography**: Clear hierarchy, readable fonts
- **Muted Color Palette**: Professional blues, grays, minimal accents

#### Visual Characteristics

```
✓ Sharp corners (no rounded-2xl, prefer rounded-none or rounded-sm)
✓ Strong grid alignment
✓ Defined sections dengan borders/dividers
✓ Box shadows untuk depth (subtle)
✓ Clean white/gray backgrounds
✓ Structured layouts dengan clear spacing
```

### Color Palette (LinkedIn Theme)

```css
/* Primary - LinkedIn Blue */
--primary: #0077B5;        /* LinkedIn Blue */
--primary-foreground: #FFFFFF;

/* Dark/Text */
--foreground: #232323;     /* Almost Black */
--secondary: #232323;
--secondary-foreground: #FFFFFF;

/* Backgrounds */
--background: #F3F2EF;     /* LinkedIn gray background */
--card: #FFFFFF;           /* White cards */

/* Muted/Gray tones */
--muted: #E8E6E3;
--muted-foreground: #666666;

/* UI Elements */
--border: #D4D2CF;
--input: #D4D2CF;
--ring: #0077B5;

/* Semantic Colors */
--destructive: #CC1016;    /* Red for errors */
```

### Typography

```css
/* Font Family */
font-family: Inter, system-ui, sans-serif;

/* Scale */
--text-xs: 12px;    /* Captions, labels */
--text-sm: 14px;    /* Body text, most UI */
--text-base: 16px;  /* Comfortable reading */
--text-lg: 18px;    /* Emphasized text */
--text-xl: 20px;    /* Section headers */
--text-2xl: 24px;   /* Page titles */

/* Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System (Boxy Grid)

```css
/* Base unit: 4px */
--space-1: 4px;    /* 0.25rem - Tight spacing */
--space-2: 8px;    /* 0.5rem  - Component padding */
--space-3: 12px;   /* 0.75rem - Small gaps */
--space-4: 16px;   /* 1rem    - Standard gap */
--space-6: 24px;   /* 1.5rem  - Section spacing */
--space-8: 32px;   /* 2rem    - Large gaps */
--space-12: 48px;  /* 3rem    - Major sections */
--space-16: 64px;  /* 4rem    - Page sections */
```

### Component Patterns (Boxy Style)

#### Card Components
```tsx
// Professional boxy card
<div className="bg-white border border-slate-200 shadow-sm">
  {/* No rounded corners or minimal rounding */}
  <div className="p-6 border-b border-slate-200">
    {/* Header */}
  </div>
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

#### Buttons
```tsx
// Sharp, professional buttons
<button className="
  px-4 py-2
  bg-blue-600 text-white
  border border-blue-700
  font-medium text-sm
  hover:bg-blue-700
  transition-colors
">
  Apply Now
</button>
```

#### Input Fields
```tsx
// Clean, boxed inputs
<input className="
  w-full px-4 py-2.5
  border border-slate-300
  bg-white
  text-sm
  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
" />
```

### Responsive Grid

```
Mobile  (< 640px):  1 column, full-width cards
Tablet  (640-1024): 2 columns, 24px gap
Desktop (> 1024px): 3 columns, sidebar layout, 32px gap
```

---

## Tailwind CSS Implementation

### Configuration

File: `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
}
```

### CSS Setup

File: `src/index.css`

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 font-sans antialiased;
  }

  * {
    @apply border-slate-200;
  }
}
```

---

## shadcn/ui Implementation

### Setup

shadcn/ui adalah collection of re-usable components yang dibangun dengan Radix UI dan Tailwind CSS.

```bash
# Initialize shadcn/ui
bunx shadcn-ui@latest init

# Install components as needed
bunx shadcn-ui@latest add button
bunx shadcn-ui@latest add input
bunx shadcn-ui@latest add card
bunx shadcn-ui@latest add dialog
bunx shadcn-ui@latest add select
bunx shadcn-ui@latest add badge
bunx shadcn-ui@latest add checkbox
bunx shadcn-ui@latest add label
bunx shadcn-ui@latest add textarea
bunx shadcn-ui@latest add tabs
```

### Configuration

File: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Component Customization (Boxy Style)

Customize shadcn components untuk match boxy aesthetic:

```tsx
// components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white border border-blue-700 hover:bg-blue-700",
        outline: "border border-slate-300 bg-white hover:bg-slate-50",
        ghost: "hover:bg-slate-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

---

## React Query Implementation

### Data Fetching Strategy

Aplikasi ini menggunakan **static mock data** yang di-hydrate melalui React Query untuk mendemonstrasikan proper server state management patterns.

### Setup

File: `src/main.tsx`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
```

### Mock Data Service

File: `src/services/jobService.ts`

```tsx
import { mockJobs } from '@/data/mockJobs'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const jobService = {
  // Fetch all jobs
  getAllJobs: async (): Promise<Job[]> => {
    await delay(300) // Simulate network delay
    return mockJobs
  },

  // Fetch single job
  getJobById: async (id: string): Promise<Job | undefined> => {
    await delay(200)
    return mockJobs.find(job => job.id === id)
  },

  // Search jobs
  searchJobs: async (filters: JobFilters): Promise<Job[]> => {
    await delay(300)
    // Apply filtering logic
    return mockJobs.filter(job => {
      // ... filtering logic
    })
  },
}
```

### React Query Hooks

File: `src/hooks/useJobs.ts`

```tsx
import { useQuery } from '@tanstack/react-query'
import { jobService } from '@/services/jobService'

// Fetch all jobs
export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: jobService.getAllJobs,
  })
}

// Fetch single job
export function useJob(jobId: string) {
  return useQuery({
    queryKey: ['jobs', jobId],
    queryFn: () => jobService.getJobById(jobId),
    enabled: !!jobId,
  })
}

// Search/filter jobs
export function useJobSearch(filters: JobFilters) {
  return useQuery({
    queryKey: ['jobs', 'search', filters],
    queryFn: () => jobService.searchJobs(filters),
    keepPreviousData: true, // For smooth transitions
  })
}
```

### Usage in Components

```tsx
function JobListPage() {
  const { data: jobs, isLoading, error } = useJobs()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs?.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
```

### Query Keys Structure

```tsx
// Query key patterns
const queryKeys = {
  all: ['jobs'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: JobFilters) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
  bookmarks: ['bookmarks'] as const,
}
```

### Benefits of React Query with Static Data

1. **Caching**: Data di-cache dan di-reuse tanpa re-fetch
2. **Loading States**: Built-in loading & error states
3. **DevTools**: Visualize query state dan cache
4. **Optimistic Updates**: Update UI sebelum "server" response
5. **Real-world Pattern**: Same pattern untuk production API
6. **Background Refetching**: Automatic stale data updates
7. **Request Deduplication**: Multiple components share same query

---

## Project Structure

```
/app-like
├── /src
│   ├── /components
│   │   ├── /ui              # shadcn/ui components (Button, Input, etc.)
│   │   ├── /job             # Job-specific components
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   └── JobDetail.tsx
│   │   ├── /filters         # Filter components
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── SortSelect.tsx
│   │   ├── /application     # Multi-step form
│   │   │   ├── ApplicationWizard.tsx
│   │   │   ├── PersonalInfoStep.tsx
│   │   │   ├── ExperienceStep.tsx
│   │   │   └── ReviewStep.tsx
│   │   └── /layout          # Layout components
│   │       ├── Header.tsx
│   │       └── Container.tsx
│   │
│   ├── /hooks               # Custom React hooks
│   │   ├── useJobs.ts       # React Query hooks
│   │   ├── useJobFilters.ts
│   │   ├── useBookmarks.ts
│   │   └── useMultiStepForm.ts
│   │
│   ├── /services            # Data services (mock API)
│   │   └── jobService.ts
│   │
│   ├── /utils               # Pure utility functions
│   │   ├── filters.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   ├── /types               # TypeScript definitions
│   │   ├── job.ts
│   │   ├── filters.ts
│   │   ├── application.ts
│   │   └── index.ts
│   │
│   ├── /data                # Mock static data
│   │   └── mockJobs.ts
│   │
│   ├── /pages               # Page components
│   │   ├── HomePage.tsx
│   │   ├── JobsPage.tsx
│   │   ├── JobDetailPage.tsx
│   │   ├── BookmarksPage.tsx
│   │   └── ApplicationPage.tsx
│   │
│   ├── /__tests__           # Test files
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── /lib                 # Library utilities
│   │   └── utils.ts         # shadcn/ui utils (cn helper)
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── components.json          # shadcn/ui config
└── README.md
```

---

## Development Commands

```bash
# Install dependencies
bun install

# Development server (http://localhost:5173)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint

# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Type checking
bun run type-check
```

---

## Development Workflow

### Phase 1: Foundation (Current)
- [x] Project scaffolding (React + Vite + TypeScript)
- [ ] Install Tailwind CSS
- [ ] Setup shadcn/ui
- [ ] Install React Query
- [ ] Install React Router
- [ ] Create type definitions
- [ ] Create mock data
- [ ] Setup basic components

### Phase 2: Core Features
- [ ] Job listing with React Query
- [ ] Search & filter functionality
- [ ] URL state synchronization
- [ ] Job detail modal
- [ ] Unit tests

### Phase 3: Advanced Features
- [ ] Bookmarks (localStorage)
- [ ] Multi-step application form
- [ ] Form validation (Zod)
- [ ] Comprehensive testing

### Phase 4: Polish
- [ ] Loading states
- [ ] Error boundaries
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Documentation

---

## Feature Requirements

### State Management Demo

Aplikasi ini mendemonstrasikan berbagai state management patterns:

- **Local State**: `useState`, `useReducer` untuk component state
- **URL State**: Search params untuk filter/sort (shareable URLs)
- **Persistent State**: localStorage untuk bookmarks
- **Server State**: React Query untuk job data
- **Derived State**: Computed values dari existing state

### Non-Trivial UI Interactions

- Multi-criteria filtering dengan URL sync
- Real-time search dengan debouncing
- Multi-step form wizard dengan validation
- Bookmark management dengan optimistic updates
- Modal routing (job detail dengan URL update)

---

## Testing Strategy

```bash
# Unit tests: Pure functions, utilities
src/utils/__tests__/

# Component tests: UI components, user interactions
src/components/__tests__/

# Hook tests: Custom hooks behavior
src/hooks/__tests__/

# Integration tests: Feature workflows
src/__tests__/integration/
```

---

## Performance Considerations

- React Query caching untuk minimize re-fetches
- Debounced search untuk reduce re-renders
- Memoized filter functions
- Lazy loading untuk routes
- Code splitting untuk better load times
- Optimized bundle dengan Vite

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Related Documentation

| Document | Location | Description |
|----------|----------|-------------|
| **PRD Overview** | `/prd/app-like/00-overview.md` | Project overview & requirements |
| **Data Models** | `/prd/app-like/01-data-models.md` | TypeScript interfaces |
| **Phase Documents** | `/prd/app-like/02-*.md` | Detailed phase specs |

---

## License

This is a take-home test project for Nesso Digitale.

---

## Contact

For questions about this project, please contact the Nesso Digitale engineering team.
