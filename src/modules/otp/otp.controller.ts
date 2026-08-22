import { Request, Response } from "express";
import { getOtp, sendOtp } from "./otp.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const sendOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await sendOtp(email);

  ApiResponse.success(res, 200, "OTP generated successfully", result);
};

export const getOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await getOtp(email);

  ApiResponse.success(res, 200, "Get otp successfully", result);
};
