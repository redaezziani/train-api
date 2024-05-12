import express from 'express';
import { login, register,forgotPassword ,resetPassword,verifyEmail} from '../controllers/auth';
const authRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *      
 *     summary: Register a new user
 *     description: Register a new user with email, password, and name
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/register', register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Log in with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/login', login);
/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     description: Request to reset password by providing email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email sent for password reset
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     description: Reset user password using token and new password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/reset-password', resetPassword);
/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify Email
 *     description: Verify user's email address using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/verify-email', verifyEmail);

export default authRouter;