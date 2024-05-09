import { Request,Response } from "express";
import db from "../db";
import z from "zod";

/*

enum CarType {
  first_class
  second_class
}

// عربات القطار
model Car {
   id        String    @id @default(uuid()) @db.VarChar(36)
  train     Train     @relation(fields: [trainId], references: [id],onDelete: Cascade)
  trainId   String
  type      CarType
  seatCount Int
  tickets   Ticket[]
  Seat      Seat[]
}
*/

const createCarSchema = z.object({
    trainId: z.string(),
    type: z.enum(["first_class", "second_class"]),
    seatCount: z.number(),
});

const updateCarSchema = z.object({
    trainId: z.string(),
    type: z.enum(["first_class", "second_class"]),
    seatCount: z.number(),
});

type CreateCarInput = {
    trainId: string;
    type: "first_class" | "second_class";
    seatCount: number;
};

type UpdateCarInput = {
    trainId: string;
    type: "first_class" | "second_class";
    seatCount: number;
};

export async function getCars(req: Request, res: Response) {
    try {
        const cars = await db.car.findMany();
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

export async function createCar(req: Request, res: Response) {
    try {
        const { trainId, type, seatCount } = req.body as CreateCarInput;
        const result = createCarSchema.safeParse({
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

