import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  // NODE_ENV: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
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
