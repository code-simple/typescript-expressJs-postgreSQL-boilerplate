import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { Request } from "express";
import sequelize from "../models";
import { QueryTypes } from "sequelize";
import { getQuery } from "./queryService";
import { UserAttributes } from "../interfaces/user";
import { getAllRecords } from "../utils/dbUtils";

export async function getUserById(id: number) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  return user;
}

export async function getAllUsers() {
  const users = await User.findAll();
  // or
  // const users = await User.scope("withPassword").findAll(); // Include password if needed
  return users;
}

export async function removeUser(id: string) {
  // delete by pk
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  await user.destroy();
  return user;
}
export const updateUserById = async (userId: number, updateBody: object) => {
  // INFO: Updating passwording using other methods will not hash it in table
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  await user.update(updateBody);

  // Return the updated user data
  return user.dataValues;
};
