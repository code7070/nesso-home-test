import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^[+]?[\d\s\-().]+$/, "Please enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  linkedIn: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  portfolio: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
});

export const experienceSchema = z.object({
  currentRole: z.string().min(2, "Current role is required"),
  yearsOfExperience: z
    .number({ error: "Please enter a number" })
    .min(0, "Must be 0 or greater")
    .max(50, "Must be 50 or less"),
  resumeFileName: z.string().optional(),
});

export const additionalInfoSchema = z.object({
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters")
    .max(2000, "Cover letter must be under 2000 characters"),
  whyInterested: z
    .string()
    .min(20, "Please provide at least 20 characters")
    .max(1000, "Must be under 1000 characters"),
  salaryExpectation: z
    .number({ error: "Please enter a number" })
    .min(1000, "Salary must be at least $1,000")
    .max(1000000, "Salary must be under $1,000,000"),
  availableStartDate: z.string().min(1, "Start date is required"),
});

export const applicationFormSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: experienceSchema,
  additionalInfo: additionalInfoSchema,
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>;
export type ApplicationFormSchemaData = z.infer<typeof applicationFormSchema>;
