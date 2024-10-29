import { Sequelize } from "sequelize";
import { ENV } from "./config";

// Initialize Sequelize using the standard Sequelize package
const sequelize = new Sequelize({
  database: ENV.DB.NAME,
  dialect: "postgres",
  username: ENV.DB.USER,
  password: ENV.DB.PASSWORD,
  host: ENV.DB.HOST,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export default sequelize;
