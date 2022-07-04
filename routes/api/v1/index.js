import express from "express";
const router = express.Router();

import resourceExampleRouter from "./resourceExample.js";

router.use("/", resourceExampleRouter);

export default router;
