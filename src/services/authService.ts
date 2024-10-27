import { Request } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import {
  generateAuthTokens,
  generateToken,
  generateVerifyEmailToken,
  verifyToken,
} from "./tokenService";
import bcrypt from "bcrypt";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import { UserAttributes } from "../interfaces/user";
import { tokenTypes } from "../types/token";
import Token from "../models/Token";
import { updateUserById } from "./userService";
import { updateRecordById } from "../utils/dbUtils";
import { message } from "../utils/message";

export async function login(req: Request) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }
  const user = await User.findOne({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  if (!user.dataValues.isEmailVerified) {
    const verifyEmailToken = await generateVerifyEmailToken(user.dataValues);
    // Send token in email to that user
    console.log(`Emailed to ${user.dataValues.email}: `, verifyEmailToken);
    throw new AppError(
      message.AUTH.EMAIL_NOT_VERIFIED,
      httpStatusCode.FORBIDDEN
    );
  }

  const tokens = await generateAuthTokens(user.dataValues);
  return { user, tokens };
}

export async function signup(req: Request) {
  const body = req.body;

  if (!["1", "2"].includes(body.role)) {
    throw new AppError("Invalid user type", 400);
  }

  const newUser = await User.create(req.body);

  if (!newUser) {
    throw new AppError("Failed to create the user", 400);
  }
  const result = newUser.toJSON();

  const tokens = await generateVerifyEmailToken(result);

  return { result, tokens };
}

export const verifyEmail = async (
  verifyEmailToken: string,
  user: UserAttributes
): Promise<void> => {
  try {
    // Verify the token
    await verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL, user.id);

    // Delete any remaining verification tokens for the user
    await Token.destroy({
      where: { userId: user.id, type: tokenTypes.VERIFY_EMAIL },
    });

    // Update user email status to verified
    await updateRecordById(User, user.id, { isEmailVerified: true });
  } catch (error) {
    throw new AppError(ReasonPhrases.UNAUTHORIZED, httpStatusCode.UNAUTHORIZED);
  }
};
