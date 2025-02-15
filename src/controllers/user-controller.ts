import { Request, Response } from "express";
import * as userService from "../services/user-service";
import { sendSuccessResponse } from "../utils/responses";
import { getCurrentUser } from "../utils/auth";

const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.getAllUsers();

  sendSuccessResponse(res, users);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.getUserById(Number(id));
  sendSuccessResponse(res, user);
};

const removeUser = async (req: Request, res: Response) => {
  const user = await userService.removeUser(req.params.id);
  sendSuccessResponse(res, user);
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate user is authenticated and authorized to update their own data

  const updatedUser = await userService.updateUserById(Number(id), req.body);
  sendSuccessResponse(res, updatedUser);
};
const updateCurrentUser = async (req: Request, res: Response) => {
  const currentUser = getCurrentUser(req, res);

  const updateUser = await userService.updateUserById(
    Number(currentUser.id),
    req.body
  );

  sendSuccessResponse(res, updateUser);
};

export { getAllUsers, getUserById, removeUser, updateUser, updateCurrentUser };
