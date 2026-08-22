import { Queue } from "bullmq";

import bullmqRedisClient from "../lib/bullmq.redis.js";

export const emailQueue = new Queue("email-queue", {
  connection: bullmqRedisClient,
});
