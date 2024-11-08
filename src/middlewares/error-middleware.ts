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
    let statusCode = 500;
    let message = "An unexpected error occurred";

    if (error instanceof ValidationError) {
      statusCode = 400;
      message = "Validation error";
    }

    if (error instanceof UniqueConstraintError) {
      statusCode = 400;
      message =
        "Duplicate entry error: A record with this value already exists";

      // Optionally, you can make the message more specific:
      if (error.errors && error.errors.length > 0) {
        const fields = error.errors.map((e) => e.path).join(", ");
        message = `Duplicate Error: ${fields} already exists in the database`;
      }
    }

    // Wrap the error in AppError with customized message and status
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
