"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(100, {
        message: 'name must be atleast 3 characters long',
    }),
    email: zod_1.default.string().email({
        message: 'give a valid email address please',
    }),
    password: zod_1.default.string().min(6).max(100, {
        message: 'password must be atleast 6 characters long',
    }),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email({
        message: 'give a valid email address please',
    }),
    password: zod_1.default.string().min(6).max(100, {
        message: 'password must be atleast 6 characters long',
    }),
});
