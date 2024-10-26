import { Request, Response, NextFunction } from "express"; // Adjust import to your User model
import { generateToken } from "../services/tokenService";
import { sendSuccessResponse } from "../utils/responses";
import * as authService from "../services/authService";

export const signup = async (req: Request, res: Response) => {
  const result = await authService.signup(req);

  sendSuccessResponse(res, result);
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req);
  const token = generateToken({ id: result.dataValues.id });

  sendSuccessResponse(res, { ...result.dataValues, token });
};
