"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/auth",
        route: authRoute_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router;
});
exports.default = router;
