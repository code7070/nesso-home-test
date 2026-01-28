import { SlidersHorizontal, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { JobFilters, PostedWithin } from "@/types/filters";
import type { LocationType, JobType, ExperienceLevel } from "@/types/job";
import {
  LOCATION_TYPE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "@/types/job";
import { POSTED_WITHIN_LABELS } from "@/types/filters";
import { formatSalary } from "@/utils/formatters";

interface MobileFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: JobFilters;
  onFiltersChange: (filters: Partial<JobFilters>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function MobileFilterDrawer({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onReset,
  hasActiveFilters,
}: MobileFilterDrawerProps) {
  const locationTypes: LocationType[] = ["remote", "hybrid", "onsite"];
  const jobTypes: JobType[] = ["full-time", "part-time", "contract", "freelance"];
  const experienceLevels: ExperienceLevel[] = ["entry", "mid", "senior"];
  const postedWithinOptions: PostedWithin[] = ["24h", "week", "month", "all"];

  const toggleLocationType = (type: LocationType) => {
    const newTypes = filters.locationType.includes(type)
      ? filters.locationType.filter((t) => t !== type)
      : [...filters.locationType, type];
    onFiltersChange({ locationType: newTypes });
  };

  const toggleJobType = (type: JobType) => {
    const newTypes = filters.jobType.includes(type)
      ? filters.jobType.filter((t) => t !== type)
      : [...filters.jobType, type];
    onFiltersChange({ jobType: newTypes });
  };

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    const newLevels = filters.experienceLevel.includes(level)
      ? filters.experienceLevel.filter((l) => l !== level)
      : [...filters.experienceLevel, level];
    onFiltersChange({ experienceLevel: newLevels });
  };

  const activeFilterCount = [
    filters.locationType.length,
    filters.jobType.length,
    filters.experienceLevel.length,
    filters.postedWithin !== "all" ? 1 : 0,
    filters.salaryRange.min !== 0 || filters.salaryRange.max !== 500000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Mobile Trigger Button - only visible on mobile */}
      <Button
        variant="outline"
        size="default"
        className="gap-2 border-border hover:bg-accent sm:hidden"
        onClick={() => onOpenChange(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-full sm:max-w-sm p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Refine your job search</SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-6">
              {/* Location Type */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-3 block">
                  Location Type
                </Label>
                <div className="space-y-2">
                  {locationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleLocationType(type)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-accent transition-colors text-left"
                    >
                      <div
                        className={`h-5 w-5 border border-border flex items-center justify-center ${
                          filters.locationType.includes(type)
                            ? "bg-primary border-primary"
                            : ""
                        }`}
                      >
                        {filters.locationType.includes(type) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm">
                        {LOCATION_TYPE_LABELS[type]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Job Type */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-3 block">
                  Job Type
                </Label>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleJobType(type)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-accent transition-colors text-left"
                    >
                      <div
                        className={`h-5 w-5 border border-border flex items-center justify-center ${
                          filters.jobType.includes(type)
                            ? "bg-primary border-primary"
                            : ""
                        }`}
                      >
                        {filters.jobType.includes(type) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm">{JOB_TYPE_LABELS[type]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Experience Level */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-3 block">
                  Experience Level
                </Label>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleExperienceLevel(level)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-accent transition-colors text-left"
                    >
                      <div
                        className={`h-5 w-5 border border-border flex items-center justify-center ${
                          filters.experienceLevel.includes(level)
                            ? "bg-primary border-primary"
                            : ""
                        }`}
                      >
                        {filters.experienceLevel.includes(level) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm">
                        {EXPERIENCE_LEVEL_LABELS[level]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Posted Within */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-3 block">
                  Posted Within
                </Label>
                <div className="space-y-2">
                  {postedWithinOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        onFiltersChange({ postedWithin: option })
                      }
                      className="flex items-center gap-3 w-full p-2 hover:bg-accent transition-colors text-left"
                    >
                      <div
                        className={`h-5 w-5 rounded-full border border-border flex items-center justify-center ${
                          filters.postedWithin === option
                            ? "border-4 border-primary"
                            : ""
                        }`}
                      />
                      <span className="text-sm">
                        {POSTED_WITHIN_LABELS[option]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Salary Range */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-3 block">
                  Salary Range
                </Label>
                <div className="space-y-3 px-1">
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
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="border-t border-border">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onReset}
                className="flex-1 gap-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            )}
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Show Results
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
