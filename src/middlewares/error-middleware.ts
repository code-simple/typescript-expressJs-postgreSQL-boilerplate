import { AppError } from "../utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ValidationError, UniqueConstraintError } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof ValidationError ||
      error instanceof UniqueConstraintError
        ? 400
        : 500);
    const message = error.message || "An unexpected error occurred";
    error = new AppError(message, statusCode, false, err.stack);
  }
  next(error);
};

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let { statusCode = 500, message = "An unexpected error occurred" } = err;

  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

export { errorConverter, globalErrorHandler };
