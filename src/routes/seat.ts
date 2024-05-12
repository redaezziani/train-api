import express from "express";
import { getSeats, getSeat, createSeat, updateSeat, deleteSeat } from "../controllers/seat";
const seatRouter = express.Router();

// Seat Routes
/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: Seat endpoints
 */

/**
 * @swagger
 * /api/seat/seats:
 *   get:
 *     summary: Get all seats
 *     description: Retrieve a list of all seats
 *     tags: [Seat]
 *     responses:
 *       '200':
 *         description: List of seats
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
 *                     seats:
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
 *                           isBooked:
 *                             type: boolean
 *       '404':
 *         description: No seats found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/seat/{id}:
 *   get:
 *     summary: Get a seat by ID
 *     description: Retrieve a seat by its ID
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Seat ID
 *     responses:
 *       '200':
 *         description: Seat found
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
 *                     seat:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         carId:
 *                           type: string
 *                         seatNumber:
 *                           type: number
 *                         isBooked:
 *                           type: boolean
 *       '404':
 *         description: Seat not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/seat:
 *   post:
 *     summary: Create a new seat
 *     description: Create a new seat with carId, seatNumber, and isBooked status
 *     tags: [Seat]
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
 *               isBooked:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Seat created
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
 *                     seat:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         carId:
 *                           type: string
 *                         seatNumber:
 *                           type: number
 *                         isBooked:
 *                           type: boolean
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Car not found or invalid seat number
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/seat/{id}:
 *   put:
 *     summary: Update a seat
 *     description: Update an existing seat by its ID
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Seat ID
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
 *               isBooked:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Seat updated
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
 *                     seat:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         carId:
 *                           type: string
 *                         seatNumber:
 *                           type: number
 *                         isBooked:
 *                           type: boolean
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/seat/{id}:
 *   delete:
 *     summary: Delete a seat
 *     description: Delete a seat by its ID
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Seat ID
 *     responses:
 *       '200':
 *         description: Seat deleted
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
 *         description: Seat not found
 *       '500':
 *         description: Internal Server Error
 */

seatRouter.get('/seats', getSeats);
seatRouter.get('/:id', getSeat);
seatRouter.post('/', createSeat);
seatRouter.put('/:id', updateSeat);
seatRouter.delete('/:id', deleteSeat);

export default seatRouter;