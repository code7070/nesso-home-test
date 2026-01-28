# Job Board Application - Dokumentasi Evaluasi

> Dokumentasi implementasi **App-Like Feature** berdasarkan kriteria evaluasi Nesso Digitale Senior Front-End Engineer Take-Home Test.

---

## Overview

Aplikasi **Job Board** adalah platform pencarian kerja yang mendemonstrasikan:
- State management kompleks (URL, localStorage, React Query, local state)
- Non-trivial UI interactions (filtering, search, multi-step form)
- Clean component architecture dengan separation of concerns
- Unit testing untuk business logic

**Tech Stack:** React 19 + Vite 7 + TypeScript + Tailwind CSS 4 + shadcn/ui + React Query 5 + React Router 7 + Zod

---

## Checklist Evaluasi

### ✅ State Management Demo

| Pattern | Implementasi | File |
|---------|--------------|------|
| **Local State** | Search input, modal visibility, form step | Components menggunakan `useState` |
| **URL State** | Filters & sort disimpan di URL params | `hooks/useJobFilters.ts` |
| **localStorage State** | Bookmarked jobs persist di browser | `hooks/useBookmarks.ts` |
| **Server State** | Job data dengan caching via React Query | `hooks/useJobs.ts` |
| **Derived State** | Filtered jobs dihitung dari filters + data | `services/jobService.ts` |

**URL State Example:**
```
/jobs?search=engineer&locationType=remote,hybrid&jobType=full-time&sort=salary-desc
```

---

### ✅ Non-Trivial UI Interactions

#### 1. Search & Filter System

| Feature | Detail |
|---------|--------|
| **Real-time Search** | Debounced (300ms), searches title, company, description, tags |
| **Multi-Select Filters** | Location type, job type, experience level |
| **Single-Select Filter** | Posted within (24h, week, month, all) |
| **Range Slider** | Salary range ($0 - $500k) |
| **Active Filter Chips** | Visual badges dengan remove button |
| **Clear All** | Reset semua filter sekaligus |
| **Mobile Drawer** | Responsive filter UI untuk mobile |

**Files:**
- `components/filters/SearchBar.tsx`
- `components/filters/FilterBar.tsx`
- `components/filters/SortSelect.tsx`
- `components/filters/ActiveFilterChips.tsx`
- `components/filters/MobileFilterDrawer.tsx`

#### 2. Multi-Step Application Form

| Step | Content | Validation |
|------|---------|------------|
| **Step 1** | Personal Info (name, email, phone, location, LinkedIn, portfolio) | Zod schema |
| **Step 2** | Experience (current role, years, resume upload) | Zod schema |
| **Step 3** | Additional Info (cover letter, why interested, salary, start date) | Zod schema |
| **Step 4** | Review & Submit (summary dengan edit buttons) | All fields validated |

**Features:**
- Visual step indicator dengan progress
- Form validation per step sebelum next
- Error messages inline
- Resume file upload (mock dengan drag-and-drop)
- Edit buttons di review untuk kembali ke step tertentu
- Success screen setelah submit

**Files:**
- `components/application/ApplicationWizard.tsx`
- `components/application/StepIndicator.tsx`
- `components/application/PersonalInfoStep.tsx`
- `components/application/ExperienceStep.tsx`
- `components/application/AdditionalInfoStep.tsx`
- `components/application/ReviewStep.tsx`
- `hooks/useMultiStepForm.ts`

#### 3. Job Detail Modal dengan URL Sync

- Click job card → modal opens → URL updates ke `/jobs?jobId=xxx`
- Direct link ke job detail bisa di-share
- Close modal → URL kembali ke filter state sebelumnya

**File:** `hooks/useJobDetail.ts`

#### 4. Bookmark System

| Feature | Detail |
|---------|--------|
| **Save/Unsave** | Toggle dari job card atau detail modal |
| **Persistence** | localStorage, survives page refresh |
| **Badge Count** | Header menampilkan jumlah bookmarks |
| **Dedicated Page** | `/bookmarks` dengan search & sort |
| **Clear All** | Hapus semua bookmarks sekaligus |

**File:** `hooks/useBookmarks.ts`

---

### ✅ Component Decomposition

```
src/
├── components/
│   ├── ui/                    # shadcn/ui primitives (17+ components)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   │
│   ├── job/                   # Job-specific components
│   │   ├── JobCard.tsx        # Individual job card
│   │   ├── JobList.tsx        # Grid + pagination + empty/loading states
│   │   └── JobDetail.tsx      # Full detail modal
│   │
│   ├── filters/               # Filter system
│   │   ├── SearchBar.tsx      # Debounced search
│   │   ├── FilterBar.tsx      # Multi-select filters + salary slider
│   │   ├── SortSelect.tsx     # Sort dropdown
│   │   ├── ActiveFilterChips.tsx
│   │   └── MobileFilterDrawer.tsx
│   │
│   ├── application/           # Multi-step form
│   │   ├── ApplicationWizard.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── FormNavigation.tsx
│   │   ├── PersonalInfoStep.tsx
│   │   ├── ExperienceStep.tsx
│   │   ├── AdditionalInfoStep.tsx
│   │   ├── ReviewStep.tsx
│   │   └── SuccessScreen.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       └── PageContainer.tsx
│
├── hooks/                     # Custom hooks (separation of concerns)
│   ├── useJobs.ts             # React Query hooks
│   ├── useJobFilters.ts       # URL-synced filters
│   ├── useJobDetail.ts        # Modal state + URL
│   ├── useBookmarks.ts        # localStorage persistence
│   ├── useMultiStepForm.ts    # Form wizard navigation
│   ├── useDebounce.ts         # Debounce utility
│   └── useIsMobile.ts         # Responsive detection
│
├── services/
│   └── jobService.ts          # Mock API dengan filtering/sorting logic
│
├── types/
│   ├── job.ts                 # Job, Salary, enums
│   ├── filters.ts             # Filter types, SortOption
│   ├── application.ts         # Form data types
│   └── index.ts               # Re-exports
│
├── utils/
│   ├── formatters.ts          # formatSalary, formatRelativeDate, etc.
│   └── validators.ts          # Zod schemas
│
├── data/
│   └── mockJobs.ts            # 31 realistic job listings
│
└── pages/
    ├── JobsPage.tsx           # Main job listing page
    ├── BookmarksPage.tsx      # Saved jobs page
    └── NotFoundPage.tsx       # 404 page
```

---

### ✅ Unit Tests

**File:** `src/__tests__/services/jobService.test.ts`

| Test Category | Test Cases |
|---------------|------------|
| **getAllJobs** | Returns data dengan required properties |
| **getJobById** | Fetch by ID, returns undefined untuk non-existent |
| **Search** | By title, company, tags |
| **Filter: Location** | Single dan multiple selection |
| **Filter: Job Type** | Full-time, part-time, contract, freelance |
| **Filter: Experience** | Entry, mid, senior |
| **Filter: Salary** | Range overlap check |
| **Filter: Posted** | 24h, week, month |
| **Combined Filters** | Multiple filters sekaligus |
| **Sort: Date** | Newest first, oldest first |
| **Sort: Salary** | Highest first, lowest first |
| **Sort: Company** | Alphabetical |

**Run Tests:**
```bash
bun run test           # Single run
bun run test:watch     # Watch mode
bun run test:ui        # Vitest UI
```

---

### ✅ Reusable Patterns

#### Consistent Props API

```tsx
// Button variants
<Button variant="default" size="sm">Apply</Button>
<Button variant="outline" size="lg">Cancel</Button>
<Button variant="ghost">Clear</Button>

// Input dengan error state
<Input
  error={errors.email?.message}
  placeholder="Email"
  {...register("email")}
/>

// Badge variants
<Badge variant="secondary">Remote</Badge>
<Badge variant="outline">Full-time</Badge>
```

#### Controlled/Uncontrolled Components

```tsx
// Controlled: filters synced dengan URL
const { filters, updateFilters } = useJobFilters()

// Uncontrolled: form dengan react-hook-form
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
})
```

#### Composition Pattern

```tsx
// Dialog composition
<Dialog>
  <DialogTrigger>
    <Button>View Details</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{job.title}</DialogTitle>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

---

### ✅ Performance Considerations

| Aspect | Implementation |
|--------|----------------|
| **Debounced Search** | 300ms delay untuk reduce re-renders |
| **React Query Caching** | staleTime: 5min, cacheTime: 30min |
| **Pagination** | "Load More" instead of loading semua sekaligus |
| **Simulated Network Delay** | 200-300ms untuk realistic UX |
| **Conditional Fetching** | `enabled` flag untuk lazy loading |

---

### ✅ Accessibility

| Feature | Implementation |
|---------|----------------|
| **Semantic HTML** | Proper heading hierarchy, semantic elements |
| **Keyboard Navigation** | Dialog, buttons, form fields accessible via keyboard |
| **Focus Management** | Focus trap dalam modal, focus ring visible |
| **ARIA Labels** | Labels pada interactive elements |
| **Color Contrast** | Professional color palette dengan sufficient contrast |

---

### ✅ Responsive Design

| Breakpoint | Layout |
|------------|--------|
| **Mobile** (< 640px) | 1 column, filter drawer |
| **Tablet** (640-1024px) | 2 columns, popover filters |
| **Desktop** (> 1024px) | 3 columns, full filter bar |

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Redirect | Redirect ke `/jobs` |
| `/jobs` | JobsPage | Main job listing dengan filters |
| `/jobs?jobId=xxx` | JobsPage + Modal | Job detail dalam modal |
| `/bookmarks` | BookmarksPage | Saved jobs |
| `*` | NotFoundPage | 404 page |

---

## Mock Data

**31 job listings** dengan variasi:
- Roles: Frontend, Full Stack, React, Vue, Angular, Next.js, Mobile, etc.
- Location types: Remote, Hybrid, Onsite
- Job types: Full-time, Part-time, Contract, Freelance
- Experience levels: Entry, Mid, Senior
- Salary range: $62k - $250k
- Posted dates: Jan 1 - Jan 25, 2026

---

## Development Commands

```bash
# Install dependencies
bun install

# Development server (http://localhost:5173)
bun run dev

# Production build
bun run build

# Preview production build
bun run preview

# Linting
bun run lint

# Testing
bun run test
bun run test:watch
bun run test:ui
```

---

## Key Technical Decisions

### 1. URL State untuk Filters
**Alasan:** Shareable URLs, browser back/forward works, bookmarkable search results.

### 2. React Query untuk Mock Data
**Alasan:** Demonstrates production-ready patterns (caching, loading states, error handling) meskipun data static.

### 3. Zod untuk Form Validation
**Alasan:** Type-safe validation, excellent TypeScript inference, easy to compose schemas.

### 4. shadcn/ui Components
**Alasan:** Accessible by default (Radix UI), customizable, consistent API, no runtime dependency.

### 5. Custom Hooks untuk State Management
**Alasan:** Separation of concerns, reusable logic, easier testing, cleaner components.

---

## Trade-offs & Assumptions

| Decision | Trade-off |
|----------|-----------|
| Mock data instead of real API | Simpler setup, tapi tidak demonstrate error handling kompleks |
| localStorage untuk bookmarks | Works offline, tapi tidak sync across devices |
| Modal untuk job detail | Better UX flow, tapi URL sharing less intuitive |
| File upload mock | Tidak actually upload, hanya store filename |
| 31 jobs only | Cukup untuk demonstrate pagination, tapi tidak test performance dengan large dataset |

---

## What's Next (dengan waktu lebih)

1. **Real API integration** dengan proper error boundaries
2. **Optimistic updates** untuk bookmark actions
3. **Infinite scroll** sebagai alternatif pagination
4. **Job comparison** feature (compare 2-3 jobs side by side)
5. **Search history** dengan autocomplete suggestions
6. **Filter presets** (save filter combinations)
7. **E2E tests** dengan Playwright
8. **Performance monitoring** dengan Web Vitals

---

## Screenshots

*Note: Screenshots dapat ditambahkan di sini untuk demo visual.*

---

## Related Files

| File | Description |
|------|-------------|
| `CLAUDE.md` (root) | Guidance untuk Claude Code |
| `EVALUATION_CRITERIA.md` | Original evaluation criteria |
| `prd/app-like/` | PRD documents untuk setiap phase |
