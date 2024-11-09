import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { authLimiter } from "./middlewares/rateLimiter-middleware";
import router from "./routes/v1";
import { AppError } from "./utils/app-error";
import dotenv from "dotenv";
import checkDatabaseConnection from "./services/database-service";
import passport from "passport";
import { jwtStrategy } from "./config/passport";
import {
  errorConverter,
  globalErrorHandler,
} from "./middlewares/error-middleware";
import { errorHandler, successHandler } from "./config/morgan";
import logger from "./config/logger";
import sanitizeRequest from "./middlewares/sanitizeHtml-middleware";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(successHandler);
  app.use(errorHandler);
}

// Enable CORS
app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(sanitizeRequest);

// Gzip compression
app.use(compression());

// JWT authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === "production") {
  app.use("/api/v1/auth", authLimiter);
}

// V1 API routes
app.use("/api/v1", router);

app.get("/api/v1/health", (_, res: Response) => {
  res.json({
    message: "👋 Greetings  Health: 🔋 💻 😎 ⌚️",
  });
});
// Send back a 404 error for any unknown API request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND));
});

app.use(errorConverter);
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT;

const server = app.listen(PORT, () => {
  logger.info(`Server up and running on port ${PORT}`);
});

checkDatabaseConnection(server, () => {
  logger.info(
    "Database connection established successfully. Server is ready to handle requests."
  );
});

export default app;
