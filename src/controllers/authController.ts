import { Request, Response, NextFunction } from "express"; // Adjust import to your User model
import { AppError } from "../utils/AppError";
import { generateToken } from "../services/tokenService";
import User from "../models/User";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    return next(new AppError("Invalid user type", 400));
  }

  try {
    const newUser = await User.create(req.body);

    if (!newUser) {
      return next(new AppError("Failed to create the user", 400));
    }

    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({ id: result.id });

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return next(new AppError("Signup failed", 500));
  }
};
