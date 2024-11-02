import Post from "./Posts";
import User from "./User";

const associateModels = async () => {
  //-----------------------USER | POST------------------------------
  User.hasMany(Post, { foreignKey: "userId", as: "posts" });
  Post.belongsTo(User, { foreignKey: "userId", as: "author" });
  //----------------------------------------------------------------
};

export default associateModels;
