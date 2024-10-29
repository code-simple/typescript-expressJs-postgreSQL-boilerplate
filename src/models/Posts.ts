import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import { PostAttributes } from "../interfaces/Post";

const Post = sequelize.define<Model<PostAttributes>>(
  "Post",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: { allowNull: false, type: DataTypes.STRING },
    body: { allowNull: false, type: DataTypes.STRING },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
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
    modelName: "Post",
    paranoid: true, // Enables soft deletion with deletedAt
    freezeTableName: true,
  }
);

export default Post;
