import Post from "./Posts";
import User from "./User";

const associateModels = async () => {
  User.hasMany(Post, { foreignKey: "id" });
  Post.belongsTo(User, { foreignKey: "userId", as: "author" });
};

export default associateModels;
