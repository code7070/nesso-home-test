import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobFilters } from "@/types/filters";
import {
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "@/types/job";
import { POSTED_WITHIN_LABELS } from "@/types/filters";
import { formatSalary } from "@/utils/formatters";

interface ActiveFilterChipsProps {
  filters: JobFilters;
  onRemoveFilter: (filterKey: keyof JobFilters, value?: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function ActiveFilterChips({
  filters,
  onRemoveFilter,
  onClearAll,
  hasActiveFilters,
}: ActiveFilterChipsProps) {
  if (!hasActiveFilters) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Location Type chips */}
      {filters.locationType.map((type) => (
        <Badge
          key={type}
          variant="secondary"
          className="gap-1 pr-1 text-xs"
        >
          {LOCATION_TYPE_LABELS[type]}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveFilter("locationType", type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {/* Job Type chips */}
      {filters.jobType.map((type) => (
        <Badge
          key={type}
          variant="secondary"
          className="gap-1 pr-1 text-xs"
        >
          {JOB_TYPE_LABELS[type]}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveFilter("jobType", type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {/* Experience Level chips */}
      {filters.experienceLevel.map((level) => (
        <Badge
          key={level}
          variant="secondary"
          className="gap-1 pr-1 text-xs"
        >
          {EXPERIENCE_LEVEL_LABELS[level]}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveFilter("experienceLevel", level)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {/* Salary Range chip */}
      {(filters.salaryRange.min !== 0 || filters.salaryRange.max !== 500000) && (
        <Badge variant="secondary" className="gap-1 pr-1 text-xs">
          {formatSalary(filters.salaryRange.min, filters.salaryRange.max, "USD")}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() =>
              onRemoveFilter("salaryRange")
            }
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Posted Within chip */}
      {filters.postedWithin !== "all" && (
        <Badge variant="secondary" className="gap-1 pr-1 text-xs">
          {POSTED_WITHIN_LABELS[filters.postedWithin]}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveFilter("postedWithin")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Clear All button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-6 text-xs text-primary hover:text-primary"
      >
        Clear all
      </Button>
    </div>
  );
}
