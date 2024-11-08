import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import User from "../models/user-model";
import { AppError } from "../utils/AppError";
import { updateUserSchema } from "../validators/user-validator";
import Post from "../models/post-model";

async function getUserById(id: number) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  return user;
}

async function getUserByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  return user;
}

async function getAllUsers() {
  const users = await User.findAll({
    include: [
      {
        model: Post,
        as: "posts", // Must match the alias defined in associations.ts
      },
    ],
  });
  // or
  // const users = await User.scope("withPassword").findAll(); // Include password if needed
  return users;
}

async function removeUser(id: string) {
  // delete by pk
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  await user.destroy();
  return user;
}
const updateUserById = async (userId: number, updateBody: object) => {
  const { error } = updateUserSchema.validate(updateBody);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  // INFO: Updating passwording using other methods will not hash it in table
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  await user.update(updateBody);

  // Return the updated user data
  return user.get({ plain: true });
};

export { getUserById, getUserByEmail, getAllUsers, removeUser, updateUserById };
