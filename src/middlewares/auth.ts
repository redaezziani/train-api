import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import secrets from "../secrets";


type Role = "admin" | "user";
type credentials = {
    email: string;
    role: Role;
    name: string;
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        if (!cookies) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const credentials = cookies.credentials;
        if (!credentials) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(credentials, secrets.jwtSecret) as credentials;
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        if (decoded.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized: Not an admin" });
        }

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        if (!cookies) {
            return res.status(401).json({ message: "you are not authenticated" });
        }
        const credentials = cookies.credentials;
        if (!credentials) {
            return res.status(401).json({ message: "you are not authenticated" });
        }
        const decoded = jwt.verify(credentials, secrets.jwtSecret) as credentials;
        if (!decoded) {
            return res.status(401).json({ message: "you are not authenticated" });
        }
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "you are not authenticated" });
    }
}