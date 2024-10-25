"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const sequelize_1 = require("sequelize");
const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";
    const message = error.message;
    const stack = error.stack;
    res.status(statusCode).json({
        status,
        message,
        stack,
    });
};
const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";
    const message = error.message;
    if (error.isOperational) {
        return res.status(statusCode).json({
            status,
            message,
        });
    }
    console.error(error.name, error.message, error.stack);
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong",
    });
};
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b;
    if (err.name === "JsonWebTokenError") {
        err = new AppError_1.AppError("Invalid token", 401);
    }
    if (err instanceof sequelize_1.ValidationError) {
        err = new AppError_1.AppError(((_a = err.errors[0]) === null || _a === void 0 ? void 0 : _a.message) || "Validation error", 400);
    }
    if (err instanceof sequelize_1.UniqueConstraintError) {
        err = new AppError_1.AppError(((_b = err.errors[0]) === null || _b === void 0 ? void 0 : _b.message) || "Unique constraint error", 400);
    }
    if (process.env.NODE_ENV === "development") {
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};
exports.default = globalErrorHandler;
