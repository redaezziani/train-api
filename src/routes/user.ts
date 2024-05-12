import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user';
import { isAdmin, isAuthenticated, isSuperAdmin } from '../middlewares/auth';

const userRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: List of users
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
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by its ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with email, name, password, role, profile, and isVerified status
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '201':
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User already exists
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user by its ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       '200':
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by its ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         profile:
 *           type: string
 *         isVerified:
 *           type: boolean
 *       required:
 *         - id
 *         - email
 *         - name
 *         - password
 *         - role
 *         - isVerified
 *     CreateUserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         profile:
 *           type: string
 *         isVerified:
 *           type: boolean
 *       required:
 *         - email
 *         - password
 *         - role
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         profile:
 *           type: string
 *         isVerified:
 *           type: boolean
 *       required: []
 */

userRouter.get('/users', isAuthenticated,isAdmin,getUsers);
userRouter.get('/:id', isAuthenticated,isSuperAdmin,getUser);
userRouter.post('/', isAuthenticated, isSuperAdmin,createUser);
userRouter.put('/:id', isAuthenticated,isSuperAdmin,updateUser);
userRouter.delete('/:id',isAuthenticated,isSuperAdmin, deleteUser);

export default userRouter;