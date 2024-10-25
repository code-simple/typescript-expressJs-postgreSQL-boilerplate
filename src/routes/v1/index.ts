import express, { Router } from "express";
import authRoute from "./authRoute";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
