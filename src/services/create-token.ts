import jwt from "jsonwebtoken";


export const createForgotPasswordToken = (email: string, secret: number) => {
    return jwt.sign({ email, secret }, process.env.JWT_SECRET as string, {
        expiresIn: '10m',
    });
}

export const extractToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { email: string, secret: number };
}


export const  randomNumber = () => {
    return Math.floor(Math.random() * 10 ** 4);
}


export const createVerificationToken = (email: string, secret: number) => {
    return jwt.sign({ email, secret }, process.env.JWT_SECRET as string, {
        expiresIn: '10m',
    });
}

export const extractVerificationToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { email: string, secret: number };
}