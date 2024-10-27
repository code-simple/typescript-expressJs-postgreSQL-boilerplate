import { Request, Response } from "express";
import * as userService from "../services/userService";
import { sendSuccessResponse } from "../utils/responses";
import { AppError } from "../utils/AppError";
import { ReasonPhrases } from "http-status-codes";
import { message } from "../utils/message";

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.getAllUsers();
  sendSuccessResponse(res, users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));
  sendSuccessResponse(res, user);
};

export const removeUser = async (req: Request, res: Response) => {
  const user = await userService.removeUser(req.params.id);
  sendSuccessResponse(res, user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  if (password) throw new AppError(message.AUTH.CANNOT_CHANGE_PASSWORD, 403);
  const updatedUser = await userService.updateUserById(Number(id), req.body);
  sendSuccessResponse(res, updatedUser);
};
