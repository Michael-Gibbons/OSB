import express from "express";
const router = express.Router();
import verifyRequest from "../../server/middleware/verify-request.js";

router.get("/", verifyRequest(), async (req, res) => {
  const session = res.locals.shopify.session; // session contains shop name, which can be used to query data
  res.status(200).json({ mySetting: "super cool", shop: session.shop });
});

export default router;
