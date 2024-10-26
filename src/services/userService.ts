import httpStatus, { ReasonPhrases } from "http-status-codes";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { Request } from "express";
import sequelize from "../models";
import { QueryTypes } from "sequelize";
import { getQuery } from "./queryService";

export async function getUserById(id: string) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatus.NOT_FOUND);
  }
  return user;
}

export async function getAllUsers() {
  const users = await getQuery('SELECT * FROM "User"');

  return users;
}

export async function removeUser(id: string) {
  // delete by pk
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatus.NOT_FOUND);
  }
  await user.destroy();
  return user;
}
