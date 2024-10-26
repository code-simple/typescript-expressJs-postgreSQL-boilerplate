import { Request, Response } from "express";
import * as userService from "../services/userService";
import { sendSuccessResponse } from "../utils/responses";

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.getAllUsers();
  sendSuccessResponse(res, users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  sendSuccessResponse(res, user);
};
