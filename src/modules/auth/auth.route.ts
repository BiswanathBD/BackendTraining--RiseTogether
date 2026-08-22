import { Router } from "express";
import AuthController from "./auth.controller.js";

const AuthRouter: Router = Router();

AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/register", AuthController.register);
AuthRouter.get("/me", AuthController.getUser);

export default AuthRouter;
