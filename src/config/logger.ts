import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import dotenv from "dotenv";

dotenv.config();

// Custom timestamp format
const customTimestamp = format((info) => {
  const date = new Date(info.timestamp);
  const formattedDate = date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  info.timestamp = formattedDate;
  return info;
});

// Enhanced enumerateErrorFormat to ensure message and stack are set
const enumerateErrorFormat = format((info: any) => {
  if (info instanceof Error) {
    info.message = info.message || ""; // Retain the original message
    info.stack = info.stack || ""; // Include stack if available
  }
  return info;
});

const consoleFormat = format.combine(
  format.timestamp(),
  customTimestamp(), // Apply custom timestamp format
  enumerateErrorFormat(),
  format.colorize(),
  format.splat(),
  winston.format.printf(({ timestamp, level, message, stack }) =>
    stack
      ? `[${level}] [${timestamp}] - ${message}\nStack Trace: ${stack}`
      : `[${level}] [${timestamp}] - ${message}`
  )
);

const fileFormat = format.combine(
  format.timestamp(),
  customTimestamp(), // Apply custom timestamp format
  enumerateErrorFormat(),
  format.uncolorize(),
  format.splat(),
  format.printf(({ timestamp, level, message, stack }) =>
    stack
      ? `[${level}] [${timestamp}] - ${message}\nStack Trace: ${stack}`
      : `[${level}] [${timestamp}] - ${message}`
  )
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transports: [
    new transports.Console({
      format:
        process.env.NODE_ENV === "development" ? consoleFormat : fileFormat,
      stderrLevels: ["error"],
    }),
    new DailyRotateFile({
      filename: "serverlogs-%DATE%.log",
      dirname: "./logs",
      level: "error",
      datePattern: "DD-MMM-YYYY",
      maxSize: "100m",
      maxFiles: "14d",
      format: fileFormat,
    }),
  ],
});

export default logger;
