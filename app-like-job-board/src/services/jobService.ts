import { mockJobs } from "@/data/mockJobs";
import type { Job } from "@/types/job";
import type { JobFilters, SortOption } from "@/types/filters";

/**
 * Simulates network delay for realistic UX
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Filter jobs based on search query
 */
function filterBySearch(jobs: Job[], search: string): Job[] {
  if (!search) return jobs;

  const searchLower = search.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  );
}

/**
 * Filter jobs based on location type
 */
function filterByLocationType(jobs: Job[], locationTypes: string[]): Job[] {
  if (locationTypes.length === 0) return jobs;
  return jobs.filter((job) => locationTypes.includes(job.locationType));
}

/**
 * Filter jobs based on job type
 */
function filterByJobType(jobs: Job[], jobTypes: string[]): Job[] {
  if (jobTypes.length === 0) return jobs;
  return jobs.filter((job) => jobTypes.includes(job.jobType));
}

/**
 * Filter jobs based on experience level
 */
function filterByExperienceLevel(jobs: Job[], experienceLevels: string[]): Job[] {
  if (experienceLevels.length === 0) return jobs;
  return jobs.filter((job) => experienceLevels.includes(job.experienceLevel));
}

/**
 * Filter jobs based on salary range
 */
function filterBySalaryRange(
  jobs: Job[],
  minSalary: number,
  maxSalary: number
): Job[] {
  return jobs.filter(
    (job) =>
      job.salary.max >= minSalary && job.salary.min <= maxSalary
  );
}

/**
 * Filter jobs based on posted date
 */
function filterByPostedWithin(jobs: Job[], postedWithin: string): Job[] {
  if (postedWithin === "all") return jobs;

  const now = new Date();
  const cutoffDate = new Date();

  switch (postedWithin) {
    case "24h":
      cutoffDate.setHours(now.getHours() - 24);
      break;
    case "week":
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case "month":
      cutoffDate.setMonth(now.getMonth() - 1);
      break;
    default:
      return jobs;
  }

  return jobs.filter((job) => new Date(job.postedDate) >= cutoffDate);
}

/**
 * Sort jobs based on sort option
 */
function sortJobs(jobs: Job[], sortOption: SortOption): Job[] {
  const sortedJobs = [...jobs];

  switch (sortOption) {
    case "date-desc":
      sortedJobs.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
      break;
    case "date-asc":
      sortedJobs.sort(
        (a, b) =>
          new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
      );
      break;
    case "salary-desc":
      sortedJobs.sort((a, b) => b.salary.max - a.salary.max);
      break;
    case "salary-asc":
      sortedJobs.sort((a, b) => a.salary.min - b.salary.min);
      break;
    case "company":
      sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
      break;
    default:
      break;
  }

  return sortedJobs;
}

/**
 * Job Service - Mock API for job data
 */
export const jobService = {
  /**
   * Get all jobs without filters
   */
  getAllJobs: async (): Promise<Job[]> => {
    await delay(300);
    return mockJobs;
  },

  /**
   * Get a single job by ID
   */
  getJobById: async (id: string): Promise<Job | undefined> => {
    await delay(200);
    return mockJobs.find((job) => job.id === id);
  },

  /**
   * Search and filter jobs
   */
  searchJobs: async (
    filters: JobFilters,
    sortOption: SortOption
  ): Promise<Job[]> => {
    await delay(300);

    let filteredJobs = [...mockJobs];

    // Apply all filters
    filteredJobs = filterBySearch(filteredJobs, filters.search);
    filteredJobs = filterByLocationType(filteredJobs, filters.locationType);
    filteredJobs = filterByJobType(filteredJobs, filters.jobType);
    filteredJobs = filterByExperienceLevel(
      filteredJobs,
      filters.experienceLevel
    );
    filteredJobs = filterBySalaryRange(
      filteredJobs,
      filters.salaryRange.min,
      filters.salaryRange.max
    );
    filteredJobs = filterByPostedWithin(filteredJobs, filters.postedWithin);

    // Apply sorting
    filteredJobs = sortJobs(filteredJobs, sortOption);

    return filteredJobs;
  },
};
