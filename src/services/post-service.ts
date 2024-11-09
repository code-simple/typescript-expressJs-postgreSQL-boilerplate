import { Request } from "express";
import { createPostSchema } from "../validators/post-validator";
import { AppError } from "../utils/app-error";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";
import Post from "../models/post-model";
import { UserAttributes } from "../interfaces/user-interface";

const createPost = async (req: Request) => {
  const { error } = createPostSchema.validate(req.body);
  const userId = req.user as UserAttributes;
  if (error) {
    throw new AppError(error.message, httpStatusCode.UNAUTHORIZED);
  }

  req.body.userId = userId.id;
  const post = await Post.create(req.body);

  if (!post) {
    throw new AppError(ReasonPhrases.UNAUTHORIZED, httpStatusCode.UNAUTHORIZED);
  }

  return post;
};

export { createPost };
