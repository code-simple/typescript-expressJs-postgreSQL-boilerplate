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
  const users = await getQuery('SELECT * FROM "User"');
  // OR
  // const users = await getAllRecords(User, {});
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
  // Fetch the user by ID
  const [updatedCount, updatedRows] = await User.update(updateBody, {
    where: { id: userId },
    returning: true, // Optional: returns the updated rows
  });

  if (updatedCount === 0) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  // Return the first updated record
  const result = updatedRows[0];

  return result.dataValues;
};
