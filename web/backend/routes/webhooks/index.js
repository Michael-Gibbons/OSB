import express from 'express'
const router = express.Router()

import shopifyWebhookRouter from './shopify/index.js'

// Shopify webhooks are installed on app installation, meaning if you change these webhooks you must delete your sessions and go through auth again
router.use('/webhooks', shopifyWebhookRouter)

export default router