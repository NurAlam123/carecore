import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(phoneRegex, {
      message: "Invalid phone number",
    }),
    birth_date: z.coerce.date(),
    gender: z.enum(["Male", "Female", "Other"]),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(500, "Address must be at most 500 characters"),
    occupation: z
      .string()
      .min(2, "Occupation must be at least 2 characters")
      .max(500, "Occupation must be at most 500 characters"),
    emergency_contact_name: z
      .string()
      .min(2, "Contact name must be at least 2 characters")
      .max(50, "Contact name must be at most 50 characters"),
    emergency_contact_number: z.string().regex(phoneRegex, {
      message: "Invalid phone number",
    }),
    primary_physician: z.string().min(2, "Select at least one doctor"),
    insurance_provider: z
      .string()
      .min(2, "Insurance name must be at least 2 characters")
      .max(50, "Insurance name must be at most 50 characters"),
    insurance_policy_number: z
      .string()
      .min(2, "Policy number must be at least 2 characters")
      .max(50, "Policy number must be at most 50 characters"),
    allergies: z.string().optional(),
    current_medication: z.string().optional(),
    family_medical_history: z.string().optional(),
    past_medical_history: z.string().optional(),
    identification_type: z.string().optional(),
    identification_number: z.string().optional(),
    identification_document: z.custom<File[]>().optional(),
    treatment_consent: z.boolean().refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
    disclosure_consent: z.boolean().refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
    privacy_consent: z.boolean().refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.phone === data.emergency_contact_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Your phone number and emergency contact number can't be the same.",
        path: ["emergency_contact_number"],
      });
    }
  });

export type RegisterFieldValues = z.infer<typeof RegisterFormSchema>;
