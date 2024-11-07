import { Request, Response } from "express";
import * as postService from "../services/postService";
import { sendSuccessResponse } from "../utils/responses";
import { getAllRecords } from "../utils/dbUtils";
import Post from "../models/Posts";
import User from "../models/User";
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

  if (!post)
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);

  await post.destroy();

  sendSuccessResponse(res, "Post deleted successfully");
};

export { createPost, getAllPosts, deletePost };
