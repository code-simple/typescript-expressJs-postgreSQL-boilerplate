"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.restrictTo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Adjust import to your User model
const AppError_1 = require("../utils/AppError");
const restrictTo = (...allowedUserTypes) => {
    return (req, res, next) => {
        if (!allowedUserTypes.includes(req.user.userType)) {
            return next(new AppError_1.AppError("You don't have permission to perform this action", 403));
        }
        return next();
    };
};
exports.restrictTo = restrictTo;
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let idToken;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        idToken = req.headers.authorization.split(" ")[1];
    }
    if (!idToken) {
        return next(new AppError_1.AppError("Please login to get access", 401));
    }
    try {
        const tokenDetail = jsonwebtoken_1.default.verify(idToken, process.env.JWT_SECRET_KEY);
        const freshUser = yield User_1.default.findByPk(tokenDetail.id);
        if (!freshUser) {
            return next(new AppError_1.AppError("User no longer exists", 400));
        }
        req.user = freshUser;
        return next();
    }
    catch (error) {
        return next(new AppError_1.AppError("Authentication failed", 401));
    }
});
exports.authentication = authentication;
