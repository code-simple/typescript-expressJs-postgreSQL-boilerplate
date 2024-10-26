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
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return new AppError("Please provide email and password", 400);
  }

  const result = await User.findOne({
    where: { email },
  });

  if (!result) {
    return next(new AppError("Incorrect Email or Password", 400));
  }

  const token = generateToken({ id: result.dataValues.id });

  return res.status(200).json({
    status: "success",
    data: { ...result.dataValues, token },
  });
};
