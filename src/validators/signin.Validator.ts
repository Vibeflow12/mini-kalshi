import z from 'zod';

export const signinSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(3).max(10),
});

export type SigninBody = z.infer<typeof signinSchema>;
