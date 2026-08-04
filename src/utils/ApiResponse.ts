import type { Response } from "express";

class ApiResponse {
  static success(
    res: Response,
    statusCode: number,
    message: string,
    data: any,
  ) {
    return res.status(statusCode).json({
      statusCode,
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
      statusCode,
      success: false,
      message,
    });
  }
}

export default ApiResponse;
