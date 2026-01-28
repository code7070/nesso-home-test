import { Check } from "lucide-react";
import type { ApplicationStep } from "@/types/application";
import { APPLICATION_STEPS } from "@/types/application";

interface StepIndicatorProps {
  currentStep: ApplicationStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {APPLICATION_STEPS.map((stepConfig, index) => {
        const isCompleted = stepConfig.step < currentStep;
        const isCurrent = stepConfig.step === currentStep;
        const isLast = index === APPLICATION_STEPS.length - 1;

        return (
          <div key={stepConfig.step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`
                  w-8 h-8 flex items-center justify-center text-sm font-semibold border-2 transition-colors
                  ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary text-primary bg-background"
                        : "border-border text-muted-foreground bg-background"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  stepConfig.step
                )}
              </div>

              {/* Step Label */}
              <span
                className={`
                  mt-1.5 text-xs font-medium text-center whitespace-nowrap
                  ${isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}
                `}
              >
                {stepConfig.title}
              </span>
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div
                className={`
                  flex-1 h-0.5 mx-2 mt-[-1rem] transition-colors
                  ${isCompleted ? "bg-primary" : "bg-border"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
