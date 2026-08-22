import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.email(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

const validateEnv = () => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    console.error(parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
  }
  // return validated env
  return parsedEnv.data;
};

export default validateEnv;
