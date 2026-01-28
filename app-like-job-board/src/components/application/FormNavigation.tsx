import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  isFirstStep: boolean;
  isReviewStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function FormNavigation({
  isFirstStep,
  isReviewStep,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
}: FormNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-border">
      {/* Back Button */}
      {!isFirstStep ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <div />
      )}

      {/* Next / Submit Button */}
      {isReviewStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} className="gap-2">
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
