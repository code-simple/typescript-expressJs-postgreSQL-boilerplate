import bcrypt from "bcrypt";
import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { UserCreationAttributes } from "../types/user";

// Interface defining the attributes of the User
export interface UserAttributes {
  id: number;
  userType: "0" | "1" | "2"; // 0: admin, 1: user, 2: other
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string; // Virtual attribute, not stored in DB
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  token?: string | null;
}

// Define the User model using the functional approach
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0", "1", "2"), // 0: admin, 1: user, 2: other
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL, // Virtual field, not stored in the database
      set(this: Model<UserAttributes, UserCreationAttributes>, val: string) {
        // Use bcrypt to hash password if it matches confirmation
        if (val === this.getDataValue("password")) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue("password", hashedPassword);
        } else {
          throw new Error("Passwords do not match");
        }
      },
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
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "user",
    paranoid: true, // Enables soft deletion with deletedAt
    freezeTableName: true,
    // Use the model name as the table name without pluralization
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export default User;
