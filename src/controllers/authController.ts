import { Request, Response, NextFunction } from "express"; // Adjust import to your User model
import { generateAuthTokens, generateToken } from "../services/tokenService";
import { sendSuccessResponse } from "../utils/responses";
import * as authService from "../services/authService";
import { getUserByEmail, getUserById } from "../services/userService";
import { AppError } from "../utils/AppError";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import { UserAttributes } from "../interfaces/user";
import { emailTokenSchema } from "../validators/validateUser";

export const signup = async (req: Request, res: Response) => {
  const result = await authService.signup(req);
  console.log(result);
  sendSuccessResponse(res, result);
};

export const login = async (req: Request, res: Response) => {
  const user = await authService.login(req);
  sendSuccessResponse(res, user);
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { error, value } = emailTokenSchema.validate(req.query);

  if (error) throw new AppError(error.message, httpStatusCode.BAD_REQUEST);

  let user = await getUserByEmail(value.email);
  const userAttributes: UserAttributes = user.get() as UserAttributes;

  await authService.verifyEmail(value.token, userAttributes);
  const tokens = await generateAuthTokens(userAttributes);

  user = await getUserById(user.dataValues.id);
  sendSuccessResponse(res, { user, tokens });
};
