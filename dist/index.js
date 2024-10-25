"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
// import config from "./config/config";
// import morgan from "./config/morgan";
const rateLimiter_1 = require("./middlewares/rateLimiter");
const v1_1 = __importDefault(require("./routes/v1"));
const AppError_1 = require("./utils/AppError");
const errorController_1 = __importDefault(require("./controllers/errorController"));
const dotenv_1 = __importDefault(require("dotenv"));
const databaseService_1 = __importDefault(require("./services/databaseService"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// if (config.env !== "test") {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }
// Enable CORS
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Parse JSON request body
app.use(express_1.default.json());
// Parse URL-encoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// Sanitize request data
app.use((0, xss_clean_1.default)());
// app.use(mongoSanitize());
// Gzip compression
app.use((0, compression_1.default)());
// JWT authentication
// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);
// Limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === "production") {
    app.use("/api/v1/auth", rateLimiter_1.authLimiter);
}
// V1 API routes
app.use("/api/v1", v1_1.default);
// Send back a 404 error for any unknown API request
app.use((req, res, next) => {
    next(new AppError_1.AppError(http_status_codes_1.ReasonPhrases.NOT_FOUND, http_status_codes_1.StatusCodes.NOT_FOUND));
});
// Convert error to ApiError, if needed
// app.use(errorConverter);
// Handle error
app.use(errorController_1.default);
const PORT = process.env.APP_PORT || 4000;
// Call the function to check the DB connection
(0, databaseService_1.default)();
app.listen(PORT, () => {
    console.log("Server up and running", PORT);
});
exports.default = app;
