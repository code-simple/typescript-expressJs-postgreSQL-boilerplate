import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import * as userService from "./userService";
import { AppError } from "../utils/AppError";

import { getUniqueOneTimePassword } from "../utils/helper";
import { tokenTypes } from "../types/token";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { message } from "../utils/message";
import { ENV } from "../config/config";
import Token from "../models/Token";
import { UserAttributes } from "../interfaces/User";

interface AuthTokens {
  access: {
    token: string;
    expires: Date;
  };
  // Uncomment if refresh tokens are required:
  refresh: {
    token: string;
    expires: Date;
  };
}

/**
 * Generate token
 * @param {UserAttributes} user
 * @param {dayjs.Dayjs} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  user: UserAttributes,
  expires: dayjs.Dayjs,
  type: string,
  secret: string = ENV.JWT.SECRET_KEY!
): string => {
  const payload = {
    sub: user.id,
    email: user.email || "",
    fullName: user.firstName + " " + user.lastName || "",
    role: user.role || "",
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {dayjs.Dayjs} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  userId: number,
  expires: dayjs.Dayjs,
  type: string,
  blacklisted: boolean = false
) => {
  const tokenDoc = await Token.create({
    token,
    userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token: string, type: string) => {
  const tokenDoc = await Token.findOne({
    where: { token, type, blacklisted: false },
  });
  if (!tokenDoc) {
    throw new Error(message.TOKEN.NOT_FOUND);
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {UserAttributes} user
 * @returns {Promise<AuthTokens>}
 */
const generateAuthTokens = async (
  user: UserAttributes
): Promise<AuthTokens> => {
  const accessTokenExpires = dayjs().add(
    Number(ENV.JWT.ACCESS_EXPIRES_IN),
    "minute"
  );
  const accessToken = generateToken(
    user,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  const refreshTokenExpires = dayjs().add(
    Number(ENV.JWT.REFRESH_EXPIRES_IN_DAYS),
    "day"
  );
  const refreshToken = generateToken(
    user,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    // Uncomment if refresh tokens are needed:
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatus.NOT_FOUND);
  }

  const expires = dayjs().add(
    Number(ENV.JWT.FORGOT_PASSWORD_EXPIRATION_MINUTES),
    "minute"
  );
  const resetPasswordToken = getUniqueOneTimePassword();

  // Use .get() to retrieve the user's ID
  const userId = user.get("id") as number;

  await saveToken(
    resetPasswordToken,
    userId, // Using the userId retrieved with .get()
    expires,
    tokenTypes.RESET_PASSWORD
  );

  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {UserAttributes} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (
  user: UserAttributes
): Promise<string> => {
  const expires = dayjs().add(
    Number(ENV.JWT.VERIFY_EMAIL_EXPIRATION_MINUTES),
    "minute"
  );
  const verifyEmailToken = getUniqueOneTimePassword();
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

/**
 * Decode JWT Auth token
 * @param {string} token
 * @returns {object | null}
 */
const decodeJwtAuthToken = (token: string) => {
  return jwt.decode(token);
};

const refreshTokenService = async (refreshToken: string) => {
  try {
    // Verify the refresh token
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);

    // Get the user associated with the token

    const userId = refreshTokenDoc.get("userId") as number;
    let user = await userService.getUserById(userId);

    // If no user is found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Remove the used refresh token
    await refreshTokenDoc.destroy();

    // Generate new authentication tokens
    const tokens = await generateAuthTokens(user.get());
    return { user, tokens };
  } catch (error) {
    // Throw an API error if any step fails
    throw new AppError(ReasonPhrases.UNAUTHORIZED, 403);
  }
};

export {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  decodeJwtAuthToken,
  refreshTokenService,
};
