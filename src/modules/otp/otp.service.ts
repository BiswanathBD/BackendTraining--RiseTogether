import redisClient from "../../lib/redis.js";
import AppError from "../../utils/AppError.js";

export const sendOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpire = 120;

  const key = `otp:${email}`;

  await redisClient.set(key, otp, {
    EX: otpExpire,
  });

  const remainingTime = await redisClient.ttl(key);

  return {
    email,
    otp,
    remainingTime,
  };
};

export const getOtp = async (email: string) => {
  const key = `otp:${email}`;

  const otp = await redisClient.get(key);
  if(!otp) throw new AppError(404, "OTP not found or expired")
  const remainingTime = await redisClient.ttl(key);

  return {
    email,
    otp,
    remainingTime,
  };
};
