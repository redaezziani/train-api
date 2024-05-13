import express from "express";
import { getTrips, getTrip, createTrip,updateTrip, deleteTrip ,startTrip} from "../controllers/trip";
import { isAuthenticated, isAdmin } from "../middlewares/auth";
const tripRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: Trip endpoints
 */

/**
 * @swagger
 * /api/trip/trips:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve a list of all trips
 *     tags: [Trip]
 *     responses:
 *       '200':
 *         description: List of trips
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
 *                     trips:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Trip'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/trip/{id}:
 *   get:
 *     summary: Get a trip by ID
 *     description: Retrieve a trip by its ID
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       '200':
 *         description: Trip found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/trip:
 *   post:
 *     summary: Create a new trip
 *     description: Create a new trip with trainId, departureDate, arrivalDate, from, and to
 *     tags: [Trip]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTripInput'
 *     responses:
 *       '201':
 *         description: Trip created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Train not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/trip/{id}:
 *   put:
 *     summary: Update a trip
 *     description: Update an existing trip by its ID
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTripInput'
 *     responses:
 *       '200':
 *         description: Trip updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/trip/{id}:
 *   delete:
 *     summary: Delete a trip
 *     description: Delete a trip by its ID
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       '200':
 *         description: Trip deleted
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         trainId:
 *           type: string
 *         departureDate:
 *           type: string
 *           format: date-time
 *         arrivalDate:
 *           type: string
 *           format: date-time
 *         from:
 *           type: string
 *         to:
 *           type: string
 *       required:
 *         - id
 *         - trainId
 *         - departureDate
 *         - arrivalDate
 *         - from
 *         - to
 *     CreateTripInput:
 *       type: object
 *       properties:
 *         trainId:
 *           type: string
 *         departureDate:
 *           type: string
 *           format: date-time
 *         arrivalDate:
 *           type: string
 *           format: date-time
 *         from:
 *           type: string
 *         to:
 *           type: string
 *       required:
 *         - trainId
 *         - departureDate
 *         - arrivalDate
 *         - from
 *         - to
 *     UpdateTripInput:
 *       type: object
 *       properties:
 *         trainId:
 *           type: string
 *         departureDate:
 *           type: string
 *           format: date-time
 *         arrivalDate:
 *           type: string
 *           format: date-time
 *         from:
 *           type: string
 *         to:
 *           type: string
 *       required: []
 */
tripRouter.use(isAuthenticated);
tripRouter.get("/trips", getTrips);
tripRouter.get("/:id", getTrip);
tripRouter.post("/",  isAdmin, createTrip);
tripRouter.put("/:id", isAdmin, updateTrip);
tripRouter.delete("/:id", isAdmin, deleteTrip);    
tripRouter.put("/start/:id", isAdmin, startTrip);
export default tripRouter;
