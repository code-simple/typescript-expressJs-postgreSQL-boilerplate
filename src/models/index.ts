import path from "path";
import fs from "fs";
import sequelize from "../config/database"; // Import the configured Sequelize instance

// Object to store models by name
const db: { [key: string]: any } = {};

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
      db[model.name] = model; // Store model by name in db object
      sequelize.models[model.name] = model; // Add each model to sequelize.models
    }
  });

export { sequelize, db };
export default sequelize;
