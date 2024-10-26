import httpStatus, { ReasonPhrases } from "http-status-codes";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { Request } from "express";

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
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  if (!users) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatus.NOT_FOUND);
  }

  return users;
}
