import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import { getAllUsers, getUserById } from "../../controllers/userController";

const router = express.Router();

router.get("/", catchAsync(getAllUsers));
router.get("/:id", catchAsync(getUserById));

export default router;
