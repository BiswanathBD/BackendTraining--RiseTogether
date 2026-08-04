import { Request, Response } from "express";
import AuthService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = AuthService.login(email, password);

  return ApiResponse.success(res, 200, "Login Successful", user);
};

const register = (req: Request, res: Response) => {
  const data = req.body;

  const result = AuthService.register(data);

  return ApiResponse.success(res, 200, "Registration Successful", result);
};

const AuthController = {
  login,
  register,
};

export default AuthController;
