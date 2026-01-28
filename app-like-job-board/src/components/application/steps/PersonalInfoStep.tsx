import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ApplicationFormSchemaData } from "@/utils/validators";

export function PersonalInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ApplicationFormSchemaData>();

  const fieldErrors = errors.personalInfo;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          {...register("personalInfo.fullName")}
          aria-invalid={!!fieldErrors?.fullName}
          className="mt-1.5"
        />
        {fieldErrors?.fullName && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("personalInfo.email")}
          aria-invalid={!!fieldErrors?.email}
          className="mt-1.5"
        />
        {fieldErrors?.email && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          {...register("personalInfo.phone")}
          aria-invalid={!!fieldErrors?.phone}
          className="mt-1.5"
        />
        {fieldErrors?.phone && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.phone.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="location">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          placeholder="San Francisco, CA"
          {...register("personalInfo.location")}
          aria-invalid={!!fieldErrors?.location}
          className="mt-1.5"
        />
        {fieldErrors?.location && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.location.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
        <Input
          id="linkedIn"
          type="url"
          placeholder="https://linkedin.com/in/johndoe"
          {...register("personalInfo.linkedIn")}
          aria-invalid={!!fieldErrors?.linkedIn}
          className="mt-1.5"
        />
        {fieldErrors?.linkedIn && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.linkedIn.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="portfolio">Portfolio / Website</Label>
        <Input
          id="portfolio"
          type="url"
          placeholder="https://johndoe.dev"
          {...register("personalInfo.portfolio")}
          aria-invalid={!!fieldErrors?.portfolio}
          className="mt-1.5"
        />
        {fieldErrors?.portfolio && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.portfolio.message}
          </p>
        )}
      </div>
    </div>
  );
}
