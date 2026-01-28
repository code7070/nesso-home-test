import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  jobTitle: string;
  company: string;
  onClose: () => void;
}

export function SuccessScreen({
  jobTitle,
  company,
  onClose,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-16 h-16 bg-green-100 border-2 border-green-500 flex items-center justify-center mb-6">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>

      <h2 className="text-xl font-bold text-foreground mb-2">
        Application Submitted!
      </h2>

      <p className="text-sm text-muted-foreground mb-1">
        Your application for
      </p>
      <p className="text-base font-semibold text-foreground mb-1">
        {jobTitle}
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        at {company} has been received.
      </p>

      <p className="text-sm text-muted-foreground mb-8 max-w-sm">
        We'll review your application and get back to you within 5-7 business
        days. Check your email for a confirmation.
      </p>

      <Button onClick={onClose} size="lg">
        Done
      </Button>
    </div>
  );
}
