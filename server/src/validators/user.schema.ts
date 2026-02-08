import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
  }),
  params: z.object({
    id: z.coerce.number().refine(
     (val) => !isNaN(val),
      { message: "User id must be a number" }
    ),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});