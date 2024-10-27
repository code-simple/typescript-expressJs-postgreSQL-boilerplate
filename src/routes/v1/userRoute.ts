import express from "express";
import * as authController from "../../controllers/authController";
import catchAsync from "../../utils/catchAsync";
import {
  getAllUsers,
  getUserById,
  removeUser,
} from "../../controllers/userController";
import auth from "../../middlewares/auth";

const router = express.Router();

// How to use auth middlewares: Goto /config/roles.ts to set roles for differently type of users
// e.g here when i mention auth("getUsers") it means role: 0 and 1 can access to this , nobody else.
router.get("/", auth("getUsers"), catchAsync(getAllUsers));
router.get("/:id", auth(), catchAsync(getUserById));
router.delete("/:id", auth(), catchAsync(removeUser));

export default router;
