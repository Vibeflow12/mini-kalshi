import z from 'zod';

export const signinSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(3).max(10),
});

export const signupSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.email(),
  password: z.string().min(3).max(10),
});

export type SignupBody = z.infer<typeof signupSchema>;
export type SigninBody = z.infer<typeof signinSchema>;

export const authTokenSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'admin']),
  iat: z.number(),
  exp: z.number(),
});
