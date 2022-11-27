import express from 'express'
const router = express.Router()

import shopifyWebhookRouter from './shopify/index.js'

// Shopify webhooks are registered on app authentication, meaning if you change these webhooks you must navigate to /api/auth in the app to reauth.
// Shopify webhooks that require access to protected customer data will not be able to be registered until you go to the link included in the webhook registration error and confirm your privacy policies.
// Do not use body parsers on the Shopify webhook router, it parses the body itself so doing so will break it.
router.use('/webhooks', shopifyWebhookRouter)

export default router