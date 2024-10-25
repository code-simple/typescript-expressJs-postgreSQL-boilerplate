import dotenv from "dotenv";

dotenv.config();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
}

interface Config {
  [key: string]: DBConfig;
}

const config: Config = {
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

export default config;
