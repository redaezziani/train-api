import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandlingMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500; 
    if (statusCode && err.message) {
        res.status(statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

export default errorHandlingMiddleware;
