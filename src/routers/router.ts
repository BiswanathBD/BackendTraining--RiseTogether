import { Router } from "express";
import AuthRouter from "../modules/auth/auth.route.js";

const router: Router = Router();

const moduleRouters = [
  {
    path: "/auth",
    router: AuthRouter,
  },
];

moduleRouters.forEach((module) => {
  router.use(module.path, module.router);
});

export default router;
