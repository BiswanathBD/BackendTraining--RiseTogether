import { Router } from "express";
import { getOtpController, sendOtpController } from "./otp.controller.js";

const otpRouter: Router = Router();

otpRouter.post("/send-otp", sendOtpController);
otpRouter.get("/get-otp", getOtpController);

export default otpRouter;