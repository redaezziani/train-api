import { Request,Response } from "express";
import db from "../db";
 import { CreateTripInput, UpdateTripInput , createTripSchema, updateTripSchema} from "../lib/types/trip";


export const getTrips = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const currentPage = Number(page);
        const currentLimit = Number(limit);
        const offset = (currentPage - 1) * currentLimit;
        const trips = await db.trip.findMany({
            include: {
                train: true,
            },
            skip: offset,
            take: currentLimit,
        });
        res.status(200).json({
            status: "success",
            message: "Trips retrieved",
            data: {
                trips,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await db.trip.findUnique({
            where: {
                id,
            },
            include: {
                train: true,
            },
        });
        if (!trip) {
            return res.status(404).json({
                status: "error",
                message: "Trip not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Trip retrieved",
            data: {
                trip,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createTrip = async (req: Request, res: Response) => {
    try {
        const { trainId, departureDate, arrivalDate, from, to } = req.body as CreateTripInput;
        if (!trainId || !departureDate || !arrivalDate || !from || !to) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields",
            });
        }
        const { error } = createTripSchema.safeParse({
            trainId,
            departureDate,
            arrivalDate,
            from,
            to,
        });

        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.message,
            });
        }
        const train = await db.train.findUnique({
            where: {
                id: trainId,
            },
        });

        if (!train) {
            return res.status(404).json({
                status: "error",
                message: "Train not found",
            });
        }

        const trip = await db.trip.create({
            data: {
                trainId,
                departureDate,
                arrivalDate,
                from,
                to,
            },
        });
        if (!trip) {
            return res.status(500).json({
                status: "error",
                message: "Failed to create trip",
            });
        }
      
        res.status(201).json({
            status: "success",
            message: "Trip created",
            data: {
                trip,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { trainId, departureDate, arrivalDate, from, to } = req.body;
        const trip = await db.trip.findUnique({
            where: {
                id,
            },
        });
        if (!trip) {
            return res.status(404).json({
                status: "error",
                message: "Trip not found",
            });
        }
        const updatedTrip = await db.trip.update({
            where: {
                id,
            },
            data: {
                trainId,
                departureDate,
                arrivalDate,
                from,
                to,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Trip updated",
            data: {
                trip: updatedTrip,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await db.trip.findUnique({
            where: {
                id,
            },
        });
        if (!trip) {
            return res.status(404).json({
                status: "error",
                message: "Trip not found",
            });
        }
        await db.trip.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Trip deleted",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

