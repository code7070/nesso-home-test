import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Trash2, Search, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { JobList, JobDetail } from "@/components/job";
import { ApplicationWizard } from "@/components/application";
import { SortSelect } from "@/components/filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookmarks, useJobs, useJobDetail } from "@/hooks";
import type { Job, SortOption } from "@/types";

export function BookmarksPage() {
  const { bookmarkedIds, toggleBookmark, clearBookmarks } = useBookmarks();
  const { data: allJobs = [], isLoading } = useJobs();
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");

  // Job detail modal
  const { selectedJob, openJobDetail, closeJobDetail, isOpen } = useJobDetail();

  // Application form state
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  // Filter jobs to only bookmarked ones
  const bookmarkedJobs = useMemo(() => {
    let jobs = allJobs.filter((job) => bookmarkedIds.includes(job.id));

    // Apply search filter
    if (search) {
      const query = search.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sort
    return sortJobs(jobs, sortOption);
  }, [allJobs, bookmarkedIds, search, sortOption]);

  const handleJobClick = (job: Job) => {
    openJobDetail(job);
  };

  const handleApply = (job: Job) => {
    closeJobDetail();
    setApplyingJob(job);
  };

  const handleCloseApplication = () => {
    setApplyingJob(null);
  };

  return (
    <>
      <Header bookmarkCount={bookmarkedIds.length} />
      <PageContainer>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Saved Jobs</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${bookmarkedIds.length} ${bookmarkedIds.length === 1 ? "job" : "jobs"} saved`}
          </p>
        </div>

        {bookmarkedIds.length === 0 ? (
          // Empty state
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-muted border border-border flex items-center justify-center mx-auto mb-4">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No saved jobs yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Jobs you bookmark will appear here. Start browsing to save jobs
                you're interested in.
              </p>
              <Link to="/jobs">
                <Button className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Search & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <div className="relative flex-1 w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search saved jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-3">
                <SortSelect value={sortOption} onChange={setSortOption} />
                <Button
                  variant="outline"
                  size="default"
                  onClick={clearBookmarks}
                  className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All</span>
                </Button>
              </div>
            </div>

            {/* Sort & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                {isLoading ? (
                  <span>Loading saved jobs...</span>
                ) : (
                  <span>
                    Showing {bookmarkedJobs.length} of {bookmarkedIds.length}{" "}
                    saved {bookmarkedIds.length === 1 ? "job" : "jobs"}
                    {search && " (filtered)"}
                  </span>
                )}
              </div>
            </div>

            {/* Job List */}
            <JobList
              jobs={bookmarkedJobs}
              onJobClick={handleJobClick}
              onBookmark={toggleBookmark}
              bookmarkedIds={bookmarkedIds}
              loading={isLoading}
              pageSize={9}
              emptyMessage={
                search
                  ? "No saved jobs match your search."
                  : "No saved jobs yet."
              }
            />
          </>
        )}
      </PageContainer>

      {/* Job Detail Modal */}
      <JobDetail
        job={selectedJob}
        open={isOpen}
        onClose={closeJobDetail}
        onBookmark={toggleBookmark}
        isBookmarked={
          selectedJob ? bookmarkedIds.includes(selectedJob.id) : false
        }
        onApply={handleApply}
      />

      {/* Application Form */}
      {applyingJob && (
        <ApplicationWizard
          job={applyingJob}
          open={!!applyingJob}
          onClose={handleCloseApplication}
        />
      )}
    </>
  );
}

function sortJobs(jobs: Job[], sortOption: SortOption): Job[] {
  const sorted = [...jobs];
  switch (sortOption) {
    case "date-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    case "date-asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
      );
    case "salary-desc":
      return sorted.sort((a, b) => b.salary.max - a.salary.max);
    case "salary-asc":
      return sorted.sort((a, b) => a.salary.min - b.salary.min);
    case "company":
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
    default:
      return sorted;
  }
}
