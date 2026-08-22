import { Worker } from "bullmq";

import bullmqRedisClient from "../lib/bullmq.redis.js";

import { sendMail } from "../service/mail.service.js";

console.log("Email worker started...");

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`Processing email job: ${job.id}`);

    const { to, subject, html } = job.data;

    await sendMail({
      to,
      subject,
      html,
    });

    console.log(`Email sent to: ${to}`);
  },
  {
    connection: bullmqRedisClient,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});
