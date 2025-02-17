"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    let error = err;
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message || "Something went wrong!",
    });
};
exports.default = globalErrorHandler;
