import z from "zod";

export const signUpFormSchema = z.object({
  username: z
    .string()
    .min(5, "username must be at least 5 characters.")
    .max(12, "username must be at most 12 characters."),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
