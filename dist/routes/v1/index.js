"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/auth",
        route: authRoute_1.default,
    },
    { path: "/user", route: userRoute_1.default },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
