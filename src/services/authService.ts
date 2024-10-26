import { Request } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import { generateToken } from "./tokenService";

export async function login(req: Request) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const result = await User.findOne({
    where: { email },
  });

  if (!result) {
    throw new AppError("Incorrect Email or Password", 400);
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
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({ id: result.id });

  return result;
}
