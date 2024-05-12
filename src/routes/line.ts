import express from 'express';
import { 
    getLines,
    getLine,
    createLine,
    updateLine,
    deleteLine,
} from '../controllers/line';
import { isAdmin,isAuthenticated } from '../middlewares/auth';

const lineRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Line
 *   description: Line endpoints
 */

/**
 * @swagger
 * /api/line/lines:
 *   get:
 *     summary: Get all lines
 *     description: Retrieve a list of all lines
 *     tags: [Line]
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
 *         description: List of lines
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
 *                     lines:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           number:
 *                             type: number
 *                           origin:
 *                             type: string
 *                           destination:
 *                             type: string
 *       '404':
 *         description: No lines found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/line/{id}:
 *   get:
 *     summary: Get a line by ID
 *     description: Retrieve a line by its ID
 *     tags: [Line]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Line ID
 *     responses:
 *       '200':
 *         description: Line found
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
 *                     line:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         number:
 *                           type: number
 *                         origin:
 *                           type: string
 *                         destination:
 *                           type: string
 *       '404':
 *         description: Line not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/line:
 *   post:
 *     summary: Create a new line
 *     description: Create a new line with number, origin, and destination
 *     tags: [Line]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Line created
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
 *                     line:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         number:
 *                           type: number
 *                         origin:
 *                           type: string
 *                         destination:
 *                           type: string
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Line number already in use, try another one
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/line/{id}:
 *   put:
 *     summary: Update a line
 *     description: Update an existing line by its ID
 *     tags: [Line]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Line ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Line updated
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
 *                     line:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         number:
 *                           type: number
 *                         origin:
 *                           type: string
 *                         destination:
 *                           type: string
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/line/{id}:
 *   delete:
 *     summary: Delete a line
 *     description: Delete a line by its ID
 *     tags: [Line]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Line ID
 *     responses:
 *       '200':
 *         description: Line deleted
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
 *                     line:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         number:
 *                           type: number
 *                         origin:
 *                           type: string
 *                         destination:
 *                           type: string
 *       '500':
 *         description: Internal Server Error
 */

// Line Routes
lineRouter.get('/lines', isAuthenticated,getLines);
lineRouter.get('/:id', isAuthenticated,getLine);
lineRouter.post('/',isAdmin, createLine);
lineRouter.put('/:id',isAdmin ,updateLine);
lineRouter.delete('/:id', isAdmin,deleteLine);

export default lineRouter;