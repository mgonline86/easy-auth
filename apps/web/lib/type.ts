import { z } from "zod";

export type FormState =
  | {
      inputs?: Record<string, FormDataEntryValue | null>;
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(8, {
      message: " be at least 8 characters",
    })
    .regex(/[A-Za-z]/, " contain at least one letter")
    .regex(/[0-9]/, " contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, " contain at least one special character"),
});

export const LoginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1, {
    message: "Password field must not be empty!",
  }),
});
