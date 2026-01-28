import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationFormSchemaData } from "@/utils/validators";

export function AdditionalInfoStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormSchemaData>();

  const fieldErrors = errors.additionalInfo;
  const coverLetter = watch("additionalInfo.coverLetter") || "";
  const whyInterested = watch("additionalInfo.whyInterested") || "";

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="coverLetter">
            Cover Letter <span className="text-destructive">*</span>
          </Label>
          <span className="text-xs text-muted-foreground">
            {coverLetter.length}/2000
          </span>
        </div>
        <Textarea
          id="coverLetter"
          placeholder="Tell us why you're a great fit for this role..."
          rows={5}
          maxLength={2000}
          {...register("additionalInfo.coverLetter")}
          aria-invalid={!!fieldErrors?.coverLetter}
          className="mt-1.5"
        />
        {fieldErrors?.coverLetter && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.coverLetter.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="whyInterested">
            Why are you interested? <span className="text-destructive">*</span>
          </Label>
          <span className="text-xs text-muted-foreground">
            {whyInterested.length}/1000
          </span>
        </div>
        <Textarea
          id="whyInterested"
          placeholder="What excites you about this position and company?"
          rows={3}
          maxLength={1000}
          {...register("additionalInfo.whyInterested")}
          aria-invalid={!!fieldErrors?.whyInterested}
          className="mt-1.5"
        />
        {fieldErrors?.whyInterested && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.whyInterested.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="salaryExpectation">
          Salary Expectation (USD) <span className="text-destructive">*</span>
        </Label>
        <Input
          id="salaryExpectation"
          type="number"
          min={1000}
          max={1000000}
          placeholder="150000"
          {...register("additionalInfo.salaryExpectation", {
            valueAsNumber: true,
          })}
          aria-invalid={!!fieldErrors?.salaryExpectation}
          className="mt-1.5"
        />
        {fieldErrors?.salaryExpectation && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.salaryExpectation.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="availableStartDate">
          Available Start Date <span className="text-destructive">*</span>
        </Label>
        <Input
          id="availableStartDate"
          type="date"
          {...register("additionalInfo.availableStartDate")}
          aria-invalid={!!fieldErrors?.availableStartDate}
          className="mt-1.5"
        />
        {fieldErrors?.availableStartDate && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.availableStartDate.message}
          </p>
        )}
      </div>
    </div>
  );
}
