import { Request, Response } from "express";
import AuthService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import AppError from "../../utils/AppError.js";
import { env } from "../../config/env.js";
import jwt from "jsonwebtoken";
import status from "http-status";

// login
const login = catchAsync(async (req: Request, res: Response) => {
  const credential = loginSchema.parse(req.body);

  const user = await AuthService.login(credential);

  return ApiResponse.success(res, 200, "Login Successful", user);
});

// register
const register = catchAsync(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const result = await AuthService.register(data);

  return ApiResponse.success(res, 200, "Registration Successful", result);
});

// get user
const getUser = catchAsync(async (req: Request, res: Response) => {
  // get accessToken header
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError(401, "Access token is required");

  // split token
  const token = authHeader.split(" ")[1];
  if (!token) throw new AppError(status.BAD_REQUEST, "Invalid access token");

  const user = await AuthService.getUser(token);

  return ApiResponse.success(res, 200, "Profile get successfully", user);
});

const AuthController = {
  login,
  register,
  getUser,
};

export default AuthController;
