import z from 'zod';

export const signupSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(3).max(10),
});

export type SignupBody = z.infer<typeof signupSchema>;
