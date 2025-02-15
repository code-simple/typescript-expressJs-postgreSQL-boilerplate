import { Request, Response } from "express";
import { UserAttributes } from "../interfaces/user-interface";

export const getCurrentUser = (req: Request, res: Response): UserAttributes => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error("Unauthorized"); // This will stop further execution
  }
  return req.user as UserAttributes;
};
