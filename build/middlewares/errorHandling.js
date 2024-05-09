"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    if (statusCode && err.message) {
        res.status(statusCode).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};
exports.default = errorHandlingMiddleware;
