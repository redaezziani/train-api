"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = require("bcrypt");
const db_1 = __importDefault(require("../db"));
const secrets_1 = __importDefault(require("../secrets"));
const auth_1 = require("../lib/types/auth");
const jsonwebtoken_1 = require("jsonwebtoken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
                status: 'error',
            });
        }
        const result = yield auth_1.registerSchema.safeParseAsync({
            email,
            password,
            name,
        });
        if (!result.success) {
            return res.status(400).json({ error: result.error.errors, status: 'error', });
        }
        const isUserExist = yield db_1.default.users.findUnique({
            where: {
                email,
            },
        });
        if (isUserExist) {
            return res.status(400).json({
                error: 'User already exists', status: 'error'
            });
        }
        const register = yield db_1.default.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        if (!register) {
            return res.status(400).json({
                error: 'User not created', status: 'error',
            });
        }
        res.status(201).redirect('/');
    }
    catch (error) {
        console.error(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
                status: 'error',
            });
        }
        const result = yield auth_1.loginSchema.safeParseAsync({
            email,
            password,
        });
        if (!result.success) {
            return res.status(400).json({
                error: result.error.errors,
                status: 'error',
            });
        }
        const user = yield db_1.default.users.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({
                error: 'User not found',
                status: 'error',
            });
        }
        const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                error: 'Invalid credentials',
                status: 'error',
            });
        }
        const token = (0, jsonwebtoken_1.sign)({
            id: user.id,
            email: user.email,
        }, secrets_1.default.jwtSecret, {
            expiresIn: secrets_1.default.jwtExpiration,
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).redirect('/');
    }
    catch (error) {
        console.error(error);
    }
});
exports.login = login;
