import { Request,Response } from "express";
import db from "../db";
import { CreateCarInput, UpdateCarInput, createCarSchema, updateCarSchema } from "../lib/types/car";

export async function getCars(req: Request, res: Response) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const currentPage = Number(page);
        const currentLimit = Number(limit);
        const offset = (currentPage - 1) * currentLimit;
        const cars = await db.car.findMany({
            include: {
                train: true,
            },
            skip: offset,
            take: currentLimit,
        });
        
        if (!cars) {
            res.status(404).json({ message: "No cars found" });
        }
        res.status(200).json({
            status: "success",
            message: "Cars found",
            data: {
                cars,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getCar(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const car = await db.car.findUnique({
            where: {
                id,
            },
        });
        if (!car) {
            res.status(404).json({
                status: "error",
                message: "Car not found",
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Car found",
                data: {
                    car,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns
 * data: {
 * car: {
 * id: string,
 * trainId: string,
 * type: string,
 * seatCount: number,
 * }
 * }
 * @throws
 * status: "error",
 * message: "Invalid input",
 */
export async function createCar(req: Request, res: Response) {
    try {
        const { trainId, type, seatCount,name } = req.body as CreateCarInput;
        const result = createCarSchema.safeParse({
            trainId,
            type,
            seatCount,
            name,
        });
        if (!result.success) {
            res.status(400).json({
                status: "error",
                message: "Invalid input",
                data: result.error.errors[0].message,
            });
        } else {
            const train = await db.train.findUnique({
                where: {
                    id: trainId,
                },
            });
            if (!train || train.status !== "active" || train.seatCount <= 0 || train.seatCount < seatCount) {
                res.status(404).json({
                    status: "error",
                    message: "Train not found or train is inactive or seat count is less than 0 or seat count is less than car seat count",
                });
            }
            const cars = await db.car.findUnique({
                where: {
                    name: name,
                },
            });
            if (cars) {
                res.status(404).json({
                    status: "error",
                    message: "Car name already exists, please choose another name",
                });
            }
            const car = await db.car.create({
                data: {
                    trainId,
                    type,
                    seatCount,
                },
            });
            res.status(201).json({
                status: "success",
                message: "Car created",
                data: {
                    car,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateCar(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { trainId, type, seatCount } = req.body as UpdateCarInput;
        const result = updateCarSchema.safeParse({
            trainId,
            type,
            seatCount,
        });
        if (!result.success) {
            res.status(400).json({
                status: "error",
                message: "Invalid input",
                data: result.error,
            });
        } else {
            const car = await db.car.update({
                where: {
                    id,
                },
                data: {
                    trainId,
                    type,
                    seatCount,
                },
            });
            res.status(200).json({
                status: "success",
                message: "Car updated",
                data: {
                    car,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteCar(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const car = await db.car.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Car deleted",
            data: {
                car,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

