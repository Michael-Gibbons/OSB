import { Queue, QueueScheduler } from "bullmq";
import { connection, defaultJobOptions } from "../index.js";

const exampleQueue = new Queue("example", {
  connection,
  defaultJobOptions: { ...defaultJobOptions },
});
new QueueScheduler("example", { connection });

export default exampleQueue;
