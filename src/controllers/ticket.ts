import {Request, Response } from 'express';
import db from '../db';
import { CreateTicketInput, UpdateTicketInput, createTicketSchema, updateTicketSchema } from '../lib/types/ticket';
import { createTiketPage } from '../services/create-tiket-page';

export const getTickets = async (req: Request, res: Response): Promise<Response> => {
    try {
        const tickets = await db.ticket.findMany();
        return res.json(tickets);
    } catch (error) {
        return res.json(error);
    }
}

export const getTicket = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const ticket = await db.ticket.findUnique({
            where: {
                id: id
            }
        });
        return res.json(ticket);
    } catch (error) {
        return res.json(error);
    }
}

export const createTicket = async (req: Request, res: Response)=> {
    try {
        const { carId, seatNumber, price, passenger, tripId, userId, seatId } = req.body as CreateTicketInput;
        const value = createTicketSchema.safeParse({ carId, seatNumber, price, passenger, tripId, userId, seatId });
        if (!value.success) {
            return res.status(400).json({
                status: "error",
                message: value.error.errors[0].message,
             });
        }
        // check if the carId exists
        const car = await db.car.findUnique({
            where: {
                id: carId
            }
        });
        if (!car) {
            return res.status(404).json({
                status: "error",
                message: "Car not found"
            });
        }
        // check if the tripId exists
        const trip = await db.trip.findUnique({
            where: {
                id: tripId
            }
        });
        if (!trip) {
            return res.status(404).json({
                status: "error",
                message: "Trip not found"
            });
        }
        if (trip.isStarted){
            return res.status(400).json({
                status: "error",
                message: "Trip has already started, you can't book a ticket"
            });
        }
        const user = await db.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        // check if the seatId exists
        const seat = await db.seat.findFirst({
            where: {
                carId: carId,
                seatNumber: seatNumber
            }
        });
        if (!seat) {
            return res.status(404).json({
                status: "error",
                message: "Seat not found"
            });
        }
        const ticket = await db.ticket.create({
            data: {
                carId,
                seatNumber,
                price,
                passenger,
                tripId,
                userId,
                seatId
            }
        });



        if (!ticket) {
            return res.status(400).json({
                status: "error",
                message: "Unable to create ticket"
            });
        }
        console.log(seatId)
        const updatedSeat = await db.seat.update({
            where: {
                id: seatId,
                carId: carId,
            },
            data: {
                isBooked: true
            }
        });

        if (!updatedSeat) {
            return res.status(400).json({
                status: "error",
                message: "Unable to book seat"
            });
        }


        const tiketPagePath =  createTiketPage(ticket);
        // lets send the user to this page
        res.redirect('/api/ticket/user-ticket');

    } catch (error) {
        return res.json(error);
    }
}

export const updateTicket = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const { carId, seatNumber, price, passenger, tripId, userId, seatId } = req.body as UpdateTicketInput;
        const value = updateTicketSchema.safeParse({ carId, seatNumber, price, passenger, tripId, userId, seatId });
        if (!value.success) {
            return res.status(400).json({
                status: "error",
                message: value.error.errors[0].message,
             });
        }
        const ticket = await db.ticket.findUnique({
            where: {
                id: id
            }
        });
        if (!ticket) {
            return res.status(404).json({
                status: "error",
                message: "Ticket not found"
            });
        }
        const updatedTicket = await db.ticket.update({
            where: {
                id: id
            },
            data: {
                carId,
                seatNumber,
                price,
                passenger,
                tripId,
                userId,
                seatId
            }
        });
        return res.json({
            status: "success",
            data: updatedTicket
        });
    } catch (error) {
        return res.json(error);
    }
}

export const deleteTicket = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const ticket = await db.ticket.findUnique({
            where: {
                id: id
            }
        });
        if (!ticket) {
            return res.status(404).json({
                status: "error",
                message: "Ticket not found"
            });
        }
        await db.ticket.delete({
            where: {
                id: id
            }
        });
        return res.json({
            status: "success",
            message: "Ticket deleted"
        });
    } catch (error) {
        return res.json(error);
    }
}
