import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ApplicationFormSchemaData } from "@/utils/validators";

export function ExperienceStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormSchemaData>();

  const fieldErrors = errors.experience;
  const resumeFileName = watch("experience.resumeFileName");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = () => {
    // Mock file upload - just set a filename
    const mockFileName = "resume_john_doe.pdf";
    setValue("experience.resumeFileName", mockFileName);
  };

  const handleRemoveFile = () => {
    setValue("experience.resumeFileName", "");
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="currentRole">
          Current Role / Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="currentRole"
          placeholder="Senior Frontend Engineer"
          {...register("experience.currentRole")}
          aria-invalid={!!fieldErrors?.currentRole}
          className="mt-1.5"
        />
        {fieldErrors?.currentRole && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.currentRole.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="yearsOfExperience">
          Years of Experience <span className="text-destructive">*</span>
        </Label>
        <Input
          id="yearsOfExperience"
          type="number"
          min={0}
          max={50}
          placeholder="5"
          {...register("experience.yearsOfExperience", {
            valueAsNumber: true,
          })}
          aria-invalid={!!fieldErrors?.yearsOfExperience}
          className="mt-1.5"
        />
        {fieldErrors?.yearsOfExperience && (
          <p className="text-destructive text-sm mt-1">
            {fieldErrors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <div>
        <Label>Resume (optional)</Label>
        {resumeFileName ? (
          <div className="mt-1.5 flex items-center gap-3 p-3 bg-muted/50 border border-border">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm text-foreground flex-1 truncate">
              {resumeFileName}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="h-7 w-7 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`
              mt-1.5 border-2 border-dashed p-6 text-center cursor-pointer transition-colors
              ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }
            `}
            onClick={handleFileSelect}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileSelect();
            }}
          >
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, DOC, DOCX (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
