import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const UserFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Invalid phone number",
  }),
});

export type UserFieldValues = z.infer<typeof UserFormSchema>;
