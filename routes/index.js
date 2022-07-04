import express from "express";
const router = express.Router();

import webhooksRouter from "./webhooks/index.js";
import apiRouter from "./api/index.js";
import logRouter from "./log/index.js";
import settingsRouter from "./settings/index.js";

router.use("/webhooks", webhooksRouter);
router.use("/api", apiRouter);
router.use("/log", logRouter);
router.use("/settings", settingsRouter);

export default router;
