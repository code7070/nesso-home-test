// Central type exports

// Job types
export type {
  Job,
  Salary,
  LocationType,
  JobType,
  ExperienceLevel,
} from "./job";

export {
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "./job";

// Filter types
export type {
  JobFilters,
  SalaryRange,
  PostedWithin,
  SortOption,
} from "./filters";

export {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  POSTED_WITHIN_LABELS,
  SORT_OPTION_LABELS,
} from "./filters";

// Application types
export type {
  ApplicationFormData,
  PersonalInfo,
  Experience,
  AdditionalInfo,
  ApplicationStep,
  StepConfig,
} from "./application";

export { APPLICATION_STEPS } from "./application";
