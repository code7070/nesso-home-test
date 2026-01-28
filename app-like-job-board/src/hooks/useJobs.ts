import { useQuery } from "@tanstack/react-query";
import { jobService } from "@/services/jobService";
import type { JobFilters, SortOption } from "@/types/filters";

/**
 * Hook to fetch all jobs without filters
 */
export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: jobService.getAllJobs,
  });
}

/**
 * Hook to fetch a single job by ID
 */
export function useJob(jobId: string) {
  return useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => jobService.getJobById(jobId),
    enabled: !!jobId,
  });
}

/**
 * Hook to search and filter jobs
 * Query key includes filters and sort to enable proper caching
 */
export function useSearchJobs(
  filters: JobFilters,
  sortOption: SortOption,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["jobs", "search", filters, sortOption],
    queryFn: () => jobService.searchJobs(filters, sortOption),
    enabled, // ← INI PENTING
  });
}
