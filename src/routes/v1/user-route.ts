import express from "express";
import catchAsync from "../../utils/catch-async";
import * as userController from "../../controllers/user-controller";
import auth from "../../middlewares/auth-middleware";

const router = express.Router();

// How to use auth middlewares: Goto /config/roles.ts to set roles for differently type of users
// e.g here when i mention auth("getUsers") it means role: 0 and 1 can access to this , nobody else.
// router.get("/", auth("getUsers"), catchAsync(userController.getAllUsers));
router.get("/", auth(), catchAsync(userController.getAllUsers));
router.get("/:id", auth(), catchAsync(userController.getUserById));
router.delete(
  "/:id",
  auth("deleteUsers"),
  catchAsync(userController.removeUser)
);
router.patch(
  "/updateCurrentUser",
  auth("manageUsers"),
  catchAsync(userController.updateCurrentUser)
);
router.patch(
  "/:id",
  auth("manageUsers"),
  catchAsync(userController.updateUser)
);

export default router;

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users along with their associated posts. Requires a Bearer Token for authentication.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users with their details and posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 19
 *                       role:
 *                         type: string
 *                         example: "1"
 *                         description: "Role of the user, e.g., '0' for admin, '1' for user"
 *                       firstName:
 *                         type: string
 *                         example: "admin"
 *                       lastName:
 *                         type: string
 *                         example: "admin"
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "admin@gmail.com"
 *                       isEmailVerified:
 *                         type: boolean
 *                         example: true
 *                       password:
 *                         type: string
 *                         example: "$2b$10$PtTWLESn63VL0GGeoWLuO.bSyr.MrkP1GkyHVJeKiMRG1q8/zVmOm"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-29T07:29:03.605Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-29T07:29:34.280Z"
 *                       posts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 4
 *                             title:
 *                               type: string
 *                               example: "Hello"
 *                             body:
 *                               type: string
 *                               example: "New Post about food."
 *                             userId:
 *                               type: integer
 *                               example: 21
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-11-02T06:03:14.417Z"
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-11-02T06:03:14.419Z"
 *                             deletedAt:
 *                               type: string
 *                               format: date-time
 *                               nullable: true
 *                               example: null
 *       401:
 *         description: Unauthorized - No or invalid token provided
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
 *                   example: "Authentication required"
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
