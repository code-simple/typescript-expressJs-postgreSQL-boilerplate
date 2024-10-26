// auth.ts

import passport from "passport";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { AppError } from "../utils/AppError";
import { roleRights } from "../config/roles";
import { Request, Response, NextFunction } from "express";
import { messages } from "../utils/constants";

// Interface for User object
interface User {
  id: string;
  role: string;
}

const verifyCallback =
  (
    req: Request,
    resolve: (value?: any) => void,
    reject: (reason?: any) => void,
    requiredRights: string[]
  ) =>
  async (err: Error | null, user: any | false, info: unknown) => {
    if (err || info || !user) {
      return reject(
        new AppError(messages.PLEASE_AUTHENTICATE, httpStatus.FORBIDDEN)
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role) || [];
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(
          new AppError(messages.PLEASE_AUTHENTICATE, httpStatus.FORBIDDEN)
        );
      }
    }

    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise<void>((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
