import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import { roles } from "../config/roles";

// Define Joi schema for user validation
const userSchema = Joi.object({
  role: Joi.string()
    .valid(...roles.filter((role) => role !== "admin")) // Remove 'admin' from the roles array
    .required()
    .messages({
      "any.only": "Invalid user role",
    }),
  firstName: Joi.string()
    .required()
    .messages({ "string.empty": "First name is required" }),
  lastName: Joi.string()
    .required()
    .messages({ "string.empty": "Last name is required" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Email must be a valid email address" }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
  token: Joi.string().optional().allow(null),
});

// Middleware that can be used if needed.
const validateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 401));
    }
    return next();
  }
);

const emailTokenSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  password: Joi.string().max(12).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match the password.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(12).required(),
});

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string()
    .valid(...roles.filter((role) => role !== "admin")) // Remove 'admin' from the roles array
    .required()
    .messages({
      "any.only": "Invalid user role",
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(11).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export {
  registerSchema,
  loginSchema,
  validateUser,
  emailTokenSchema,
  updateUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
