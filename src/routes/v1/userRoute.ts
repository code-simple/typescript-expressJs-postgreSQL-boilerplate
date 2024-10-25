import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";

const router = express.Router();

router.get("/", catchAsync(authController.signup));

export default router;
