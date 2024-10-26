// src/config/config.ts
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  development: {
    username: process.env.DB_USER || "your_correct_username",
    password: process.env.DB_PASSWORD || "your_correct_password",
    database: process.env.DB_NAME || "dev_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "your_correct_username",
    password: process.env.DB_PASSWORD || "your_correct_password",
    database: process.env.DB_TEST_NAME || "test_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "your_correct_username",
    password: process.env.DB_PASSWORD || "your_correct_password",
    database: process.env.DB_NAME || "prod_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
};

export const ENV = {
  DB: {
    NAME: process.env.DB_NAME || "default_db_name",
    USER: process.env.DB_USER || "default_db_user",
    PASSWORD: process.env.DB_PASSWORD || "default_db_password",
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "default_jwt_secret",
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  },
  APP: {
    PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    ENV: process.env.NODE_ENV || "development",
  },
};

export default dbConfig;
