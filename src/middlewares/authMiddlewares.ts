import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user"; // Adjust import to your User model
import { AppError } from "../utils/AppError";

export const restrictTo = (...allowedUserTypes: string[]) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (!allowedUserTypes.includes(req.user.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    return next();
  };
};
export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let idToken: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }

  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }

  try {
    const tokenDetail = jwt.verify(
      idToken,
      process.env.JWT_SECRET_KEY as string
    ) as { id: number };

    const freshUser = await User.findByPk(tokenDetail.id);

    if (!freshUser) {
      return next(new AppError("User no longer exists", 400));
    }
    req.user = freshUser;
    return next();
  } catch (error) {
    return next(new AppError("Authentication failed", 401));
  }
};
