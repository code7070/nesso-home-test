import { useState } from "react";
import type { Job } from "@/types";
import { JobCard } from "./JobCard";
import { Button } from "@/components/ui/button";

interface JobListProps {
  jobs: Job[];
  onJobClick?: (job: Job) => void;
  onBookmark?: (jobId: string) => void;
  bookmarkedIds?: string[];
  loading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
}

export function JobList({
  jobs,
  onJobClick,
  onBookmark,
  bookmarkedIds = [],
  loading = false,
  emptyMessage = "No jobs found",
  pageSize = 5,
}: JobListProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  // Loading state - will add proper skeleton in polish phase
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4 p-6 bg-card border border-border animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-muted" />
                <div className="h-5 w-full bg-muted" />
              </div>
            </div>
            <div className="h-4 w-32 bg-muted" />
            <div className="h-4 w-40 bg-muted" />
            <div className="h-6 w-28 bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Slice jobs to show only visible items
  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;
  const remainingJobs = jobs.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + pageSize);
  };

  // Job list
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={onJobClick}
            onBookmark={onBookmark}
            isBookmarked={bookmarkedIds.includes(job.id)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {visibleCount} of {jobs.length} jobs
            {remainingJobs > 0 && ` • ${remainingJobs} more available`}
          </div>
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
}
