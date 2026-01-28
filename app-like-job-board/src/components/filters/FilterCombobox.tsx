import { useState } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxGroup,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import type { JobFilters, PostedWithin } from "@/types/filters";
import type { LocationType, JobType, ExperienceLevel } from "@/types/job";
import {
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "@/types/job";
import { POSTED_WITHIN_LABELS } from "@/types/filters";
import { formatSalary } from "@/utils/formatters";

interface FilterComboboxProps {
  filters: JobFilters;
  onFiltersChange: (filters: Partial<JobFilters>) => void;
  hasActiveFilters: boolean;
}

export function FilterCombobox({
  filters,
  onFiltersChange,
  hasActiveFilters,
}: FilterComboboxProps) {
  const [searchValue, setSearchValue] = useState("");

  // Location Type handlers
  const toggleLocationType = (locationType: LocationType) => {
    const newLocationTypes = filters.locationType.includes(locationType)
      ? filters.locationType.filter((t) => t !== locationType)
      : [...filters.locationType, locationType];
    onFiltersChange({ locationType: newLocationTypes });
  };

  // Job Type handlers
  const toggleJobType = (jobType: JobType) => {
    const newJobTypes = filters.jobType.includes(jobType)
      ? filters.jobType.filter((t) => t !== jobType)
      : [...filters.jobType, jobType];
    onFiltersChange({ jobType: newJobTypes });
  };

  // Experience Level handlers
  const toggleExperienceLevel = (experienceLevel: ExperienceLevel) => {
    const newExperienceLevels = filters.experienceLevel.includes(experienceLevel)
      ? filters.experienceLevel.filter((t) => t !== experienceLevel)
      : [...filters.experienceLevel, experienceLevel];
    onFiltersChange({ experienceLevel: newExperienceLevels });
  };

  // Posted Within handler
  const handlePostedWithinChange = (value: PostedWithin) => {
    onFiltersChange({ postedWithin: value });
  };

  // Salary Range handler
  const handleSalaryRangeChange = (value: number[]) => {
    onFiltersChange({
      salaryRange: {
        min: value[0],
        max: value[1],
      },
    });
  };

  const locationTypes: LocationType[] = ["remote", "hybrid", "onsite"];
  const jobTypes: JobType[] = ["full-time", "part-time", "contract", "freelance"];
  const experienceLevels: ExperienceLevel[] = ["entry", "mid", "senior"];
  const postedWithinOptions: PostedWithin[] = ["24h", "week", "month", "all"];

  // Filter options based on search
  const filteredLocationTypes = locationTypes.filter((type) =>
    LOCATION_TYPE_LABELS[type].toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredJobTypes = jobTypes.filter((type) =>
    JOB_TYPE_LABELS[type].toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredExperienceLevels = experienceLevels.filter((level) =>
    EXPERIENCE_LEVEL_LABELS[level].toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredPostedWithinOptions = postedWithinOptions.filter((option) =>
    POSTED_WITHIN_LABELS[option].toLowerCase().includes(searchValue.toLowerCase())
  );

  const showSalaryRange = searchValue === "" || "salary".includes(searchValue.toLowerCase());

  const hasResults =
    filteredLocationTypes.length > 0 ||
    filteredJobTypes.length > 0 ||
    filteredExperienceLevels.length > 0 ||
    filteredPostedWithinOptions.length > 0 ||
    showSalaryRange;

  return (
    <Combobox>
      <ComboboxPrimitive.Trigger
        render={
          <Button
            variant="outline"
            size="default"
            className="gap-2 border-border hover:bg-accent"
          />
        }
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {[
              filters.locationType.length,
              filters.jobType.length,
              filters.experienceLevel.length,
              filters.postedWithin !== "all" ? 1 : 0,
              filters.salaryRange.min !== 0 || filters.salaryRange.max !== 500000
                ? 1
                : 0,
            ]
              .filter((count) => count > 0)
              .reduce((a, b) => a + b, 0)}
          </span>
        )}
      </ComboboxPrimitive.Trigger>

      <ComboboxContent className="w-[400px]">
        <ComboboxInput
          placeholder="Search filters..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ComboboxList>
          <ComboboxEmpty>No filters found</ComboboxEmpty>

          {!hasResults && <ComboboxEmpty>No filters found</ComboboxEmpty>}

          {/* Location Type */}
          {filteredLocationTypes.length > 0 && (
            <ComboboxGroup>
              <ComboboxLabel>Location Type</ComboboxLabel>
              {filteredLocationTypes.map((type) => (
                <ComboboxItem
                  key={type}
                  value={`location-${type}`}
                  onSelect={() => toggleLocationType(type)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={`h-4 w-4 border border-border flex items-center justify-center ${
                        filters.locationType.includes(type) ? "bg-primary" : ""
                      }`}
                    >
                      {filters.locationType.includes(type) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span>{LOCATION_TYPE_LABELS[type]}</span>
                  </div>
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}

          {/* Job Type */}
          {filteredJobTypes.length > 0 && (
            <ComboboxGroup>
              <ComboboxLabel>Job Type</ComboboxLabel>
              {filteredJobTypes.map((type) => (
                <ComboboxItem
                  key={type}
                  value={`jobtype-${type}`}
                  onSelect={() => toggleJobType(type)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={`h-4 w-4 border border-border flex items-center justify-center ${
                        filters.jobType.includes(type) ? "bg-primary" : ""
                      }`}
                    >
                      {filters.jobType.includes(type) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span>{JOB_TYPE_LABELS[type]}</span>
                  </div>
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}

          {/* Experience Level */}
          {filteredExperienceLevels.length > 0 && (
            <ComboboxGroup>
              <ComboboxLabel>Experience Level</ComboboxLabel>
              {filteredExperienceLevels.map((level) => (
                <ComboboxItem
                  key={level}
                  value={`experience-${level}`}
                  onSelect={() => toggleExperienceLevel(level)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={`h-4 w-4 border border-border flex items-center justify-center ${
                        filters.experienceLevel.includes(level) ? "bg-primary" : ""
                      }`}
                    >
                      {filters.experienceLevel.includes(level) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span>{EXPERIENCE_LEVEL_LABELS[level]}</span>
                  </div>
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}

          {/* Posted Within */}
          {filteredPostedWithinOptions.length > 0 && (
            <ComboboxGroup>
              <ComboboxLabel>Posted Within</ComboboxLabel>
              {filteredPostedWithinOptions.map((option) => (
                <ComboboxItem
                  key={option}
                  value={`posted-${option}`}
                  onSelect={() => handlePostedWithinChange(option)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={`h-4 w-4 rounded-full border border-border flex items-center justify-center ${
                        filters.postedWithin === option ? "border-4 border-primary" : ""
                      }`}
                    />
                    <span>{POSTED_WITHIN_LABELS[option]}</span>
                  </div>
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}

          {/* Salary Range */}
          {showSalaryRange && (
            <div className="p-2">
              <Separator className="mb-3" />
              <Label className="text-sm font-semibold text-foreground mb-2 block">
                Salary Range
              </Label>
              <div className="space-y-3 px-2">
                <div className="text-sm text-muted-foreground">
                  {formatSalary(filters.salaryRange.min, filters.salaryRange.max, "USD")}
                </div>
                <Slider
                  value={[filters.salaryRange.min, filters.salaryRange.max]}
                  onValueChange={handleSalaryRangeChange}
                  min={0}
                  max={500000}
                  step={10000}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
