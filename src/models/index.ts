import { Sequelize } from "sequelize-typescript";
import path from "path";
import fs from "fs";
import sequelize from "../config/database"; // Import the configured Sequelize instance

// Array to store models
const models: any[] = [];

// Dynamically load all models in the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    // Filter out non-TypeScript files and index.ts itself
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    if (model) {
      models.push(model);
    }
  });
// Add all loaded models to Sequelize
models.forEach((model) => {
  sequelize.models[model.name] = model;
});

export default sequelize; // Default export of the configured Sequelize instance
