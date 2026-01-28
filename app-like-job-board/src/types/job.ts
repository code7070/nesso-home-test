// Core job types
export type LocationType = "remote" | "hybrid" | "onsite";

export type JobType = "full-time" | "part-time" | "contract" | "freelance";

export type ExperienceLevel = "entry" | "mid" | "senior";

export interface Salary {
  min: number;
  max: number;
  currency: string; // e.g., "USD", "IDR"
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string; // e.g., "San Francisco, CA" atau "Worldwide"
  locationType: LocationType;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salary: Salary;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string; // ISO 8601 format
  tags: string[]; // e.g., ["React", "TypeScript", "Remote"]
}

// Display labels for user-friendly rendering
export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
};

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
};
