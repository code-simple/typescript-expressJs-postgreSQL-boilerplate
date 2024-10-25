import path from "path";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

// Create the Sequelize instance using `sequelize-typescript`
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "postgres", // or any other dialect you're using
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [path.resolve(__dirname, "./src/models")],
});

export default sequelize;
