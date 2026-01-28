import { useSearchParams } from "react-router";
import { useMemo } from "react";
import type {
  JobFilters,
  SortOption,
  PostedWithin,
} from "@/types/filters";
import type { LocationType, JobType, ExperienceLevel } from "@/types/job";
import { DEFAULT_FILTERS, DEFAULT_SORT } from "@/types/filters";

/**
 * Custom hook for managing job filters with URL synchronization.
 * Filters are stored in URL search params for shareable URLs.
 */
export function useJobFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters from URL
  const filters = useMemo<JobFilters>(() => {
    const search = searchParams.get("search") || DEFAULT_FILTERS.search;

    const locationTypeStr = searchParams.get("location");
    const locationType = locationTypeStr
      ? (locationTypeStr.split(",") as LocationType[])
      : DEFAULT_FILTERS.locationType;

    const jobTypeStr = searchParams.get("type");
    const jobType = jobTypeStr
      ? (jobTypeStr.split(",") as JobType[])
      : DEFAULT_FILTERS.jobType;

    const experienceLevelStr = searchParams.get("experience");
    const experienceLevel = experienceLevelStr
      ? (experienceLevelStr.split(",") as ExperienceLevel[])
      : DEFAULT_FILTERS.experienceLevel;

    const minSalary = searchParams.get("minSalary");
    const maxSalary = searchParams.get("maxSalary");
    const salaryRange = {
      min: minSalary ? parseInt(minSalary, 10) : DEFAULT_FILTERS.salaryRange.min,
      max: maxSalary ? parseInt(maxSalary, 10) : DEFAULT_FILTERS.salaryRange.max,
    };

    const postedWithin = (searchParams.get("posted") as PostedWithin) || DEFAULT_FILTERS.postedWithin;

    return {
      search,
      locationType,
      jobType,
      experienceLevel,
      salaryRange,
      postedWithin,
    };
  }, [searchParams]);

  // Parse sort option from URL
  const sortOption = useMemo<SortOption>(() => {
    return (searchParams.get("sort") as SortOption) || DEFAULT_SORT;
  }, [searchParams]);

  // Update filters in URL
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      // Handle search
      if (newFilters.search !== undefined) {
        if (newFilters.search) {
          params.set("search", newFilters.search);
        } else {
          params.delete("search");
        }
      }

      // Handle locationType array
      if (newFilters.locationType !== undefined) {
        if (newFilters.locationType.length > 0) {
          params.set("location", newFilters.locationType.join(","));
        } else {
          params.delete("location");
        }
      }

      // Handle jobType array
      if (newFilters.jobType !== undefined) {
        if (newFilters.jobType.length > 0) {
          params.set("type", newFilters.jobType.join(","));
        } else {
          params.delete("type");
        }
      }

      // Handle experienceLevel array
      if (newFilters.experienceLevel !== undefined) {
        if (newFilters.experienceLevel.length > 0) {
          params.set("experience", newFilters.experienceLevel.join(","));
        } else {
          params.delete("experience");
        }
      }

      // Handle salary range
      if (newFilters.salaryRange !== undefined) {
        const { min, max } = newFilters.salaryRange;
        if (min !== DEFAULT_FILTERS.salaryRange.min) {
          params.set("minSalary", min.toString());
        } else {
          params.delete("minSalary");
        }
        if (max !== DEFAULT_FILTERS.salaryRange.max) {
          params.set("maxSalary", max.toString());
        } else {
          params.delete("maxSalary");
        }
      }

      // Handle postedWithin
      if (newFilters.postedWithin !== undefined) {
        if (newFilters.postedWithin !== DEFAULT_FILTERS.postedWithin) {
          params.set("posted", newFilters.postedWithin);
        } else {
          params.delete("posted");
        }
      }

      return params;
    });
  };

  // Update sort option in URL
  const updateSort = (newSort: SortOption) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (newSort !== DEFAULT_SORT) {
        params.set("sort", newSort);
      } else {
        params.delete("sort");
      }
      return params;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchParams({});
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== DEFAULT_FILTERS.search ||
      filters.locationType.length > 0 ||
      filters.jobType.length > 0 ||
      filters.experienceLevel.length > 0 ||
      filters.salaryRange.min !== DEFAULT_FILTERS.salaryRange.min ||
      filters.salaryRange.max !== DEFAULT_FILTERS.salaryRange.max ||
      filters.postedWithin !== DEFAULT_FILTERS.postedWithin ||
      sortOption !== DEFAULT_SORT
    );
  }, [filters, sortOption]);

  return {
    filters,
    sortOption,
    updateFilters,
    updateSort,
    resetFilters,
    hasActiveFilters,
  };
}
