import express, { Router } from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  { path: "/user", route: userRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
