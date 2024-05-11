import { Request,Response } from "express";
import db from "../db";
import z from "zod";

/*

enum CarType {
  first_class
  second_class
}
enum CarName {
    A
    B
    C
    D
    E
    F
    G
    H
    I
    J
    K
    L
    M
    N
    O
    P
    Q
    R
    S
    T
    U
    V
    W
    X
    Y
    Z
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
    name: z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]),
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
    name: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
};

type UpdateCarInput = {
    trainId: string;
    type: "first_class" | "second_class";
    seatCount: number;
    name : "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
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

