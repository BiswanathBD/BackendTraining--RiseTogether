import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isDevelopment = env.NODE_ENV === "development";

  res.status(error.statusCode || 500).json({
    statusCode: error.statusCode,
    success: false,
    message: error.message || "Something went wrong",
    ...(isDevelopment && {
      stack: error.stack,
    }),
  });
};

export default globalErrorHandler;
