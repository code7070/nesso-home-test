import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Job } from "@/types";
import type { ApplicationStep } from "@/types/application";
import { APPLICATION_STEPS } from "@/types/application";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepIndicator } from "./StepIndicator";
import { FormNavigation } from "./FormNavigation";
import { SuccessScreen } from "./SuccessScreen";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { AdditionalInfoStep } from "./steps/AdditionalInfoStep";
import { ReviewStep } from "./steps/ReviewStep";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import {
  applicationFormSchema,
  personalInfoSchema,
  experienceSchema,
  additionalInfoSchema,
  type ApplicationFormSchemaData,
} from "@/utils/validators";

interface ApplicationWizardProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}

export function ApplicationWizard({
  job,
  open,
  onClose,
}: ApplicationWizardProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    currentStep,
    goToStep,
    goNext,
    goBack,
    isFirstStep,
    isReviewStep,
  } = useMultiStepForm();

  const methods = useForm<ApplicationFormSchemaData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        portfolio: "",
      },
      experience: {
        currentRole: "",
        yearsOfExperience: 0,
        resumeFileName: "",
      },
      additionalInfo: {
        coverLetter: "",
        whyInterested: "",
        salaryExpectation: 0,
        availableStartDate: "",
      },
    },
    mode: "onTouched",
  });

  // Validate current step before proceeding
  const validateCurrentStep = async (): Promise<boolean> => {
    const values = methods.getValues();

    try {
      switch (currentStep) {
        case 1:
          await personalInfoSchema.parseAsync(values.personalInfo);
          return true;
        case 2:
          await experienceSchema.parseAsync(values.experience);
          return true;
        case 3:
          await additionalInfoSchema.parseAsync(values.additionalInfo);
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    } catch {
      // Trigger react-hook-form validation to show errors
      switch (currentStep) {
        case 1:
          await methods.trigger([
            "personalInfo.fullName",
            "personalInfo.email",
            "personalInfo.phone",
            "personalInfo.location",
            "personalInfo.linkedIn",
            "personalInfo.portfolio",
          ]);
          break;
        case 2:
          await methods.trigger([
            "experience.currentRole",
            "experience.yearsOfExperience",
          ]);
          break;
        case 3:
          await methods.trigger([
            "additionalInfo.coverLetter",
            "additionalInfo.whyInterested",
            "additionalInfo.salaryExpectation",
            "additionalInfo.availableStartDate",
          ]);
          break;
      }
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      goNext();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const values = methods.getValues();

    // Mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Application submitted:", {
      job: { id: job.id, title: job.title, company: job.company },
      formData: values,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    methods.reset();
    setIsSubmitted(false);
    goToStep(1);
    onClose();
  };

  const handleEditStep = (step: ApplicationStep) => {
    goToStep(step);
  };

  const stepConfig = APPLICATION_STEPS.find((s) => s.step === currentStep);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] p-0 rounded-none sm:rounded-none gap-0">
        {isSubmitted ? (
          <div className="p-6">
            <SuccessScreen
              jobTitle={job.title}
              company={job.company}
              onClose={handleClose}
            />
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-lg font-bold text-foreground">
                Apply for {job.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {job.company} &middot; {stepConfig?.description}
              </DialogDescription>

              {/* Step Indicator */}
              <div className="pt-4">
                <StepIndicator currentStep={currentStep} />
              </div>
            </DialogHeader>

            <ScrollArea className="max-h-[calc(90vh-280px)]">
              <div className="px-6 py-2">
                <FormProvider {...methods}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    {currentStep === 1 && <PersonalInfoStep />}
                    {currentStep === 2 && <ExperienceStep />}
                    {currentStep === 3 && <AdditionalInfoStep />}
                    {currentStep === 4 && (
                      <ReviewStep onEditStep={handleEditStep} />
                    )}
                  </form>
                </FormProvider>
              </div>
            </ScrollArea>

            <div className="px-6 pb-6">
              <FormNavigation
                isFirstStep={isFirstStep}
                isReviewStep={isReviewStep}
                onBack={goBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
