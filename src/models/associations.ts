import Post from "./Posts";
import User from "./User";

const associateModels = async () => {
  //-----------------------USER | POST------------------------------
  User.hasMany(Post, { foreignKey: "userId" });
  Post.belongsTo(User, { foreignKey: "userId" });
  //----------------------------------------------------------------
};

export default associateModels;
