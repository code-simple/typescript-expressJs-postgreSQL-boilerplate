import morgan, { StreamOptions } from "morgan";
import { Request, Response } from "express"; // Import the Express types
import logger from "./logger";
import dotenv from "dotenv";

dotenv.config();
// Define a custom token for the error message
morgan.token(
  "message",
  (req: Request, res: Response) => res.locals.errorMessage || ""
);

// Utility function to get the IP format based on the environment
const getIpFormat = (): string =>
  process.env.NODE_ENV === "production" ? ":remote-addr - " : "";

// Define response formats for success and error logs
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Stream options for morgan to write logs using the custom logger
const successStream: StreamOptions = {
  write: (message: string) => logger.info(message.trim()),
};

const errorStream: StreamOptions = {
  write: (message: string) => logger.error(message.trim()),
};

// Morgan middleware for handling success responses
const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: successStream,
});

// Morgan middleware for handling error responses
const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: errorStream,
});

export { successHandler, errorHandler };
