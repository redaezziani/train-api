import { Response, Request } from "express";
import db from "../db";
import { CreateSeatInput, UpdateSeatInput, createSeatSchema, updateSeatSchema } from "../lib/types/seat";


export async function getSeats(req: Request, res: Response) {
    try {
        const seats = await db.seat.findMany(
            {
                include: {
                    car: true,
                },
            }
        );
        if (!seats) {
            res.status(404).json({ message: "No seats found" });
        }
        res.status(200).json({
            status: "success",
            message: "Seats found",
            data: {
                seats,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSeat(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const seat = await db.seat.findUnique({
            where: {
                id,
            },
            include: {
                car: true,
            },
        });
        if (!seat) {
            res.status(404).json({
                status: "error",
                message: "Seat not found",
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Seat found",
                data: {
                    seat,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createSeat(req: Request, res: Response) {
    try {
        const { carId, seatNumber, isBooked } = req.body as CreateSeatInput;
        const result = createSeatSchema.safeParse({
            carId,
            seatNumber,
            isBooked,
        });
        if (!result.success) {
            res.status(400).json({
                status: "error",
                message: result.error.errors[0].message,
            });
        } else {
            // first get the car to check if it exists
            const car = await db.car.findUnique({
                where: {
                    id: carId,
                },
            });
            if (!car) {
                res.status(404).json({
                    status: "error",
                    message: "Car not found",
                });
                return;
            }

            // check if the seat number is already taken and is gr eater than 0 and less than the seat count
            const seats = await db.seat.findMany({
                where: {
                    carId,
                },
            });
            if (seatNumber < 0 || seatNumber > car.seatCount) {
                res.status(400).json({
                    status: "error",
                    message: "Invalid seat number",
                });
                return;
            }
            const seatExists = seats.find((seat) => seat.seatNumber === seatNumber);
            if (seatExists) {
                res.status(400).json({
                    status: "error",
                    message: "Seat number already taken",
                });
                return;
            }
            const seat = await db.seat.create({
                data: {
                    carId,
                    seatNumber,
                    isBooked,
                },
            });
            res.status(201).json({
                status: "success",
                message: "Seat created",
                data: {
                    seat,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateSeat(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { carId, seatNumber, isBooked } = req.body as UpdateSeatInput;
        const result = updateSeatSchema.safeParse({
            carId,
            seatNumber,
            isBooked,
        });
        if (!result.success) {
            res.status(400).json({
                status: "error",
                message: result.error.errors[0].message,
            });
        } else {
            const seat = await db.seat.update({
                where: {
                    id,
                },
                data: {
                    carId,
                    seatNumber,
                    isBooked,
                },
            });
            res.status(200).json({
                status: "success",
                message: "Seat updated",
                data: {
                    seat,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteSeat(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const seat = await db.seat.delete({
            where: {
                id,
            },
        });
        if (!seat) {
            res.status(404).json({
                status: "error",
                message: "Seat not found",
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Seat deleted",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}




