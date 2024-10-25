"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Define the User model using the functional approach
const User = database_1.default.define("User", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    userType: {
        type: sequelize_1.DataTypes.ENUM("0", "1", "2"), // 0: admin, 1: user, 2: other
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    confirmPassword: {
        type: sequelize_1.DataTypes.VIRTUAL, // Virtual field, not stored in the database
        set(val) {
            // Use bcrypt to hash password if it matches confirmation
            if (val === this.getDataValue("password")) {
                const hashedPassword = bcrypt_1.default.hashSync(val, 10);
                this.setDataValue("password", hashedPassword);
            }
            else {
                throw new Error("Passwords do not match");
            }
        },
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    paranoid: true, // Enables soft deletion with deletedAt
    // Use the model name as the table name without pluralization
    timestamps: true, // Automatically manage createdAt and updatedAt
});
exports.default = User;
