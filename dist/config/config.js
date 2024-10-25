"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        username: process.env.DB_USER || "dev_user",
        password: process.env.DB_PASSWORD || "dev_password",
        database: process.env.DB_NAME || "dev_db",
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
    },
    test: {
        username: process.env.DB_USER || "test_user",
        password: process.env.DB_PASSWORD || "test_password",
        database: process.env.DB_TEST_NAME || "test_db",
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
    },
    production: {
        username: process.env.DB_USER || "prod_user",
        password: process.env.DB_PASSWORD || "prod_password",
        database: process.env.DB_NAME || "prod_db",
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
    },
};
exports.default = config;
