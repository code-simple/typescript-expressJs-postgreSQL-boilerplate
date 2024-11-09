import { Request } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import { UserAttributes } from "../interfaces/user-interface";
import { tokenTypes } from "../types/token";
import Token from "../models/token-model";
import { updateRecordById } from "../utils/dbUtils";
import { message } from "../utils/message";
import * as userService from "./user-service";
import * as tokenService from "./token-service";
import logger from "../config/logger";
import { loginSchema, registerSchema } from "../validators/user-validator";

async function login(req: Request) {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, httpStatusCode.BAD_REQUEST);
  }
  const { email, password } = value;

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
    logger.info(`Emailed to ${email} Token: ${verifyEmailToken}`);
    throw new AppError(
      message.AUTH.EMAIL_NOT_VERIFIED + ` Token: ${verifyEmailToken}`,
      httpStatusCode.FORBIDDEN
    );
  }

  // Generate new authentication tokens using user's plain data
  const tokens = await tokenService.generateAuthTokens(
    user.get({ plain: true })
  );

  return { user: user.get({ plain: true }), tokens };
}

async function signup(req: Request) {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, httpStatusCode.BAD_REQUEST);
  }
  const newUser = await User.create(value);

  if (!newUser) {
    throw new AppError("Failed to create the user", 400);
  }
  const result = newUser.toJSON();
  const tokens = await tokenService.generateVerifyEmailToken(result);

  return { result, tokens };
}

const verifyEmail = async (
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
  } catch {
    throw new AppError(ReasonPhrases.UNAUTHORIZED, httpStatusCode.UNAUTHORIZED);
  }
};

const resetPassword = async (
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
  } catch {
    throw new AppError(ReasonPhrases.UNAUTHORIZED, httpStatusCode.UNAUTHORIZED);
  }
};

async function logout(userId: number) {
  try {
    const deletedTokensCount = await Token.destroy({
      where: { userId },
    });

    if (!deletedTokensCount) {
      throw new AppError(message.TOKEN.NOT_FOUND, httpStatusCode.NOT_FOUND);
    }

    return { message: "Logout successful. All tokens deleted." };
  } catch {
    throw new AppError(
      message.TOKEN.NOT_FOUND,
      httpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
}

export { logout, login, signup, verifyEmail, resetPassword };
