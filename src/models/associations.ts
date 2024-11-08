import Post from "./post-model";
import User from "./user-model";

const associateModels = async () => {
  //-----------------------USER | POST------------------------------
  User.hasMany(Post, { foreignKey: "userId", as: "posts" });
  Post.belongsTo(User, { foreignKey: "userId", as: "author" });
  //----------------------------------------------------------------
};

export default associateModels;
