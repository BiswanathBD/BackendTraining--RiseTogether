import { Router } from "express";
import AuthRouter from "../modules/auth/auth.route.js";
import CountryRouter from "../modules/country/country.route.js";

const router: Router = Router();

const moduleRouters = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/",
    router: CountryRouter,
  },
];

moduleRouters.forEach((module) => {
  router.use(module.path, module.router);
});

export default router;
