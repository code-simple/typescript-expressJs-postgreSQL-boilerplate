export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    stack: string = ""
  ) {
    super(message);

    // Set the name of the error to match the class name
    this.name = this.constructor.name;

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture the stack trace or use provided stack
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
