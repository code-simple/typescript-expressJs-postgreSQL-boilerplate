import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import { getAllUsers, getUserById } from "../../controllers/userController";
import auth from "../../middlewares/auth";

const router = express.Router();

// How to use auth middlewares: Goto /config/roles.ts to set roles fod differently type of users
// auth("getUsers", "manageUsers") if user is having role="2" he will be able to access this api else not
router.get("/", auth("getUsers", "manageUsers"), catchAsync(getAllUsers));
router.get("/:id", auth(), catchAsync(getUserById));

export default router;
