import express from "express";
const router = express.Router();

import GDPRRouter from "./GDPR/index.js";

// webhooks/GDPR
router.use("/GDPR", GDPRRouter);

export default router;
