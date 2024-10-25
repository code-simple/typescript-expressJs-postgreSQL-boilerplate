import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";
import cors from "cors";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
// import config from "./config/config";
// import morgan from "./config/morgan";
import { authLimiter } from "./middlewares/rateLimiter";
// import routes from './routes/v1';
import { AppError } from "./utils/AppError";

const app = express();

// if (config.env !== "test") {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

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
app.use(xss());
// app.use(mongoSanitize());

// Gzip compression
app.use(compression());

// JWT authentication
// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);

// Limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === "production") {
  app.use("/v1/auth", authLimiter);
}

// V1 API routes
// app.use("/dev/v1", routes);

// Send back a 404 error for any unknown API request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND));
});

// Convert error to ApiError, if needed
// app.use(errorConverter);

// Handle error
// app.use(errorHandler);

export default app;
