import { useFormContext } from "react-hook-form";
import {
  User,
  Briefcase,
  FileText,
  Info,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ApplicationStep } from "@/types/application";
import type { ApplicationFormSchemaData } from "@/utils/validators";
import { formatSalary } from "@/utils/formatters";

interface ReviewStepProps {
  onEditStep: (step: ApplicationStep) => void;
}

export function ReviewStep({ onEditStep }: ReviewStepProps) {
  const { getValues } = useFormContext<ApplicationFormSchemaData>();
  const values = getValues();

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Please review your information before submitting.
      </p>

      {/* Personal Info */}
      <div className="border border-border">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Personal Information
            </h3>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            className="gap-1 h-7 text-xs"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
        </div>
        <div className="p-4 space-y-2 text-sm">
          <ReviewField label="Name" value={values.personalInfo.fullName} />
          <ReviewField label="Email" value={values.personalInfo.email} />
          <ReviewField label="Phone" value={values.personalInfo.phone} />
          <ReviewField label="Location" value={values.personalInfo.location} />
          {values.personalInfo.linkedIn && (
            <ReviewField
              label="LinkedIn"
              value={values.personalInfo.linkedIn}
            />
          )}
          {values.personalInfo.portfolio && (
            <ReviewField
              label="Portfolio"
              value={values.personalInfo.portfolio}
            />
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="border border-border">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Experience
            </h3>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
            className="gap-1 h-7 text-xs"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
        </div>
        <div className="p-4 space-y-2 text-sm">
          <ReviewField
            label="Current Role"
            value={values.experience.currentRole}
          />
          <ReviewField
            label="Years of Experience"
            value={`${values.experience.yearsOfExperience} years`}
          />
          {values.experience.resumeFileName && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Resume:</span>
              <span className="text-foreground">
                {values.experience.resumeFileName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="border border-border">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Additional Information
            </h3>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(3)}
            className="gap-1 h-7 text-xs"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground block mb-1">
              Cover Letter
            </span>
            <p className="text-foreground text-sm whitespace-pre-line line-clamp-4">
              {values.additionalInfo.coverLetter}
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-muted-foreground block mb-1">
              Why Interested
            </span>
            <p className="text-foreground text-sm whitespace-pre-line line-clamp-3">
              {values.additionalInfo.whyInterested}
            </p>
          </div>
          <Separator />
          <ReviewField
            label="Salary Expectation"
            value={formatSalary(
              values.additionalInfo.salaryExpectation,
              values.additionalInfo.salaryExpectation,
              "USD"
            )}
          />
          <ReviewField
            label="Available Start Date"
            value={values.additionalInfo.availableStartDate}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-muted-foreground min-w-[120px]">{label}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
