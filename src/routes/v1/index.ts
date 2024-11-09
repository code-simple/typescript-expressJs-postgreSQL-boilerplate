import express, { Router } from "express";
import authRoute from "./auth-route";
import userRoute from "./user-route";
import postRoute from "./post-route";
import docsRoute from "./docs-route";
import s3Route from "./s3-route";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  { path: "/user", route: userRoute },
  { path: "/post", route: postRoute },
  { path: "/s3", route: s3Route },
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
