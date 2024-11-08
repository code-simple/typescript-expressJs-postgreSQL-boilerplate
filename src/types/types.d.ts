import { UserAttributes } from "../models/user-model"; // Adjust the path to your UserAttributes interface

declare module "express-rate-limit";

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes; // Specify the shape of the `user` property
    }
  }
}
