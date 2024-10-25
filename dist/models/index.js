"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("../config/database")); // Import the configured Sequelize instance
// Array to store models
const models = [];
// Dynamically load all models in the current directory
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    // Filter out non-TypeScript files and index.ts itself
    return (file.indexOf(".") !== 0 &&
        file !== path_1.default.basename(__filename) &&
        file.slice(-3) === ".ts");
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file)).default;
    if (model) {
        models.push(model);
    }
});
// Add all loaded models to Sequelize
database_1.default.addModels(models);
exports.default = database_1.default; // Default export of the configured Sequelize instance
