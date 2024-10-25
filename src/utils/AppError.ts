export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Capture stack trace to exclude constructor from it
    Error.captureStackTrace(this, this.constructor);
  }
}
