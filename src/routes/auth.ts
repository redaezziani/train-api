import express, { Request, Response } from 'express';
import { login, register } from '../controllers/auth';
const authRouter = express.Router();


 authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/forgot-password', (req:Request, res:Response) => {
    res.send('Forgot Password Page');
});


authRouter.post('/reset-password', (req:Request, res:Response) => {
    res.send('Reset Password Page');
});

authRouter.post('/verify-email', (req:Request, res:Response) => {
    res.send('Verify Email Page');
});

export default authRouter;