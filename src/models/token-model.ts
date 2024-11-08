// src/models/Token.ts

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { TokenAttributes } from "../interfaces/token-interface"; // Import the User model for associations
import { tokenTypes } from "../types/token";

// Define optional attributes for token creation
interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

// Define the Token model
const Token = sequelize.define<Model<TokenAttributes, TokenCreationAttributes>>(
  "Token",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Use the table name as a string
        key: "id",
      },
      onDelete: "CASCADE", // Cascade delete when a user is deleted
    },
    type: {
      type: DataTypes.ENUM(
        tokenTypes.ACCESS,
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL
      ),
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "Token",
    timestamps: true,
    freezeTableName: true,
  }
);

export default Token;
