import express from 'express';
import { getTickets, getTicket, createTicket,updateTicket,deleteTicket } from '../controllers/ticket';
import { isAuthenticated, isAdmin } from '../middlewares/auth';
import fs from 'fs';
import path from 'path';
const ticketRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Ticket endpoints
 */

/**
 * @swagger
 * /api/ticket/tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Retrieve a list of all tickets
 *     tags: [Ticket]
 *     responses:
 *       '200':
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     tickets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           carId:
 *                             type: string
 *                           seatNumber:
 *                             type: number
 *                           price:
 *                             type: number
 *                           passenger:
 *                             type: string
 *                           tripId:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       '404':
 *         description: No tickets found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/ticket/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     description: Retrieve a ticket by its ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ticket ID
 *     responses:
 *       '200':
 *         description: Ticket found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     ticket:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         carId:
 *                           type: string
 *                         seatNumber:
 *                           type: number
 *                         price:
 *                           type: number
 *                         passenger:
 *                           type: string
 *                         tripId:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Create a new ticket
 *     description: Create a new ticket with carId, seatNumber, price, passenger, tripId, and userId
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *               seatNumber:
 *                 type: number
 *               price:
 *                 type: number
 *               passenger:
 *                 type: string
 *               tripId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Ticket created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     ticket:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         carId:
 *                           type: string
 *                         seatNumber:
 *                           type: number
 *                         price:
 *                           type: number
 *                         passenger:
 *                           type: string
 *                         tripId:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Car, trip, or user not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/ticket/{id}:
 *   put:
 *     summary: Update a ticket
 *     description: Update an existing ticket by its ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *               seatNumber:
 *                 type: number
 *               price:
 *                 type: number
 *               passenger:
 *                 type: string
 *               tripId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Ticket updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     ticket:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         carId:
 *                           type: string
 *                         seatNumber:
 *                           type: number
 *                         price:
 *                           type: number
 *                         passenger:
 *                           type: string
 *                         tripId:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/ticket/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     description: Delete a ticket by its ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ticket ID
 *     responses:
 *       '200':
 *         description: Ticket deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: Internal Server Error
 */
const tiketPagePath = path.join(process.cwd(), 'src/pages/tiket.html');
ticketRouter.get("/user-ticket", (req, res) => {
    fs.readFile(tiketPagePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error"
            });
        }
        res.send(data);
    });
}
);
ticketRouter.get("/tickets", getTickets);
ticketRouter.get("/:id", getTicket);
ticketRouter.post("/",  isAuthenticated,createTicket);
ticketRouter.put("/:id", isAdmin, updateTicket);
ticketRouter.delete("/:id", isAdmin, deleteTicket);
export default ticketRouter;