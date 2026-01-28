import { useState, useEffect } from "react";

const BOOKMARKS_STORAGE_KEY = "job-board-bookmarks";

/**
 * Custom hook for managing bookmarked jobs in localStorage
 */
export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarkedIds(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Failed to load bookmarks from localStorage:", error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage:", error);
    }
  }, [bookmarkedIds]);

  // Toggle bookmark for a job
  const toggleBookmark = (jobId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Check if a job is bookmarked
  const isBookmarked = (jobId: string): boolean => {
    return bookmarkedIds.includes(jobId);
  };

  // Clear all bookmarks
  const clearBookmarks = () => {
    setBookmarkedIds([]);
  };

  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
  };
}
