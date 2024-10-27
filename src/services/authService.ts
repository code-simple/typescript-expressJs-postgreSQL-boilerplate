import { Request } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import { generateToken } from "./tokenService";
import bcrypt from "bcrypt";

export async function login(req: Request) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }
  const result = await User.findOne({
    where: { email },
  });

  if (
    !result ||
    !(await bcrypt.compare(password, result.dataValues.password))
  ) {
    throw new AppError("Incorrect email or password", 401);
  }

  return result;
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

  result.token = generateToken({ id: result.id });

  return result;
}
