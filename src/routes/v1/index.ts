import express, { Router } from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import postRoute from "./postRoute";
const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  { path: "/user", route: userRoute },
  { path: "/post", route: postRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
