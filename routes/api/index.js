import express from "express";
const router = express.Router();

import v1Router from "./v1/index.js";

// api/v1
router.use("/v1", v1Router);

export default router;
