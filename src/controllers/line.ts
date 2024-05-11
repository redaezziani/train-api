import db from "../db";
import { Request, Response } from "express";
import { CreateLineInput, UpdateLineInput, createLineSchema, updateLineSchema } from "../lib/types/line";


export async function getLines(req: Request, res: Response) {
    try {
        const lines = await db.line.findMany() ;
        if (!lines) {
            res.status(404).json({ message: "No lines found" });
        }
        res.status(200).json({
            status: "success",
            message : "Lines found",
            data: {
                lines,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }    
}


export async function getLine(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const line = await db.line.findUnique({
            where: {
                id
            },
        });
        if (!line) {
            res.status(404).json({ 
                status : "error",
                message: "Line not found" }
            );
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Line found",
                data: {
                    line,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
/**
    * Create a new line
    * @param req
    * @param res
    * @returns
    * data: {
    *  line: {
    *   id: string,
    *  number: string,
    * origin: string,
    * destination: string,
    * createdAt: Date,
    * updatedAt: Date,
    * }
    * }
    * @throws
    * 400 - Invalid input
    * 404 - Line not found
    * 500 - Internal Server Error
 */

export async function createLine(req: Request, res: Response) {
    try {
        const { number, origin, destination } = req.body as CreateLineInput;
        const result = createLineSchema.safeParse({
            number,
            origin,
            destination,
        });
        if (!result.success) {
            return res.status(400).json({
                error: result.error.errors[0].message,
                status: "error",
            });
        }
        // check if the number is already in use
        const existingLine = await db.line.findFirst({
            where: {
                number
            }
        });
        if (existingLine) {
            return res.status(400).json({
                status: "error",
                message: "Line number already in use try another one",
            });
        }
        const line = await db.line.create({
            data: {
                number,
                origin,
                destination,
            },
        });
        res.status(201).json({
            status: "success",
            message: "Line created",
            data: {
                line,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateLine(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { number, origin, destination } = req.body as UpdateLineInput;
        const result = updateLineSchema.safeParse({
            number,
            origin,
            destination,
        });
        if (!result.success) {
            return res.status(400).json({
                error: result.error.errors[0].message,
                status: "error",
            });
        }
        const line = await db.line.update({
            where: {
                id
            },
            data: {
                number,
                origin,
                destination,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Line updated",
            data: {
                line,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteLine(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const line = await db.line.delete({
            where: {
                id
            },
        });
        res.status(200).json({
            status: "success",
            message: "Line deleted",
            data: {
                line,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

