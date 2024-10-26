import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import { validateUser } from "../../validators";

const router = express.Router();

router.post("/signup", validateUser, catchAsync(authController.signup));
router.post("/login", catchAsync(authController.login));

export default router;
