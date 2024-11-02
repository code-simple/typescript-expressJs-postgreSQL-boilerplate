import { Request, Response } from "express";
import { createPostSchema } from "../validators/validatePost";
import { AppError } from "../utils/AppError";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import Post from "../models/Posts";
import { UserAttributes } from "../interfaces/User";

const createPost = async (req: Request) => {
  const { value, error } = createPostSchema.validate(req.body);
  const userId = req.user as UserAttributes;
  if (error) throw new AppError(error.message, httpStatusCode.UNAUTHORIZED);

  req.body.userId = userId.id;
  const post = await Post.create(req.body);

  if (!post)
    throw new AppError(ReasonPhrases.UNAUTHORIZED, httpStatusCode.UNAUTHORIZED);

  return post;
};

export { createPost };
