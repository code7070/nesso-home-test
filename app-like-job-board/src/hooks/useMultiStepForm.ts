import { useState, useCallback } from "react";
import type { ApplicationStep } from "@/types/application";

interface UseMultiStepFormReturn {
  currentStep: ApplicationStep;
  goToStep: (step: ApplicationStep) => void;
  goNext: () => void;
  goBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isReviewStep: boolean;
}

const TOTAL_STEPS = 4;

export function useMultiStepForm(
  initialStep: ApplicationStep = 1
): UseMultiStepFormReturn {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(initialStep);

  const goToStep = useCallback((step: ApplicationStep) => {
    setCurrentStep(step);
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      return (next <= TOTAL_STEPS ? next : prev) as ApplicationStep;
    });
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev - 1;
      return (next >= 1 ? next : prev) as ApplicationStep;
    });
  }, []);

  return {
    currentStep,
    goToStep,
    goNext,
    goBack,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === TOTAL_STEPS,
    isReviewStep: currentStep === 4,
  };
}
