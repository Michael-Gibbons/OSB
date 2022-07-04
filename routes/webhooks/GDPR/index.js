import express from "express";
const router = express.Router();

import customerDataRequest from "./customer-data-request.js";
import customerDataErasure from "./customer-data-erasure.js";
import shopDataErasure from "./shop-data-erasure.js";

router.use("/", customerDataRequest);
router.use("/", customerDataErasure);
router.use("/", shopDataErasure);

export default router;
