import { Request, Response } from "express"; // Adjust import to your User model
import * as tokenService from "../services/token-service";
import { sendSuccessResponse } from "../utils/responses";
import * as authService from "../services/auth-service";
import { getUserByEmail, getUserById } from "../services/user-service";
import { AppError } from "../utils/AppError";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import { UserAttributes } from "../interfaces/user-interface";
import {
  emailTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/user-validator";
import * as userService from "../services/user-service";
import { ENV } from "../config/config";
import logger from "../config/logger";

const signup = async (req: Request, res: Response) => {
  const result = await authService.signup(req);
  sendSuccessResponse(res, result);
};

const login = async (req: Request, res: Response) => {
  const user = await authService.login(req);
  sendSuccessResponse(res, user);
};

const verifyEmail = async (req: Request, res: Response) => {
  const { error, value } = emailTokenSchema.validate(req.query);

  if (error) {
    throw new AppError(error.message, httpStatusCode.BAD_REQUEST);
  }

  let user = await getUserByEmail(value.email);
  const userAttributes: UserAttributes = user.get() as UserAttributes;

  await authService.verifyEmail(value.token, userAttributes);
  const tokens = await tokenService.generateAuthTokens(userAttributes);
  const { id } = user.get();
  user = await getUserById(id);
  sendSuccessResponse(res, { user, tokens });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError("Please provide refresh token", 400);
  }
  const result = await tokenService.refreshTokenService(refreshToken);
  if (!result) {
    throw new AppError("Error", 404);
  }
  sendSuccessResponse(res, result);
};

const forgotPassword = async (req: Request, res: Response) => {
  const { error, value } = forgotPasswordSchema.validate(req.body);
  if (error) {
    throw new AppError(error.message, httpStatusCode.BAD_REQUEST);
  }
  const user = await userService.getUserByEmail(value.email);
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  const { isEmailVerified, email } = user.get({ plain: true });
  if (!isEmailVerified) {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
      user.get({ plain: true })
    );

    throw new AppError(
      `Verification email sent to ${email} OTP : ${verifyEmailToken}`,
      403
    );
  }

  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  logger.info(req.body.email + ` ${resetPasswordToken} ` + "Sent");
  sendSuccessResponse(
    res,
    `Password reset link has been sent to your email address : ${resetPasswordToken} It will expires in ${ENV.JWT.FORGOT_PASSWORD_EXPIRATION_MINUTES} minutes`
  );
};

const resetPassword = async (req: Request, res: Response) => {
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) {
    throw new AppError(error.message, httpStatusCode.BAD_REQUEST);
  }
  const { email, token, confirmPassword } = value;
  await authService.resetPassword(email, token, confirmPassword);
  sendSuccessResponse(res, "Successfully reset password");
};

const logout = async (req: Request, res: Response) => {
  const userProps = req.user as UserAttributes;
  await authService.logout(userProps.id);
  sendSuccessResponse(res, "Successfully logged out");
};

export {
  signup,
  login,
  verifyEmail,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout,
};
