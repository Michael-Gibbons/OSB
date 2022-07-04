import dotenv from "dotenv";
dotenv.config();

import exampleQueue from "./example.js";

if (process.env.USE_REDIS !== "true") {
  throw new Error(
    "USE_REDIS environment variable is not set to true yet queues are still being used"
  );
}

export { exampleQueue };
