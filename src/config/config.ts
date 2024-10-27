// src/config/config.ts
import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  DB: {
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET,
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    VERIFY_EMAIL_EXPIRATION_MINUTES:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  APP: {
    PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    ENV: process.env.NODE_ENV || "development",
  },
};
