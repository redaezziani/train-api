
import  z from "zod";


export const createUserSchema = z.object({
    email: z.string({
        message: "please enter a valid email",
    }),
    name: z.string().optional(),
    password: z.string({
        message: "please enter a valid password",
    }),
    role: z.enum(["user", "admin"]).default("user"),
    profile: z.string().optional(),
    isVerified: z.boolean().default(false),
});

export const updateUserSchema = z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(["user", "admin"]).optional(),
    profile: z.string().optional(),
    isVerified: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;