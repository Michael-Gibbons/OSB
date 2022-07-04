import dotenv from "dotenv";
dotenv.config();

import "./example.js";

if (process.env.USE_REDIS !== "true") {
  throw new Error(
    "USE_REDIS environment variable is not set to true yet workers are still being used"
  );
}
