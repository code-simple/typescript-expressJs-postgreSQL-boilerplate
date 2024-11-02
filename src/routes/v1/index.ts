import express, { Router } from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import postRoute from "./postRoute";
import docsRoute from "./docsRoute";
const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  { path: "/user", route: userRoute },
  { path: "/post", route: postRoute },
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
