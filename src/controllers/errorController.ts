import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ValidationError, UniqueConstraintError } from "sequelize";

interface ErrorWithStatus extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  errors?: { message: string }[]; // Added type for errors
}

const sendErrorDev = (error: ErrorWithStatus, res: Response) => {
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

const sendErrorProd = (error: ErrorWithStatus, res: Response) => {
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

const globalErrorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token", 401) as ErrorWithStatus;
  }
  if (err instanceof ValidationError) {
    err = new AppError(
      err.errors[0]?.message || "Validation error",
      400
    ) as ErrorWithStatus;
  }
  if (err instanceof UniqueConstraintError) {
    err = new AppError(
      err.errors[0]?.message || "Unique constraint error",
      400
    ) as ErrorWithStatus;
  }

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }

  sendErrorProd(err, res);
};

export default globalErrorHandler;
