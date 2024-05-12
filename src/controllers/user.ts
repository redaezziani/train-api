import { Response,Request } from "express";
import db from "../db";
import { 
    CreateUserInput,
    UpdateUserInput,
    createUserSchema,
    updateUserSchema,
 } from "../lib/types/user";

 /*
 
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
 */

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const currentPage = Number(page);
        const currentLimit = Number(limit);
        const offset = (currentPage - 1) * currentLimit;
        const users = await db.users.findMany(

            {
                include: {
                    Ticket: true,
                },
                skip: offset,
                take: currentLimit,
            }
        );

        res.json({
            status: "success",
            message: "Users retrieved",
            data: {
                users,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error" 
    });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await db.users.findUnique({
            where: {
                id,
            },
            include: {
                Ticket: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        res.json({
            status: "success",
            message: "User retrieved",
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password, role, profile, isVerified } = req.body as CreateUserInput;
        const isSafe = createUserSchema.safeParse(
            {
                email,
                name,
                password,
                role,
                profile,
                isVerified,
            }
        );
        if (!isSafe.success) {
            return res.status(400).json({
                status: "error",
                message: isSafe.error.errors[0].message,
            });
        }

        const existingUser = await db.users.findFirst({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }

        const user = await db.users.create({
            data: {
                email,
                name,
                password,
                role,
                profile,
                isVerified,
            },
        });
        res.json({
            status: "success",
            message: "User created",
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, name, password, role, profile, isVerified } = req.body as UpdateUserInput;
        const isSafe = updateUserSchema.safeParse({
            email,
            name,
            password,
            role,
            profile,
            isVerified,
        });
        if (!isSafe.success) {
            return res.status(400).json({
                status: "error",
                message: isSafe.error.errors[0].message,
            });
        }
        const existingUser = await db.users.findFirst({
            where: {
                id,
            },
        });
        if (!existingUser) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const user = await db.users.update({
            where: {
                id,
            },
            data: {
                email,
                name,
                password,
                role,
                profile,
                isVerified,
            },
        });
        res.json({
            status: "success",
            message: "User updated",
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await db.users.delete({
            where: {
                id,
            },
        });
        res.json({
            status: "success",
            message: "User deleted",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}