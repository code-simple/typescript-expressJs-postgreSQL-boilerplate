// src/config/config.ts
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
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
