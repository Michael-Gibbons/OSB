import express from "express";
const router = express.Router();

import logger from "../../services/logger/index.js";
import withSession from '../../middleware/with-session.js'

router.post("/log", express.json(), withSession, async (req, res) => {
  const { type, message, meta = {} } = req.body;

  meta.requestId = req.id
  meta.shopifySession = res.locals.shopify.session;

  switch (type) {
    case "error":
      logger.error(message, meta);
      break;
    case "warn":
      logger.warn(message, meta);
      break;
    case "info":
      logger.info(message, meta);
      break;
    case "debug":
      logger.debug(message, meta);
      break;
    case "verbose":
      logger.verbose(message, meta);
      break;
    case "silly":
      logger.silly(message, meta);
      break;
    default:
      break;
  }

  res.status(200).json({ success: true });
});

export default router;