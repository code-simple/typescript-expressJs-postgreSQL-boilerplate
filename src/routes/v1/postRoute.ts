import express from "express";
import catchAsync from "../../utils/catchAsync";
import * as postControllers from "../../controllers/postController";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(), catchAsync(postControllers.createPost));
router.get("/", auth(), catchAsync(postControllers.getAllPosts));

export default router;
