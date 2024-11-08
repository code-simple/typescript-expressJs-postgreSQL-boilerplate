import { Request, Response } from "express";
import * as postService from "../services/post-service";
import { sendSuccessResponse } from "../utils/responses";
import Post from "../models/post-model";
import User from "../models/user-model";
import { AppError } from "../utils/AppError";
import httpStatusCode, { ReasonPhrases } from "http-status-codes";

const createPost = async (req: Request, res: Response) => {
  const result = await postService.createPost(req);
  sendSuccessResponse(res, result);
};

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  if (!posts) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }
  sendSuccessResponse(res, posts);
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  await post.destroy();

  sendSuccessResponse(res, "Post deleted successfully");
};

export { createPost, getAllPosts, deletePost };
