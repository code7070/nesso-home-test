// Application form types

// Step 1: Personal Info
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
}

// Step 2: Experience
export interface Experience {
  currentRole: string;
  yearsOfExperience: number;
  resumeFileName?: string; // Mock file upload - store filename only
}

// Step 3: Additional Info
export interface AdditionalInfo {
  coverLetter: string;
  whyInterested: string;
  salaryExpectation: number;
  availableStartDate: string; // ISO date string
}

// Complete form data
export interface ApplicationFormData {
  personalInfo: PersonalInfo;
  experience: Experience;
  additionalInfo: AdditionalInfo;
}

// Form step types
export type ApplicationStep = 1 | 2 | 3 | 4; // 4 = Review step

export interface StepConfig {
  step: ApplicationStep;
  title: string;
  description: string;
}

export const APPLICATION_STEPS: StepConfig[] = [
  {
    step: 1,
    title: "Personal Info",
    description: "Tell us about yourself",
  },
  {
    step: 2,
    title: "Experience",
    description: "Your professional background",
  },
  {
    step: 3,
    title: "Additional Info",
    description: "A few more details",
  },
  {
    step: 4,
    title: "Review",
    description: "Confirm your application",
  },
];
