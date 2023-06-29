import express from 'express'
const router = express.Router()

// Your Webhook routes here. (aside from shopify webhooks which are processed in /backend/index.js)
// I've built a webhook manager to help you healthcheck the webhooks as well as delete/recreate them.
// See the OSB docs for more information

export default router