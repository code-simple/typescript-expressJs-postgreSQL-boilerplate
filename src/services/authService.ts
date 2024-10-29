import { Request } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import bcrypt from "bcrypt";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import { UserAttributes } from "../interfaces/user";
import { tokenTypes } from "../types/token";
import Token from "../models/Token";
import { updateRecordById } from "../utils/dbUtils";
import { message } from "../utils/message";
import * as userService from "../services/userService";
import * as tokenService from "../services/tokenService";
import { messages } from "../utils/constants";

export async function login(req: Request) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({
    where: { email },
  });

  if (
    !user ||
    !(await bcrypt.compare(password, user.get("password") as string))
  ) {
    throw new AppError("Incorrect email or password", 401);
  }

  const isEmailVerified = user.get("isEmailVerified");
  if (!isEmailVerified) {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
      user.get({ plain: true })
    );
    // Send token in email to that user
    console.log(`Emailed to ${user.get("email")}: `, verifyEmailToken);
    throw new AppError(
      message.AUTH.EMAIL_NOT_VERIFIED,
      httpStatusCode.FORBIDDEN
    );
  }

  // Generate new authentication tokens using user's plain data
  const tokens = await tokenService.generateAuthTokens(
    user.get({ plain: true })
  );

  return { user: user.get({ plain: true }), tokens };
}

export async function signup(req: Request) {
  const body = req.body;

  if (!["1", "2"].includes(body.role)) {
    throw new AppError("Invalid user role", 400);
  }

  const newUser = await User.create(req.body);

  if (!newUser) {
    throw new AppError("Failed to create the user", 400);
  }
  const result = newUser.toJSON();

  const tokens = await tokenService.generateVerifyEmailToken(result);

  return { result, tokens };
}

export const verifyEmail = async (
  verifyEmailToken: string,
  user: UserAttributes
): Promise<void> => {
  try {
    // Verify the token
    await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);

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

export const resetPassword = async (
  userEmail: string,
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    // Fetch the user by email
    const user = await userService.getUserByEmail(userEmail);
    if (!user) {
      throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
    }

    // Get the user ID from the plain object
    const { id } = user.get({ plain: true });

    // Verify the reset password token
    await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );

    /**
     Password is hashed if both [password, confirmPassword] 
    are provided in the request and .update() is called.
    NOETE: MODEL validators only work with .save() method, not.update() method. 
    You must have joi validation
    */
    await user.update({
      password: newPassword,
      confirmPassword: newPassword,
    });

    // Remove the used reset password token from the database
    await Token.destroy({
      where: {
        userId: id,
        type: tokenTypes.RESET_PASSWORD,
      },
    });
  } catch (error) {
    throw new AppError(ReasonPhrases.UNAUTHORIZED, httpStatusCode.UNAUTHORIZED);
  }
};

export async function logout(userId: number) {
  try {
    const deletedTokensCount = await Token.destroy({
      where: { userId },
    });

    if (!deletedTokensCount) {
      throw new AppError(message.TOKEN.NOT_FOUND, httpStatusCode.NOT_FOUND);
    }

    return { message: "Logout successful. All tokens deleted." };
  } catch (error) {
    throw new AppError(
      message.TOKEN.NOT_FOUND,
      httpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
}
