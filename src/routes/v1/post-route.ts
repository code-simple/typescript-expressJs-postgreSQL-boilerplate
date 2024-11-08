import express from "express";
import catchAsync from "../../utils/catchAsync";
import * as postControllers from "../../controllers/post-controller";
import auth from "../../middlewares/auth-middleware";

const router = express.Router();

router.post("/", auth(), catchAsync(postControllers.createPost));
router.get("/", auth(), catchAsync(postControllers.getAllPosts));
router.delete("/:id", auth(), catchAsync(postControllers.deletePost));

export default router;
