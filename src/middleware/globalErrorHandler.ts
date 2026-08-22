import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { env } from "../config/env.js";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isDevelopment = env.NODE_ENV === "development";

  // Zod validation error
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "Validation failed",
      errors,
      ...(isDevelopment && {
        stack: error.stack,
      }),
    });
  }

  // Other errors
  return res.status(error.statusCode || 500).json({
    statusCode: error.statusCode || 500,
    success: false,
    message: error.message || "Something went wrong",
    ...(isDevelopment && {
      stack: error.stack,
    }),
  });
};

export default globalErrorHandler;
