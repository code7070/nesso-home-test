import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Job } from "@/types";

/**
 * Custom hook for managing job detail modal state with URL synchronization.
 * When a job is selected, the URL is updated with `?id=job-xxx` for shareable links.
 *
 * @param jobs - Optional array of jobs to find selected job from URL
 */
export function useJobDetail(jobs?: Job[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [manualSelectedJob, setManualSelectedJob] = useState<Job | null>(null);

  const selectedJobId = searchParams.get("id");

  // If jobs array provided, find job from it; otherwise use manual state
  const selectedJob = jobs
    ? (jobs.find((j) => j.id === selectedJobId) ?? null)
    : manualSelectedJob;

  const openJobDetail = useCallback(
    (job: Job) => {
      if (!jobs) {
        setManualSelectedJob(job);
      }
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("id", job.id);
        return params;
      }, { replace: true });
    },
    [jobs, setSearchParams]
  );

  const closeJobDetail = useCallback(() => {
    if (!jobs) {
      setManualSelectedJob(null);
    }
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("id");
      return params;
    }, { replace: true });
  }, [jobs, setSearchParams]);

  return {
    selectedJob,
    selectedJobId,
    openJobDetail,
    closeJobDetail,
    isOpen: !!selectedJob,
  };
}
