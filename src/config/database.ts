import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import config from "./config";
import path from "path";

dotenv.config();

const env = process.env.NODE_ENV || "development";

if (!config[env]) {
  throw new Error(`Missing configuration for environment: ${env}`);
}

const sequelize = new Sequelize({
  ...config[env],
  models: [path.resolve(__dirname, "../models")], // Automatically loads models from the models folder
});

export default sequelize;
