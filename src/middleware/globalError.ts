import { NextFunction, Request, Response } from "express";

const globalError = (
  error: any,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    success: false,
    message: error.message || "Something went wrong",
  });
};

export default globalError;
