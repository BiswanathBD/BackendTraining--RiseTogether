import { z } from "zod";

// register schema
export const registerSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
  age: z.number().int("Age must be a whole number").optional(),
  countryId: z.string("Country ID must be a string").optional(),
});

// login schema
export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
});
