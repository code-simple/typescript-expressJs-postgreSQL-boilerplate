import winston, { format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();
// Custom format to handle errors
const enumerateErrorFormat = format((info: any) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Create the logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === "development"
      ? format.colorize()
      : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
