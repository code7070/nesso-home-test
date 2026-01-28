import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JobFilters, PostedWithin } from "@/types/filters";
import { POSTED_WITHIN_LABELS } from "@/types/filters";
import type { LocationType, JobType, ExperienceLevel } from "@/types/job";
import {
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "@/types/job";
import { formatSalary } from "@/utils/formatters";

interface FilterBarProps {
  filters: JobFilters;
  onFiltersChange: (filters: Partial<JobFilters>) => void;
}

const LOCATION_TYPES: LocationType[] = ["remote", "hybrid", "onsite"];
const JOB_TYPES: JobType[] = ["full-time", "part-time", "contract", "freelance"];
const EXPERIENCE_LEVELS: ExperienceLevel[] = ["entry", "mid", "senior"];
const POSTED_WITHIN_OPTIONS: PostedWithin[] = ["24h", "week", "month", "all"];

function MultiSelectPopover<T extends string>({
  label,
  options,
  selected,
  labels,
  onToggle,
}: {
  label: string;
  options: T[];
  selected: T[];
  labels: Record<T, string>;
  onToggle: (value: T) => void;
}) {
  const count = selected.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="gap-2 border-border hover:bg-accent"
        >
          <span>{label}</span>
          {count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-2">
        <div className="space-y-1">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent"
            >
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <span>{labels[option]}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const toggleLocationType = (value: LocationType) => {
    const next = filters.locationType.includes(value)
      ? filters.locationType.filter((t) => t !== value)
      : [...filters.locationType, value];
    onFiltersChange({ locationType: next });
  };

  const toggleJobType = (value: JobType) => {
    const next = filters.jobType.includes(value)
      ? filters.jobType.filter((t) => t !== value)
      : [...filters.jobType, value];
    onFiltersChange({ jobType: next });
  };

  const toggleExperienceLevel = (value: ExperienceLevel) => {
    const next = filters.experienceLevel.includes(value)
      ? filters.experienceLevel.filter((t) => t !== value)
      : [...filters.experienceLevel, value];
    onFiltersChange({ experienceLevel: next });
  };

  const isSalaryActive =
    filters.salaryRange.min !== 0 || filters.salaryRange.max !== 500000;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Location Type */}
      <MultiSelectPopover
        label="Location"
        options={LOCATION_TYPES}
        selected={filters.locationType}
        labels={LOCATION_TYPE_LABELS}
        onToggle={toggleLocationType}
      />

      {/* Job Type */}
      <MultiSelectPopover
        label="Job Type"
        options={JOB_TYPES}
        selected={filters.jobType}
        labels={JOB_TYPE_LABELS}
        onToggle={toggleJobType}
      />

      {/* Experience Level */}
      <MultiSelectPopover
        label="Experience"
        options={EXPERIENCE_LEVELS}
        selected={filters.experienceLevel}
        labels={EXPERIENCE_LEVEL_LABELS}
        onToggle={toggleExperienceLevel}
      />

      {/* Posted Within - single select */}
      <Select
        value={filters.postedWithin}
        onValueChange={(value) =>
          onFiltersChange({ postedWithin: value as PostedWithin })
        }
      >
        <SelectTrigger className="w-fit gap-2 border-border hover:bg-accent">
          <SelectValue placeholder="Posted within" />
        </SelectTrigger>
        <SelectContent>
          {POSTED_WITHIN_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {POSTED_WITHIN_LABELS[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Salary Range */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="default"
            className="gap-2 border-border hover:bg-accent"
          >
            <span>Salary</span>
            {isSalaryActive && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                1
              </span>
            )}
            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[280px]">
          <Label className="text-sm font-semibold text-foreground mb-3 block">
            Salary Range
          </Label>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              {formatSalary(
                filters.salaryRange.min,
                filters.salaryRange.max,
                "USD"
              )}
            </div>
            <Slider
              value={[filters.salaryRange.min, filters.salaryRange.max]}
              onValueChange={(value) =>
                onFiltersChange({
                  salaryRange: { min: value[0], max: value[1] },
                })
              }
              min={0}
              max={500000}
              step={10000}
              className="w-full"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
