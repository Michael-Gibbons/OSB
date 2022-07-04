import express from "express";
const router = express.Router();

// /webhooks/GDPR/customer-data-request
router.get("/customer-data-request", async (req, res) => {
  const results = { topic: "customer data request" };
  res.status(200).json(results);
});

export default router;
