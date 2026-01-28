// import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Job } from "@/types";

/**
 * Custom hook for managing job detail modal state with URL synchronization.
 * When a job is selected, the URL is updated with `?id=job-xxx` for shareable links.
 */
// export function useJobDetail() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);

//   const selectedJobId = searchParams.get("id");

//   const openJobDetail = useCallback(
//     (job: Job) => {
//       setSelectedJob(job);
//       setSearchParams(
//         (prev) => {
//           const params = new URLSearchParams(prev);
//           params.set("id", job.id);
//           return params;
//         },
//         { replace: true }
//       );
//     },
//     [setSearchParams]
//   );

//   const closeJobDetail = useCallback(() => {
//     setSelectedJob(null);
//     setSearchParams(
//       (prev) => {
//         const params = new URLSearchParams(prev);
//         params.delete("id");
//         return params;
//       },
//       { replace: true }
//     );
//   }, [setSearchParams]);

//   return {
//     selectedJob,
//     selectedJobId,
//     openJobDetail,
//     closeJobDetail,
//     isOpen: selectedJob !== null,
//   };
// }

export function useJobDetail(jobs: Job[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJobId = searchParams.get("id");

  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;

  const openJobDetail = (job: Job) => {
    setSearchParams({ id: job.id }, { replace: true });
  };

  const closeJobDetail = () => {
    setSearchParams({}, { replace: true });
  };

  return {
    selectedJob,
    selectedJobId,
    openJobDetail,
    closeJobDetail,
    isOpen: !!selectedJob,
  };
}
