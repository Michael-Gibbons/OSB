import express from 'express'
const router = express.Router()

import { setupGDPRWebHooks } from "./gdpr.js";
import { setupAppUninstalledWebhook } from "./app-uninstalled.js";
import { setupOrderWebhooks } from './order.js';
import { setupCustomerWebhooks } from './customer.js';

import Shopify from '../../../helpers/shopify-context.js'
import logger from '../../../services/logger/index.js';

const PATH = '/api/webhooks/shopify'

setupGDPRWebHooks(PATH)
setupAppUninstalledWebhook(PATH)
setupOrderWebhooks(PATH)
setupCustomerWebhooks(PATH)

// Do not call app.use(express.json()) before processing webhooks with
// Shopify.Webhooks.Registry.process().
// See https://github.com/Shopify/shopify-api-node/blob/main/docs/usage/webhooks.md#note-regarding-use-of-body-parsers
// for more details.

// this path resolves to `/api/webhooks/shopify`
router.post('/shopify', async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    logger.info(`SHOPIFY WEBHOOK SUCCESSFULLY PROCESSED`, { requestId: req.id });
  } catch (e) {
    logger.info(`SHOPIFY WEBHOOK ERROR`, { requestId: req.id, message: e.message });
    if (!res.headersSent) {
      res.status(500).send(e.message);
    }
  }
});

export default router
