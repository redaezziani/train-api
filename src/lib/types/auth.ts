import z from 'zod';

export const registerSchema = z.object({
  name : z.string().min(3).max(100,{
    message: 'name must be atleast 3 characters long',
  }),
  email: z.string().email({
    message: 'give a valid email address please', 
  }),
  password: z.string().min(6).max(100,{
    message: 'password must be atleast 6 characters long',
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({
    message: 'give a valid email address please',
  }),
  password: z.string().min(6).max(100,{
    message: 'password must be atleast 6 characters long',
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;