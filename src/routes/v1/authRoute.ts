import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import { validateUser } from "../../validators";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/signup", validateUser, catchAsync(authController.signup));
router.post("/login", catchAsync(authController.login));
router.post("/verifyEmail", catchAsync(authController.verifyEmail));
router.post("/refreshToken", catchAsync(authController.refreshToken));
router.post("/forgotPassword", catchAsync(authController.forgotPassword));
router.post("/resetPassword", catchAsync(authController.resetPassword));
router.get("/logout", auth(), catchAsync(authController.logout)); // Its important to use logout route for front end to delete all unneccessary access tokens at once.
export default router;
