import express, { Request, Response } from 'express';
import { login, register,forgotPassword ,resetPassword} from '../controllers/auth';
const authRouter = express.Router();


 authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/forgot-password', forgotPassword);


authRouter.post('/reset-password', resetPassword);

authRouter.post('/verify-email', (req:Request, res:Response) => {
    res.send('Verify Email Page');
});

export default authRouter;