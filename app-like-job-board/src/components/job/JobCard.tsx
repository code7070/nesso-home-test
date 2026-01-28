import { MapPin, Briefcase, TrendingUp, Bookmark } from "lucide-react";
import type { Job } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatSalary,
  formatRelativeDate,
  getInitials,
} from "@/utils/formatters";
import {
  JOB_TYPE_LABELS,
  LOCATION_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "@/types";

interface JobCardProps {
  job: Job;
  onBookmark?: (jobId: string) => void;
  isBookmarked?: boolean;
  onClick?: (job: Job) => void;
}

export function JobCard({
  job,
  onBookmark,
  isBookmarked = false,
  onClick,
}: JobCardProps) {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(job.id);
  };

  const handleCardClick = () => {
    onClick?.(job);
  };

  // Show max 3 tags, rest as "+X more"
  const visibleTags = job.tags.slice(0, 3);
  const remainingTags = job.tags.length - 3;

  return (
    <Card
      className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer rounded-none hover:border-primary hover:shadow-primary"
      onClick={handleCardClick}
    >
      <div className="px-6 space-y-4">
        {/* Header: Company Logo + Name + Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Company Logo or Initials */}
            <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center flex-shrink-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">
                  {getInitials(job.company)}
                </span>
              )}
            </div>

            {/* Company Name + Job Title */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-muted-foreground truncate">
                {job.company}
              </h3>
              <h2 className="text-base font-semibold text-card-foreground line-clamp-2 mt-0.5">
                {job.title}
              </h2>
            </div>
          </div>

          {/* Bookmark Button */}
          {onBookmark && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className="flex-shrink-0 h-8 w-8 p-0"
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isBookmarked
                    ? "fill-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              />
            </Button>
          )}
        </div>

        {/* Location & Type */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{job.location}</span>
          </div>
          <span className="text-border">•</span>
          <span>{LOCATION_TYPE_LABELS[job.locationType]}</span>
        </div>

        {/* Job Type & Experience Level */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            <span>{JOB_TYPE_LABELS[job.jobType]}</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{EXPERIENCE_LEVEL_LABELS[job.experienceLevel]}</span>
          </div>
        </div>

        {/* Salary */}
        <div className="pt-2 border-t border-border">
          <p className="text-base font-semibold text-card-foreground">
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {remainingTags > 0 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{remainingTags} more
            </Badge>
          )}
        </div>

        {/* Posted Date */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Posted {formatRelativeDate(job.postedDate)}
          </p>
        </div>
      </div>
    </Card>
  );
}
