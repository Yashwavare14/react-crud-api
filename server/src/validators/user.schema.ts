import { z } from 'zod';

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