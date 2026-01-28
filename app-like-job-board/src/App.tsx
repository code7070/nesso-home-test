import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JobsPage, BookmarksPage, NotFoundPage } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
