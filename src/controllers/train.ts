import { Request,Response } from "express";
import db from "../db";
import { CreateTrainInput, UpdateTrainInput, createTrainSchema, updateTrainSchema } from "../lib/types/train";


export async function getTrains(req: Request, res: Response) {
    try {
        const trains = await db.train.findMany();
        if (!trains) {
            res.status(404).json({ message: "No trains found" });
        }
        res.status(200).json({
            status: "success",
            message: "Trains found",
            data: {
                trains,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getTrain(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const train = await db.train.findUnique({
            where: {
                id,
            },
            include: {
                line: true,
                cars: true,
            },
        });
        if (!train) {
            res.status(404).json({
                status: "error",
                message: "Train not found",
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Train found",
                data: {
                    train,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createTrain(req: Request, res: Response) {
    try {
        const { name, status, seatCount, lineId } = req.body as CreateTrainInput;
        const result = createTrainSchema.safeParse({
            name,
            status,
            seatCount,
            lineId,
        });
        if (!result.success) {
            res.status(400).json({
                status: "error",
                message: "Invalid input",
                errors: result.error.errors[0].message,
            });
        }
      else{
        const line = await db.line.findUnique({
            where: {
                id: lineId,
            },
        });
        if (!line) {
            res.status(404).json({
                status: "error",
                message: "Line not found",
            });
        }
        const train = await db.train.create({
            data: {
                name,
                status,
                seatCount,
                lineId,
            },
        });
        res.status(201).json({
            status: "success",
            message: "Train created",
            data: {
                train,
            },
        });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateTrain(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name, status, seatCount, lineId } = req.body as UpdateTrainInput;
        const result = updateTrainSchema.safeParse({
            name,
            status,
            seatCount,
            lineId,
        });
        if (!result.success) {
            res.status(400).json({
                status: "error",
                message: "Invalid input",
                errors: result.error,
            });
        }
        const train = await db.train.update({
            where: {
                id,
            },
            data: {
                name,
                status,
                seatCount,
                lineId,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Train updated",
            data: {
                train,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteTrain(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const train = await db.train.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Train deleted",
            data: {
                train,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


