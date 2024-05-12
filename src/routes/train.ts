import express from 'express';
import {
    getTrains,
    getTrain,
    createTrain,
    updateTrain,
    deleteTrain,
} from '../controllers/train';
import { isAdmin, isAuthenticated } from '../middlewares/auth';

const trainRouter = express.Router();

// Train Routes
/**
 * @swagger
 * tags:
 *   name: Train
 *   description: Train endpoints
 */

/**
 * @swagger
 * /api/train/trains:
 *   get:
 *     summary: Get all trains
 *     description: Retrieve a list of all trains
 *     tags: [Train]
 *     responses:
 *       '200':
 *         description: List of trains
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
 *                     trains:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           status:
 *                             type: string
 *                           seatCount:
 *                             type: number
 *                           lineId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       '404':
 *         description: No trains found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/train/{id}:
 *   get:
 *     summary: Get a train by ID
 *     description: Retrieve a train by its ID
 *     tags: [Train]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train ID
 *     responses:
 *       '200':
 *         description: Train found
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
 *                     train:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         status:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *                         lineId:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       '404':
 *         description: Train not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/train:
 *   post:
 *     summary: Create a new train
 *     description: Create a new train with name, status, seatCount, and lineId
 *     tags: [Train]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               seatCount:
 *                 type: number
 *               lineId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Train created
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
 *                     train:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         status:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *                         lineId:
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
 *         description: Line not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/train/{id}:
 *   put:
 *     summary: Update a train
 *     description: Update an existing train by its ID
 *     tags: [Train]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               seatCount:
 *                 type: number
 *               lineId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Train updated
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
 *                     train:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         status:
 *                           type: string
 *                         seatCount:
 *                           type: number
 *                         lineId:
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
 * /api/train/{id}:
 *   delete:
 *     summary: Delete a train
 *     description: Delete a train by its ID
 *     tags: [Train]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train ID
 *     responses:
 *       '200':
 *         description: Train deleted
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
 *         description: Train not found
 *       '500':
 *         description: Internal Server Error
 */

trainRouter.get('/trains', isAuthenticated,getTrains);
trainRouter.get('/:id',isAuthenticated ,getTrain);
trainRouter.post('/', isAdmin,createTrain);
trainRouter.put('/:id', isAdmin,updateTrain);
trainRouter.delete('/:id', isAdmin,deleteTrain);

export default trainRouter;
