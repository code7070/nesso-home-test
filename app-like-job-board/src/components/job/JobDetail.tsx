import {
  MapPin,
  Briefcase,
  TrendingUp,
  Bookmark,
  Calendar,
  CheckCircle2,
  Gift,
  Send,
} from "lucide-react";
import type { Job } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

interface JobDetailProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onBookmark?: (jobId: string) => void;
  isBookmarked?: boolean;
  onApply?: (job: Job) => void;
}

export function JobDetail({
  job,
  open,
  onClose,
  onBookmark,
  isBookmarked = false,
  onApply,
}: JobDetailProps) {
  if (!job) return null;

  const handleBookmarkClick = () => {
    onBookmark?.(job.id);
  };

  const handleApply = () => {
    onApply?.(job);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 rounded-none sm:rounded-none gap-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Company Logo */}
              <div className="w-14 h-14 bg-muted border border-border flex items-center justify-center flex-shrink-0">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-base font-semibold text-muted-foreground">
                    {getInitials(job.company)}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <DialogDescription className="text-sm font-medium text-muted-foreground mb-1">
                  {job.company}
                </DialogDescription>
                <DialogTitle className="text-xl font-bold text-foreground leading-tight">
                  {job.title}
                </DialogTitle>
              </div>
            </div>

            {/* Bookmark Button - positioned before the close button */}
            {onBookmark && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmarkClick}
                className="flex-shrink-0 h-9 w-9 p-0 mr-6"
              >
                <Bookmark
                  className={`h-5 w-5 ${
                    isBookmarked
                      ? "fill-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                />
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)]">
          <div className="px-6 py-4 space-y-6">
            {/* Job Meta Info */}
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className="gap-1.5 py-1 px-3 text-sm"
              >
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </Badge>
              <Badge
                variant="outline"
                className="gap-1.5 py-1 px-3 text-sm"
              >
                {LOCATION_TYPE_LABELS[job.locationType]}
              </Badge>
              <Badge
                variant="outline"
                className="gap-1.5 py-1 px-3 text-sm"
              >
                <Briefcase className="h-3.5 w-3.5" />
                {JOB_TYPE_LABELS[job.jobType]}
              </Badge>
              <Badge
                variant="outline"
                className="gap-1.5 py-1 px-3 text-sm"
              >
                <TrendingUp className="h-3.5 w-3.5" />
                {EXPERIENCE_LEVEL_LABELS[job.experienceLevel]}
              </Badge>
            </div>

            {/* Salary */}
            <div className="p-4 bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground mb-1">
                Salary Range
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatSalary(
                  job.salary.min,
                  job.salary.max,
                  job.salary.currency
                )}
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                About the Role
              </h3>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </div>

            <Separator />

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Gift className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <Separator />

            {/* Tags */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Skills & Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Posted Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Posted {formatRelativeDate(job.postedDate)}</span>
            </div>
          </div>
        </ScrollArea>

        {/* Footer with Apply Button */}
        <div className="p-6 pt-4 border-t border-border flex items-center gap-3">
          <Button
            onClick={handleApply}
            className="flex-1 gap-2"
            size="lg"
          >
            <Send className="h-4 w-4" />
            Apply Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleBookmarkClick}
            className="gap-2"
          >
            <Bookmark
              className={`h-4 w-4 ${
                isBookmarked ? "fill-primary text-primary" : ""
              }`}
            />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
