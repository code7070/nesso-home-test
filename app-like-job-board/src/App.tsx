import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

// Lazy load pages for code splitting
const JobsPage = lazy(() =>
  import("@/pages/JobsPage").then((m) => ({ default: m.JobsPage }))
);
const BookmarksPage = lazy(() =>
  import("@/pages/BookmarksPage").then((m) => ({ default: m.BookmarksPage }))
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

// Page loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
