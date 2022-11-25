import express from 'express'
const router = express.Router()

import shopifyWebhookRouter from './shopify/index.js'

// Shopify webhooks are installed on app installation, meaning if you change these webhooks you must delete your sessions and go through auth again
// Shopify webhooks that require access to protected customer data will not be able to be registered until you go to the link included in the webhook registration error and confirm your privacy policies.
router.use('/webhooks', shopifyWebhookRouter)

export default router