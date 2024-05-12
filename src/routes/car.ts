import express from 'express';
import {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
} from '../controllers/car';
import { isAdmin, isAuthenticated } from '../middlewares/auth';

const carRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Car
 *   description: Car endpoints
 */

/**
 * @swagger
 * /api/car/cars:
 *   get:
 *     summary: Get all cars
 *     description: Retrieve a list of all cars
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: List of cars
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
 *                     cars:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           trainId:
 *                             type: string
 *                           type:
 *                             type: string
 *                           seatCount:
 *                             type: number
 *       '404':
 *         description: No cars found
 *       '500':
 *         description: Internal Server Error
 */
carRouter.get('/cars', isAuthenticated, getCars);
/**
 * @swagger
 * /api/car/{id}:
 *   get:
 *     summary: Get a car by ID
 *     description: Retrieve a car by its ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       '200':
 *         description: Car found
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
 *                     car:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         trainId:
 *                           type: string
 *                         type:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *       '404':
 *         description: Car not found
 *       '500':
 *         description: Internal Server Error
 */

carRouter.get('/:id', isAuthenticated, getCar);
/**
 * @swagger
 * /api/car:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car with train ID, type, and seat count
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [first_class, second_class]
 *               seatCount:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Car created
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
 *                     car:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         trainId:
 *                           type: string
 *                         type:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Train not found or train is inactive or seat count is less than 0 or seat count is less than car seat count
 *       '500':
 *         description: Internal Server Error
 */

carRouter.post('/', isAdmin, createCar);
/**
 * @swagger
 * /api/car/{id}:
 *   put:
 *     summary: Update a car
 *     description: Update an existing car by its ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [first_class, second_class]
 *               seatCount:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Car updated
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
 *                     car:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         trainId:
 *                           type: string
 *                         type:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 */

carRouter.put('/:id', isAdmin, updateCar);
/**
 * @swagger
 * /api/car/{id}:
 *   delete:
 *     summary: Delete a car
 *     description: Delete a car by its ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       '200':
 *         description: Car deleted
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
 *                     car:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         trainId:
 *                           type: string
 *                         type:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *       '500':
 *         description: Internal Server Error
 */

carRouter.delete('/:id', isAdmin, deleteCar);

export default carRouter;