import { useEffect, useState } from "react";
import type { Job, JobFilters } from "@/types";
import { DEFAULT_FILTERS } from "@/types/filters";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { JobList, JobDetail } from "@/components/job";
import { ApplicationWizard } from "@/components/application";
import {
  SearchBar,
  FilterBar,
  ActiveFilterChips,
  SortSelect,
  MobileFilterDrawer,
} from "@/components/filters";
import {
  useBookmarks,
  useJobFilters,
  useSearchJobs,
  useJobDetail,
} from "@/hooks";

export function JobsPage() {
  // Bookmark management with localStorage
  const { bookmarkedIds, toggleBookmark } = useBookmarks();

  // Filter and sort management with URL sync
  const {
    filters,
    sortOption,
    updateFilters,
    updateSort,
    resetFilters,
    hasActiveFilters,
  } = useJobFilters();

  const hasSearch =
    filters.search.trim() !== "" ||
    filters.locationType.length > 0 ||
    filters.jobType.length > 0 ||
    filters.experienceLevel.length > 0 ||
    filters.salaryRange !== DEFAULT_FILTERS.salaryRange ||
    filters.postedWithin !== DEFAULT_FILTERS.postedWithin;

  // Fetch filtered and sorted jobs
  const { data: jobs = [], isLoading } = useSearchJobs(
    filters,
    sortOption,
    hasSearch,
  );

  // Job detail modal state
  const { selectedJob, selectedJobId, openJobDetail, closeJobDetail, isOpen } =
    useJobDetail(jobs);

  // Application form state
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  // Mobile filter drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Auto-open modal if URL has job id
  useEffect(() => {
    if (selectedJobId && !selectedJob && jobs.length > 0) {
      const job = jobs.find((j) => j.id === selectedJobId);
      if (job) {
        openJobDetail(job);
      }
    }
  }, [selectedJobId, selectedJob, jobs, openJobDetail]);

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

  // Handle removing individual filters
  const handleRemoveFilter = (filterKey: keyof JobFilters, value?: string) => {
    switch (filterKey) {
      case "locationType":
        if (value) {
          updateFilters({
            locationType: filters.locationType.filter((t) => t !== value),
          });
        }
        break;
      case "jobType":
        if (value) {
          updateFilters({
            jobType: filters.jobType.filter((t) => t !== value),
          });
        }
        break;
      case "experienceLevel":
        if (value) {
          updateFilters({
            experienceLevel: filters.experienceLevel.filter((t) => t !== value),
          });
        }
        break;
      case "salaryRange":
        updateFilters({ salaryRange: DEFAULT_FILTERS.salaryRange });
        break;
      case "postedWithin":
        updateFilters({ postedWithin: DEFAULT_FILTERS.postedWithin });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header bookmarkCount={bookmarkedIds.length} />
      <PageContainer>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${jobs.length} jobs found`}
          </p>
        </div>

        {/*WRAP*/}
        <div className="sticky top-0">
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              value={filters.search}
              onChange={(value) => updateFilters({ search: value })}
            />
          </div>

          {/* Filter Controls & Active Chips */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            {/* Desktop filter bar (hidden on mobile) */}
            <div className="hidden sm:block">
              <FilterBar filters={filters} onFiltersChange={updateFilters} />
            </div>
            {/* Mobile filter drawer (hidden on desktop) */}
            <MobileFilterDrawer
              open={mobileFilterOpen}
              onOpenChange={setMobileFilterOpen}
              filters={filters}
              onFiltersChange={updateFilters}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
            <ActiveFilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>

        {/* Sort & Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            {isLoading ? (
              <span>Loading jobs...</span>
            ) : (
              <span>
                Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
              </span>
            )}
          </div>
          <SortSelect value={sortOption} onChange={updateSort} />
        </div>

        {/* Job List */}
        <JobList
          jobs={jobs}
          onJobClick={handleJobClick}
          onBookmark={toggleBookmark}
          bookmarkedIds={bookmarkedIds}
          loading={isLoading}
          pageSize={7}
          emptyMessage={
            hasActiveFilters
              ? "No jobs match your filters. Try adjusting your search criteria."
              : "No jobs available at the moment."
          }
        />
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
