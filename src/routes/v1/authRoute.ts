import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import auth from "../../middlewares/auth";
import { validateUser } from "../../validators";

const router = express.Router();

router.post("/signup", validateUser, catchAsync(authController.signup));
router.post("/login", catchAsync(authController.login));
router.post("/verifyEmail", catchAsync(authController.verifyEmail));
router.post("/refreshToken", catchAsync(authController.refreshToken));
router.post("/forgotPassword", catchAsync(authController.forgotPassword));
router.post("/resetPassword", catchAsync(authController.resetPassword));
router.get("/logout", auth(), catchAsync(authController.logout)); // Its important to use logout route for front end to delete all unneccessary access tokens at once.
export default router;

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user in the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "user5"
 *               lastName:
 *                 type: string
 *                 example: "user5"
 *               role:
 *                 type: string
 *                 example: "1"
 *                 description: "Role of the user (0 for admin, 1 for user, etc.)"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user5@gmail.com"
 *               password:
 *                 type: string
 *                 example: "pass123"
 *               confirmPassword:
 *                 type: string
 *                 example: "pass123"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 23
 *                         firstName:
 *                           type: string
 *                           example: "user5"
 *                         lastName:
 *                           type: string
 *                           example: "user5"
 *                         role:
 *                           type: string
 *                           example: "1"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "user5@gmail.com"
 *                         isEmailVerified:
 *                           type: boolean
 *                           example: false
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-11-02T17:38:18.361Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-11-02T17:38:18.441Z"
 *                     tokens:
 *                       type: string
 *                       example: "342088"
 *       400:
 *         description: Bad Request - Invalid input
 *
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Log in an existing user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 example: "pass123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Unauthorized - Invalid credentials
 *
 * /auth/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     description: Request a password reset link to be sent to the user’s email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@gmail.com"
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: string
 *                   example: "Password reset link has been sent to your email address : 489563 It will expire in 5 minutes"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "User with this email does not exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing the request"
 * /auth/resetPassword:
 *   post:
 *     summary: Reset Password
 *     description: Allows a user to reset their password using a token sent to their email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@gmail.com"
 *               token:
 *                 type: string
 *                 example: "762407"
 *               password:
 *                 type: string
 *                 example: "pass123"
 *               confirmPassword:
 *                 type: string
 *                 example: "pass123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: string
 *                   example: "Successfully reset password"
 *       400:
 *         description: Bad request - Invalid token or mismatched passwords
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid token or passwords do not match"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing the request"
 * /auth/logout:
 *   get:
 *     summary: Logout
 *     description: Logs out the authenticated user by invalidating their session or tokens.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: string
 *                   example: "Successfully logged out"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Please authenticate"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing the request"
 */
