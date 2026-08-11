import { Request, Response } from "express";
import AppError from "../../utils/AppError.js";
import catchAsync from "../../utils/catchAsync.js";
import { sendMail } from "../../service/mail.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

const testMail = catchAsync(async (req: Request, res: Response) => {
  const { to, subject, html } = req.body;

  if (!to) throw new AppError(400, "Receiver email is missing");
  if (!subject) throw new AppError(400, "Subject is missing");
  if (!html) throw new AppError(400, "Mail is empty");

  const result = await sendMail({ to, subject, html });
  return ApiResponse.success(res, 200, "Email send successfully", result);
});

const mailController = {
  testMail,
};

export default mailController