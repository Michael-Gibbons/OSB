import express from "express";
const router = express.Router();

// /api/v1/resourceExample

// access request body with req.body

router.get("/resourceExample", async (req, res) => {
  const results = { method: "GET", status: "SUCCESS" };
  res.status(200).json(results);
});

router.post("/resourceExample", async (req, res) => {
  const results = { method: "POST", status: "SUCCESS" };
  res.status(200).json(results);
});

router.put("/resourceExample", async (req, res) => {
  const results = { method: "PUT", status: "SUCCESS" };
  res.status(200).json(results);
});

router.patch("/resourceExample", async (req, res) => {
  const results = { method: "PATCH", status: "SUCCESS" };
  res.status(200).json(results);
});

router.delete("/resourceExample", async (req, res) => {
  const results = { method: "DELETE", status: "SUCCESS" };
  res.status(200).json(results);
});

export default router;
