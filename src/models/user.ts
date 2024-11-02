import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { UserCreationAttributes } from "../types/user";
import Post from "./Posts";
import { UserAttributes } from "../interfaces/User";

// Define the User model using the functional approach
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
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
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(this: Model<UserAttributes, UserCreationAttributes>, val: string) {
        if (val !== this.getDataValue("password")) {
          throw new Error("Passwords do not match");
        }
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue("password", hashedPassword);
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
      defaultValue: null,
    },
  },
  {
    modelName: "User",
    paranoid: true, // Enables soft deletion with deletedAt
    freezeTableName: true,
    // INFO: If removed password from the request body , Most of methods won't work e.g User.save()
    // better handle it in service or controllers
    defaultScope: {
      attributes: { exclude: ["deletedAt"] }, // Exclude password by default
    },
    // in case you need passwords then User.scope("cleanQuery").findAll({});
    scopes: {
      cleanQuery: { attributes: { include: ["password", "deletedAt"] } },
    },
    hooks: {
      // Before creating a user, hash the password

      // After updating a user, log the action
      afterUpdate: (user) => {
        const email = user.get("email");
        console.log(`User with email ${email} was updated`);
      },
    },
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export default User;
