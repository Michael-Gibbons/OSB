import express from 'express'
const router = express.Router()

import { setupGDPRWebHooks } from "./gdpr.js";
import { setupAppUninstalledWebhook } from "./app-uninstalled.js";
import { setupOrderWebhooks } from './order.js';

import Shopify from '../../../helpers/shopify-context.js'

const PATH = '/api/webhooks/shopify'

setupGDPRWebHooks(PATH)
setupAppUninstalledWebhook(PATH)
setupOrderWebhooks(PATH)

// Do not call app.use(express.json()) before processing webhooks with
// Shopify.Webhooks.Registry.process().
// See https://github.com/Shopify/shopify-api-node/blob/main/docs/usage/webhooks.md#note-regarding-use-of-body-parsers
// for more details.

// this path resolves to `/api/webhooks/shopify`
router.post('/shopify', async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`Webhook processed, returned status code 200`);
  } catch (e) {
    console.log(`Failed to process webhook: ${e.message}`);
    if (!res.headersSent) {
      res.status(500).send(e.message);
    }
  }
});

export default router
