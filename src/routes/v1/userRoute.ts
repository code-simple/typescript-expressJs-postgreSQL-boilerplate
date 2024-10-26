import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import { getAllUsers, getUserById } from "../../controllers/userController";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(), catchAsync(getAllUsers));
router.get("/:id", catchAsync(getUserById));

export default router;
