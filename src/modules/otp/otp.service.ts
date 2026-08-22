import redisClient from "../../lib/redis.js";
import AppError from "../../utils/AppError.js";
import crypto from "node:crypto";
import { otpEmailTemplate } from "../../utils/otpTemplate.js";
import { emailQueue } from "../../queue/email.queue.js";
import status from "http-status";

// hashing otp

export const hashOtp = (otp: string): string => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

// send otp
export const sendOtp = async (email: string) => {
  const cooldownKey = `otp:cooldown:${email}`;
  const cooldownExpire = 60;

  // Check OTP request cooldown
  const cooldown = await redisClient.set(cooldownKey, "1", {
    NX: true,
    EX: cooldownExpire,
  });

  if (cooldown === null) {
    const remainingTime = await redisClient.ttl(cooldownKey);

    throw new AppError(
      status.TOO_MANY_REQUESTS,
      `Please wait ${remainingTime} seconds before another request.`,
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpire = 300;

  // Generate OTP template
  const html = otpEmailTemplate(otp, otpExpire);

  // Send OTP via BullMQ
  await emailQueue.add("send-otp", {
    to: email,
    subject: "verification otp",
    html,
  });

  const hashedOtp = hashOtp(otp);
  const key = `otp:${email}`;

  await redisClient.set(key, hashedOtp, {
    EX: otpExpire,
  });

  const remainingTime = await redisClient.ttl(key);

  return {
    email,
    remainingTime: `${remainingTime} seconds`,
  };
};

export const getOtp = async (email: string) => {
  const key = `otp:${email}`;

  const otp = await redisClient.get(key);
  if (!otp) throw new AppError(404, "OTP not found or expired");
  const remainingTime = await redisClient.ttl(key);

  return {
    email,
    remainingTime: `${remainingTime} seconds`,
  };
};
