import { Redis } from "ioredis";

import { env } from "../config/env.js";

const bullmqRedisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

bullmqRedisClient.on("connect", () => {
  console.log("BullMQ Redis connected");
});

bullmqRedisClient.on("error", (error: Error) => {
  console.error("BullMQ Redis Client Error:", error);
});

export default bullmqRedisClient;
