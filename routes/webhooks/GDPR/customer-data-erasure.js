import express from "express";
const router = express.Router();

// /webhooks/GDPR/customer-data-erasure
router.post("/customer-data-erasure", async (req, res) => {
  const results = { topic: "customer data erasure" };
  res.status(200).json(results);
});

export default router;
