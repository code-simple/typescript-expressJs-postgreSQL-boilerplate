import { Request, Response } from "express";
import * as userService from "../services/userService";
import { sendSuccessResponse } from "../utils/responses";
import { AppError } from "../utils/AppError";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import { message } from "../utils/message";
import { UserAttributes } from "../interfaces/User";

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

  // Validate user is authenticated and authorized to update their own data

  const updatedUser = await userService.updateUserById(Number(id), req.body);
  sendSuccessResponse(res, updatedUser);
};
