"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secrets = {
    jwtSecret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '',
    jwtExpiration: (_b = process.env.JWT_EXPIRES_IN) !== null && _b !== void 0 ? _b : '1d',
    googleClientId: (_c = process.env.GOOGLE_CLIENT_ID) !== null && _c !== void 0 ? _c : '',
    googleClientSecret: (_d = process.env.GOOGLE_CLIENT_SECRET) !== null && _d !== void 0 ? _d : '',
};
exports.default = secrets;
