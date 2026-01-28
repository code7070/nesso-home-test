import type { LocationType, JobType, ExperienceLevel } from "./job";

export interface SalaryRange {
  min: number;
  max: number;
}

export type PostedWithin = "24h" | "week" | "month" | "all";

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "salary-desc"
  | "salary-asc"
  | "company";

export interface JobFilters {
  search: string;
  locationType: LocationType[];
  jobType: JobType[];
  experienceLevel: ExperienceLevel[];
  salaryRange: SalaryRange;
  postedWithin: PostedWithin;
}

// Display labels
export const POSTED_WITHIN_LABELS: Record<PostedWithin, string> = {
  "24h": "Last 24 hours",
  week: "Last week",
  month: "Last month",
  all: "All time",
};

export const SORT_OPTION_LABELS: Record<SortOption, string> = {
  "date-desc": "Newest first",
  "date-asc": "Oldest first",
  "salary-desc": "Highest salary",
  "salary-asc": "Lowest salary",
  company: "Company A-Z",
};

// Default values
export const DEFAULT_FILTERS: JobFilters = {
  search: "",
  locationType: [],
  jobType: [],
  experienceLevel: [],
  salaryRange: { min: 0, max: 500000 },
  postedWithin: "all",
};

export const DEFAULT_SORT: SortOption = "date-desc";
