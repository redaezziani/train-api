import express from 'express';
import { login, register,forgotPassword ,resetPassword,verifyEmail} from '../controllers/auth';
const authRouter = express.Router();


authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/reset-password', resetPassword);

authRouter.post('/verify-email', verifyEmail);

export default authRouter;