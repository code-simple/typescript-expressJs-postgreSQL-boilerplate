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
    REFRESH_EXPIRES_IN_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    VERIFY_EMAIL_EXPIRATION_MINUTES:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    FORGOT_PASSWORD_EXPIRATION_MINUTES:
      process.env.JWT_FORGOT_PASSWORD_EXPIRATION_MINUTES,
  },
  APP: {
    SERVER_HOST_URL:
      process.env.NODE_ENV === "production"
        ? `${process.env.HOST_IP}:${process.env.APP_PORT}/api/v1`
        : `http://localhost:${process.env.APP_PORT}/api/v1`,
    PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    ENV: process.env.NODE_ENV || "development",
  },
  S3: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST as string, // Type assertion
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587, // Default to 587 if not set
      auth: {
        user: process.env.SMTP_USERNAME as string, // Type assertion
        pass: process.env.SMTP_PASSWORD as string, // Type assertion
      },
    },
    from: process.env.EMAIL_FROM as string, // Type assertion
    resendApi: process.env.RESEND_API_KEY,
  },
};
