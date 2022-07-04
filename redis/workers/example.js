import { Worker } from "bullmq";
import { connection } from "../index.js";
import logger from "../../services/logger/index.js";

const worker = new Worker(
  "example",
  async (job) => {
    // job.data.payload;
    logger.info(`Job ${job.id} is processing`);
  },
  { connection }
);

worker.on("completed", async (job) => {
  try {
    // job.returnvalue
    logger.info(`Job ${job.id} completed`);
  } catch (error) {
    logger.error(`Job ${job.id} had an error on completion`, error);
  }
});

worker.on("failed", (job, err) => {
  logger.error(`Job ${job.id} has failed`, error);
});

worker.on("error", (err) => {
  logger.error("worker has failed", err);
});
